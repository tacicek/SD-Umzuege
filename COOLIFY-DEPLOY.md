# Coolify Deploy Rehberi — SD-Umzüge

## Gereksinimler

- Coolify v4+ kurulu bir sunucu (VPS / dedicated)
- GitHub / GitLab reposu (proje buraya push edilmiş olmalı)
- Domain ve DNS erişimi

---

## 1. Repoyu Hazırla

Projenin kök dizininde `web/` klasörü içinde Next.js uygulaması bulunuyor.
Coolify'a bunu söylemek için **Build Base Directory** ayarı kullanılacak.

```
SD-Umzuege/
└── web/          ← Next.js projesi burda
    ├── app/
    ├── data/
    ├── components/
    ├── package.json
    └── next.config.ts
```

---

## 2. Coolify'da Yeni Uygulama Oluştur

1. Coolify panelinde → **Projects** → **+ New Resource**
2. **Application** seç
3. Git provider'ı bağla (GitHub / GitLab)
4. Repoyu seç: `SD-Umzuege`
5. Branch: `main`

---

## 3. Build Ayarları

| Alan | Değer |
|------|-------|
| **Build Pack** | `Nixpacks` veya `Dockerfile` (aşağıya bak) |
| **Base Directory** | `web` |
| **Build Command** | `pnpm build` |
| **Start Command** | `pnpm start` |
| **Install Command** | `pnpm install --frozen-lockfile` |
| **Port** | `3000` |
| **Node Version** | `20` |

> **Not:** Nixpacks pnpm'i otomatik algılar çünkü `pnpm-lock.yaml` mevcut.

---

## 4. Environment Variables

Coolify panelinde **Environment Variables** bölümüne ekle:

```env
NEXT_PUBLIC_SITE_URL=https://sd-umzuege.ch
CONTACT_EMAIL=info@sd-umzuege.ch
NODE_ENV=production
```

> `.env.local` dosyası Git'e push edilmez — tüm değişkenler Coolify UI'dan girilmeli.

---

## 5. Dockerfile ile Deploy (Önerilen)

Nixpacks yerine özel Dockerfile kullanmak daha stabil sonuç verir.
`web/` klasörüne şu dosyayı ekle:

```dockerfile
# web/Dockerfile

FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ── deps ──────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── builder ───────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ── runner ────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

Dockerfile kullanıyorsan `next.config.ts`'e `output: "standalone"` eklenmeli:

```ts
// web/next.config.ts
const nextConfig: NextConfig = {
  output: "standalone",        // ← ekle
  images: {
    remotePatterns: [ ... ]
  },
};
```

Coolify'da Build Pack olarak **Dockerfile** seç, Base Directory: `web`.

---

## 6. Domain Ayarı

1. Coolify → uygulama → **Domains** sekmesi
2. `https://sd-umzuege.ch` ekle
3. **Let's Encrypt** SSL otomatik aktif olur
4. DNS'te A kaydı → Coolify sunucusunun IP'si

---

## 7. Deploy

1. Coolify → **Deploy** butonuna bas
2. Build loglarını izle — `✓ Compiled successfully` görünmeli
3. 4 statik servis sayfası üretilmeli:
   - `/leistungen/umzug`
   - `/leistungen/reinigung`
   - `/leistungen/raeumung`
   - `/leistungen/klaviertransport`

---

## 8. Otomatik Deploy (CI/CD)

Coolify varsayılan olarak **webhook** ile çalışır:

1. Coolify → uygulama → **Webhooks** sekmesi → URL'yi kopyala
2. GitHub → repo → **Settings → Webhooks → Add webhook**
3. URL'yi yapıştır, `push` eventi seç

Artık her `main` branch push'unda otomatik deploy tetiklenir.

---

## Özet Kontrol Listesi

- [ ] Repo GitHub/GitLab'a push edildi
- [ ] `web/Dockerfile` oluşturuldu
- [ ] `next.config.ts`'e `output: "standalone"` eklendi
- [ ] Coolify'da Base Directory: `web` ayarlandı
- [ ] Environment variables Coolify UI'dan girildi
- [ ] Domain eklendi, DNS A kaydı ayarlandı
- [ ] İlk deploy başarılı, site erişilebilir
- [ ] Webhook ile otomatik deploy aktif

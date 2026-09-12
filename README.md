# PlotInNaviMumbai.com — Web Application & Advisory Platform

The digital home and advisory platform for **PlotInNaviMumbai.com**, providing honest, independent property and land guidance across Navi Mumbai (Ulwe, Kharghar, Panvel, Taloja, Dronagiri).

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui** with a strict, brand-tailored color token system.

---

## 1. Architecture Highlights

- **Zero Database / Pure Content in Git**: All properties, FAQs, services, and educational articles are strictly typed TypeScript/data files under `src/content/`.
- **Prebuild Content Guard**: `scripts/check-content.ts` validates that no sample test plots can ever be built for production.
- **WhatsApp-First Pipeline**: Primary conversion paths trigger direct WhatsApp integration. Form submissions are dispatched server-side directly via WhatsApp API (Green-API, Meta Cloud API, Twilio, CallMeBot) with zero database footprint.
- **Design Tokens**: Canopy Green (`#1E4D3A`), Sprout Accent (`#83A83B`), Paper Background (`#FAFAF7`), Panel (`#EFF1EA`), Sand (`#E8E2D5`), Ink Text (`#12261D`), Line (`#D6DACD`).

---

## 2. Getting Started

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Content Validation & Build
```bash
npm run prebuild   # Runs content safety checks
npm run build      # Static site generation & type check
```

---

## 3. Managing Content

### Adding or Updating a Property
1. Create or edit a file in `src/content/properties/` (e.g. `ulwe-sector-19.ts`).
2. Export the property object conforming to the `Property` interface in `src/types/index.ts`.
3. Register the file in `src/content/properties/index.ts`.
4. Ensure `published: true` and `isSample: false` for live properties.

### Updating Contact Details
Edit `src/content/site.ts` or set the following environment variables:
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: 10/12-digit number (e.g. `917424845316`)
- `NEXT_PUBLIC_PHONE`: Display phone number (e.g. `+91 74248 45316`)

### Publishing Educational Insights
Add articles to `src/content/insights/index.ts`. Published articles will automatically appear on `/insights` and `/sitemap.xml`.

---

## 4. Environment Configuration

Copy `.env.example` to `.env.local` to customize variables:
```bash
# Public
NEXT_PUBLIC_SITE_URL=https://plotinnavimumbai.com
NEXT_PUBLIC_WHATSAPP_NUMBER=917424845316
NEXT_PUBLIC_PHONE="+91 74248 45316"

# WhatsApp API Dispatch (Green-API / Meta / Twilio)
GREEN_API_URL=https://7107.api.greenapi.com
GREEN_API_ID_INSTANCE=710722734890
GREEN_API_TOKEN_INSTANCE=f3a5657037024df68282d2a7bc68366ed186e49e99324b8ebf
WHATSAPP_OWNER_NUMBER=917424845316
```

---

## 5. Deployment

Deployable to Vercel, Netlify, Cloudflare, or any modern Node hosting provider. Simply connect the Git repository and configure production environment variables.

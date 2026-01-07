# Project Identity: og (og.pcstyle.dev)

This project follows the **pcstyle** high-performance stack and aesthetic.

## 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Image Generation**: @vercel/og (Satori + Resvg)
- **Styling**: Tailwind CSS v4 (CSS-first)
- **Runtime**: Bun + Vercel Edge Functions
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🎨 Design System: "Cybernetic Minimalism"
- **Colors**: Absolute Black (#000000) & Neon Magenta (#ff00ff)
- **Effects**: Scanlines, glow effects, matrix patterns
- **Typography**: JetBrains Mono
- **Identity**: Protocol: OG-777-ALPHA

## 📁 File Structure
```
og/
├── app/
│   ├── api/
│   │   └── og/
│   │       └── route.tsx    # Image generation endpoint
│   ├── globals.css          # Cyberpunk styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Preview/generator UI
└── AGENTS.MD
```

## 🔧 API Usage

### Base Endpoint
```
GET /api/og
```

### Query Parameters
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | "PCSTYLE" | Main heading |
| `subtitle` | string | "pcstyle.dev" | Secondary text |
| `icon` | string | "code" | Icon name |
| `theme` | string | "magenta" | Color theme |

### Supported Icons
```
link, upload, file, code, gamepad, cpu, globe, 
zap, shield, clock, terminal, sparkles, monitor,
box, layers, calculator
```

### Example URLs
```bash
# Link Shortener
og.pcstyle.dev/api/og?title=LINK%20SHORTENER&subtitle=s.pcstyle.dev&icon=link

# FastPaste
og.pcstyle.dev/api/og?title=FastPaste&subtitle=paste.pcstyle.dev&icon=file

# Cyan theme
og.pcstyle.dev/api/og?title=UPLOADER&subtitle=upload.pcstyle.dev&icon=upload&theme=cyan
```

## 🚀 Commands
```bash
bun install     # Install dependencies
bun dev         # Start development server
bun build       # Build for production
```

## 📊 Output
- Dimensions: 1200 × 630px
- Format: PNG
- Cache: Immutable, 1 year CDN cache
- Response time: ~100-200ms

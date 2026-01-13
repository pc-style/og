import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Fallback icon path (Question icon) in case fetch fails
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12M128 72c-22.06 0-40 16.15-40 36a8 8 0 0 0 16 0c0-11 10.77-20 24-20s24 9 24 20s-10.77 20-24 20a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-1.1c16.14-3 32-17.51 32-34.9c0-19.85-17.94-36-40-36m104 56A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></svg>`;

// Mapping for legacy names or aliases to Phosphor (ph:) names
const nameMap: Record<string, string> = {
    zap: "lightning",
    search: "magnifying-glass",
    terminal: "terminal-window",
    box: "cube",
    layers: "stack",
    monitor: "monitor-play",
    mail: "envelope",
    "thumbs-up": "thumbs-up",
    github: "github-logo",
    twitter: "x-logo",
    facebook: "facebook-logo",
    instagram: "instagram-logo",
    youtube: "youtube-logo",
    upload: "upload-simple",
    shield: "shield-check",
    sparkles: "sparkle",
    activity: "pulse",
    server: "hard-drives",
    brush: "paint-brush",
    drive: "hard-drive",
    chat: "chat-centered-text",
    map: "map-trifold",
};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Params
        const title = searchParams.get("title") || "PCSTYLE";
        const subtitle = searchParams.get("subtitle") || "pcstyle.dev";
        const rawIcon = (searchParams.get("icon") || "code").toLowerCase();
        const iconName = nameMap[rawIcon] || rawIcon;
        const theme = searchParams.get("theme") || "magenta";
        const customColor = searchParams.get("color");
        const emoji = searchParams.get("emoji");

        // Font - Using a .ttf version for better compatibility
        const fontData = await fetch(
            new URL('https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Bold.ttf')
        ).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch font");
            return res.arrayBuffer();
        });

        // Theme Configuration
        const themeColors: Record<string, { primary: string; secondary: string }> = {
            magenta: { primary: "#ff00ff", secondary: "rgba(255, 0, 255, 0.2)" },
            cyan: { primary: "#00ffff", secondary: "rgba(0, 255, 255, 0.2)" },
            roxi: { primary: "#ff1a75", secondary: "rgba(255, 26, 117, 0.2)" },
            emerald: { primary: "#34d399", secondary: "rgba(52, 211, 153, 0.2)" },
            violet: { primary: "#a78bfa", secondary: "rgba(167, 139, 250, 0.2)" },
        };

        let colors = themeColors[theme] || themeColors.magenta;

        if (theme === "custom" && customColor) {
            const hex = customColor.startsWith('#') ? customColor : `#${customColor}`;
            colors = {
                primary: hex,
                secondary: `${hex}33`,
            };
        }

        // --- ICON FETCHING ---
        let iconDataUri = "";
        if (!emoji) {
            try {
                // Fetch from Iconify (Phosphor library) with SWR caching
                const iconRes = await fetch(
                    `https://api.iconify.design/ph:${iconName}.svg?color=${encodeURIComponent(colors.primary)}`,
                    { next: { revalidate: 3600 } }
                );

                let svg = "";
                if (iconRes.ok) {
                    svg = await iconRes.text();
                } else {
                    svg = FALLBACK_SVG.replace("currentColor", colors.primary);
                }

                const base64 = Buffer.from(svg).toString('base64');
                iconDataUri = `data:image/svg+xml;base64,${base64}`;
            } catch (e) {
                console.error("Icon fetch error:", e);
                const fallback = FALLBACK_SVG.replace("currentColor", colors.primary);
                iconDataUri = `data:image/svg+xml;base64,${Buffer.from(fallback).toString('base64')}`;
            }
        }

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#050505",
                        fontFamily: '"JetBrains Mono"',
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* --- BACKGROUND --- */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: "linear-gradient(to right, #1a1a1a 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                            opacity: 0.3,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: "linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                            opacity: 0.3,
                        }}
                    />

                    {/* Ambient Glow */}
                    <div
                        style={{
                            position: "absolute",
                            top: "-15%",
                            left: "-15%",
                            width: "800px",
                            height: "800px",
                            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
                            opacity: 0.4,
                        }}
                    />

                    {/* --- UI FRAME --- */}
                    <div
                        style={{
                            position: "absolute",
                            top: "30px",
                            left: "30px",
                            right: "30px",
                            bottom: "30px",
                            border: `1px solid #333`,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Corner Accents */}
                        <div style={{ position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTop: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }} />
                        <div style={{ position: 'absolute', top: -1, right: -1, width: 20, height: 20, borderTop: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }} />
                        <div style={{ position: 'absolute', bottom: -1, left: -1, width: 20, height: 20, borderBottom: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }} />
                        <div style={{ position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottom: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }} />

                        {/* Top Bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px 24px',
                            borderBottom: '1px solid #222',
                            background: 'rgba(0,0,0,0.7)',
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: 8, height: 8, background: colors.primary, borderRadius: '50%' }} />
                                <span style={{ color: '#fff', letterSpacing: '2px' }}>PCSTYLE_OS</span>
                            </div>
                            <div style={{ letterSpacing: '2px' }}>SYS.OG.GENERATOR_V3_STABLE</div>
                        </div>

                        {/* Bottom Bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px 24px',
                            borderTop: '1px solid #222',
                            background: 'rgba(0,0,0,0.7)',
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <span>X: 1200</span>
                                <span>Y: 0630</span>
                                <span>Z: 0000</span>
                            </div>
                            <div style={{ color: colors.primary, letterSpacing: '1px' }}>
                                STATUS: OPTIMAL
                            </div>
                        </div>
                    </div>

                    {/* --- CONTENT CENTER --- */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "60px",
                            padding: "60px 100px",
                            zIndex: 10,
                        }}
                    >
                        {/* Icon Container (Left) */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "220px",
                                height: "220px",
                                background: "rgba(0,0,0,0.8)",
                                border: `2px solid ${colors.primary}`,
                                borderRadius: "40px",
                                position: "relative",
                            }}
                        >
                            {emoji ? (
                                <div style={{ fontSize: "100px", display: 'flex' }}>{emoji}</div>
                            ) : (
                                <img
                                    src={iconDataUri}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                    }}
                                    alt=""
                                />
                            )}
                        </div>

                        {/* Text Container (Right) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px' }}>
                            <div
                                style={{
                                    fontSize: "84px",
                                    fontWeight: 900,
                                    color: "white",
                                    lineHeight: 0.95,
                                    letterSpacing: "-3px",
                                }}
                            >
                                {title}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ height: '4px', width: '50px', background: colors.primary }} />
                                <div
                                    style={{
                                        fontSize: "36px",
                                        color: "#999",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    {subtitle}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ),
            {
                width: 1200,
                height: 630,
                headers: {
                    'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
                },
                fonts: [
                    {
                        name: 'JetBrains Mono',
                        data: fontData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            }
        );
    } catch (err: any) {
        console.error(err);
        return new Response(`Failed to generate image: ${err.message}`, { status: 500 });
    }
}
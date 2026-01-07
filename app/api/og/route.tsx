import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Icon SVG paths (subset of Lucide icons)
const icons: Record<string, string> = {
    link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    code: "m18 16 4-4-4-4M6 8l-4 4 4 4M14 4l-4 16",
    gamepad: "M6 12h4M8 10v4M15 13h.01M18 11h.01M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
    cpu: "M18 12h2M4 12h2M12 4v2M12 18v2M17 7l1.4-1.4M5.6 18.4L7 17M17 17l1.4 1.4M5.6 5.6L7 7M9 9h6v6H9z",
    globe: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    clock: "M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM12 6v6l4 2",
    terminal: "m4 17 6-6-6-6M12 19h8",
    sparkles: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
    monitor: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM8 21h8M12 17v4",
    box: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z M3.3 7l8.7 5 8.7-5 M12 22V12",
    layers: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z M22 12.65l-8.58 3.9a2 2 0 0 1-1.66 0L3.18 12.65 M22 17.65l-8.58 3.9a2 2 0 0 1-1.66 0L3.18 17.65",
    calculator: "M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM6 6h12M6 12h2M6 18h2M12 12h2M12 18h2M18 12h2M18 18h2",
    image: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM21 15l-5-5L5 21",
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // Get params with defaults
    const title = searchParams.get("title") || "PCSTYLE";
    const subtitle = searchParams.get("subtitle") || "pcstyle.dev";
    const iconName = searchParams.get("icon") || "code";
    const theme = searchParams.get("theme") || "magenta";

    // Theme colors
    const themeColors = {
        magenta: { primary: "#ff00ff", glow: "rgba(255, 0, 255, 0.4)" },
        cyan: { primary: "#00ffff", glow: "rgba(0, 255, 255, 0.4)" },
    };

    const colors =
        themeColors[theme as keyof typeof themeColors] || themeColors.magenta;
    const iconPath = icons[iconName] || icons.code;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000000",
                    fontFamily: "monospace",
                    position: "relative",
                }}
            >
                {/* Matrix pattern background */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.08,
                        display: "flex",
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, ${colors.primary}33 20px, ${colors.primary}33 21px)`,
                    }}
                />

                {/* Border with glow */}
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 20,
                        border: `2px solid ${colors.primary}`,
                        boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
                        display: "flex",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 30,
                        zIndex: 10,
                    }}
                >
                    {/* Icon */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            border: `3px solid ${colors.primary}`,
                            boxShadow: `0 0 40px ${colors.glow}`,
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        <svg
                            width="60"
                            height="60"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.primary}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d={iconPath} />
                        </svg>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 800,
                            color: "#ffffff",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            textShadow: `0 0 20px ${colors.glow}`,
                            textAlign: "center",
                            maxWidth: 1000,
                            display: "flex",
                        }}
                    >
                        {title}
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: 24,
                            color: colors.primary,
                            fontWeight: 400,
                            letterSpacing: "0.15em",
                            textShadow: `0 0 10px ${colors.glow}`,
                            display: "flex",
                        }}
                    >
                        {subtitle}
                    </div>
                </div>

                {/* Watermark */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        right: 50,
                        fontSize: 18,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        display: "flex",
                    }}
                >
                    <span style={{ color: colors.primary }}>pc</span>
                    <span style={{ color: "#444" }}>style</span>
                </div>

                {/* Scanlines overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)`,
                        pointerEvents: "none",
                        display: "flex",
                    }}
                />
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: {
                "Cache-Control": "public, max-age=3600, s-maxage=86400",
            },
        }
    );
}

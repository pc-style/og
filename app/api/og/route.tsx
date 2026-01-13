import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import * as LucideIcons from "lucide-react";

// Using Node.js runtime as it's often more stable for ImageResponse in newer Next.js versions
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Get params with defaults
        const title = searchParams.get("title") || "PCSTYLE";
        const subtitle = searchParams.get("subtitle") || "pcstyle.dev";
        const iconName = searchParams.get("icon") || "Code";
        const theme = searchParams.get("theme") || "magenta";
        const customColor = searchParams.get("color");
        const emoji = searchParams.get("emoji");

        // Load JetBrains Mono font
        const fontData = await fetch(
            new URL('https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnF8RD8yKx5.woff2', 'https://fonts.google.com')
        ).then((res) => res.arrayBuffer());

        // Theme colors
        const themeColors: Record<string, { primary: string; secondary: string; accent: string }> = {
            magenta: { primary: "#ff00ff", secondary: "rgba(255, 0, 255, 0.15)", accent: "#d946ef" },
            cyan: { primary: "#00ffff", secondary: "rgba(0, 255, 255, 0.15)", accent: "#22d3ee" },
            roxi: { primary: "#ff1a75", secondary: "rgba(255, 26, 117, 0.15)", accent: "#be123c" },
        };

        let colors = themeColors[theme] || themeColors.magenta;

        if (theme === "custom" && customColor) {
            const hex = customColor.startsWith('#') ? customColor : `#${customColor}`;
            colors = {
                primary: hex,
                secondary: `${hex}26`, // ~15% opacity
                accent: hex
            };
        }

        // Get Icon Component
        const pascalIconName = iconName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
        // @ts-ignore
        const Icon = LucideIcons[pascalIconName] || LucideIcons[iconName] || LucideIcons.Code;

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
                        backgroundColor: "#030303",
                        fontFamily: '"JetBrains Mono"',
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Background Grid */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                            maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
                            opacity: 0.5,
                        }}
                    />

                    {/* Radial Glow */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "800px",
                            height: "800px",
                            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
                            filter: "blur(40px)",
                            opacity: 0.6,
                        }}
                    />

                    {/* Cybernetic Frame */}
                    <div
                        style={{
                            position: "absolute",
                            top: 40,
                            left: 40,
                            right: 40,
                            bottom: 40,
                            border: `1px solid ${colors.primary}`,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: `0 0 15px ${colors.secondary}, inset 0 0 15px ${colors.secondary}`,
                        }}
                    >
                         {/* Top Decoration */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px" }}>
                             <div style={{ width: "20px", height: "20px", borderTop: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }} />
                             <div style={{ display: "flex", gap: "8px" }}>
                                <div style={{ width: "40px", height: "4px", background: colors.primary }} />
                                <div style={{ width: "8px", height: "4px", background: colors.primary, opacity: 0.5 }} />
                                <div style={{ width: "4px", height: "4px", background: colors.primary, opacity: 0.3 }} />
                             </div>
                             <div style={{ width: "20px", height: "20px", borderTop: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }} />
                        </div>

                        {/* Bottom Decoration */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "10px" }}>
                             <div style={{ width: "20px", height: "20px", borderBottom: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }} />
                             <div style={{ fontSize: "16px", color: colors.primary, letterSpacing: "2px", fontWeight: 700 }}>
                                 PROTOCOL: OG_V2 // <span style={{ opacity: 0.6 }}>SYSTEM_READY</span>
                             </div>
                             <div style={{ width: "20px", height: "20px", borderBottom: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }} />
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row", // Horizontal layout for better balance
                            alignItems: "center",
                            gap: "40px",
                            padding: "60px 80px",
                            background: "rgba(0, 0, 0, 0.6)",
                            border: `1px solid ${colors.secondary}`,
                            backdropFilter: "blur(10px)",
                            borderRadius: "4px",
                            zIndex: 10,
                        }}
                    >
                        {/* Icon Box */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "160px",
                                height: "160px",
                                background: `linear-gradient(135deg, ${colors.secondary} 0%, rgba(0,0,0,0) 100%)`,
                                border: `1px solid ${colors.primary}`,
                                borderRadius: "20px",
                                boxShadow: `0 0 30px ${colors.secondary}`,
                                position: "relative",
                            }}
                        >
                            <div style={{ position: "absolute", top: -1, left: -1, width: "10px", height: "10px", borderTop: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }} />
                            <div style={{ position: "absolute", bottom: -1, right: -1, width: "10px", height: "10px", borderBottom: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }} />
                            
                            {emoji ? (
                                <div style={{ fontSize: "80px" }}>{emoji}</div>
                            ) : (
                                <Icon
                                    color={colors.primary}
                                    size={80}
                                    strokeWidth={1.5}
                                />
                            )}
                        </div>

                        {/* Text Content */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                maxWidth: "600px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "72px",
                                    fontWeight: 800,
                                    color: "white",
                                    lineHeight: 1,
                                    letterSpacing: "-2px",
                                    marginBottom: "16px",
                                    textShadow: `0 0 10px ${colors.secondary}`,
                                    whiteSpace: "pre-wrap", 
                                }}
                            >
                                {title}
                            </div>
                            <div
                                style={{
                                    fontSize: "28px",
                                    color: "#a1a1aa", // Zinc-400 equivalent
                                    fontWeight: 400,
                                    lineHeight: 1.4,
                                }}
                            >
                                {subtitle}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'JetBrains Mono',
                        data: fontData,
                        style: 'normal',
                    },
                ],
            }
        );
    } catch (err: any) {
        console.error(err);
        return new Response(`Failed to generate image: ${err.message}`, { status: 500 });
    }
}
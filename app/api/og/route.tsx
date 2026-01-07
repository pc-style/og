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

        // Theme colors - using safe RGB/Hex values
        const themeColors: Record<string, { primary: string; secondary: string }> = {
            magenta: { primary: "#ff00ff", secondary: "rgba(255, 0, 255, 0.2)" },
            cyan: { primary: "#00ffff", secondary: "rgba(0, 255, 255, 0.2)" },
            roxi: { primary: "#750834", secondary: "rgba(117, 8, 52, 0.2)" },
        };

        let colors = themeColors[theme] || themeColors.magenta;

        if (theme === "custom" && customColor) {
            colors = {
                primary: customColor.startsWith('#') ? customColor : `#${customColor}`,
                secondary: `${customColor}33`
            };
        } else if (theme === "roxi") {
            colors = themeColors.roxi;
        }

        // Get Icon Component
        // Convert kbab-case to PascalCase if needed, or just try to find it
        const pascalIconName = iconName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
        const Icon = (LucideIcons as any)[pascalIconName] || (LucideIcons as any)[iconName] || LucideIcons.Code;

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
                        position: "relative",
                    }}
                >
                    {/* Simplified Matrix Background (just a few subtle lines) */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "40px 0",
                        }}
                    >
                        <div style={{ height: "1px", width: "100%", backgroundColor: colors.primary, opacity: 0.1, display: "flex" }} />
                        <div style={{ height: "1px", width: "100%", backgroundColor: colors.primary, opacity: 0.1, display: "flex" }} />
                        <div style={{ height: "1px", width: "100%", backgroundColor: colors.primary, opacity: 0.1, display: "flex" }} />
                        <div style={{ height: "1px", width: "100%", backgroundColor: colors.primary, opacity: 0.1, display: "flex" }} />
                        <div style={{ height: "1px", width: "100%", backgroundColor: colors.primary, opacity: 0.1, display: "flex" }} />
                    </div>

                    {/* Main Border */}
                    <div
                        style={{
                            position: "absolute",
                            top: 40,
                            left: 40,
                            right: 40,
                            bottom: 40,
                            border: `1px solid ${colors.primary}`,
                            display: "flex",
                        }}
                    />

                    {/* Content Container */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "60px",
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            border: `2px solid ${colors.primary}`,
                            position: "relative",
                        }}
                    >
                        {/* Icon Area */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100px",
                                height: "100px",
                                borderRadius: "50px",
                                border: `2px solid ${colors.primary}`,
                                backgroundColor: "black",
                                marginBottom: "30px",
                                position: "relative",
                            }}
                        >
                            {emoji ? (
                                <div style={{ fontSize: "50px", display: "flex" }}>{emoji}</div>
                            ) : (
                                <Icon
                                    color={colors.primary}
                                    size={50}
                                    style={{ display: "flex" }}
                                />
                            )}
                        </div>

                        {/* Text Content */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "64px",
                                    fontWeight: "bold",
                                    color: "white",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    display: "flex",
                                    marginBottom: "10px",
                                }}
                            >
                                {title}
                            </div>
                            <div
                                style={{
                                    fontSize: "24px",
                                    color: colors.primary,
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    display: "flex",
                                }}
                            >
                                {subtitle}
                            </div>
                        </div>
                    </div>

                    {/* Corner Decoration */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 60,
                            right: 60,
                            display: "flex",
                            fontSize: "14px",
                            color: colors.primary,
                            fontWeight: "bold",
                        }}
                    >
                        PCSTYLE // PROTOCOL: OG-ALPHA
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (err: any) {
        console.error(err);
        return new Response(`Failed to generate image: ${err.message}`, { status: 500 });
    }
}

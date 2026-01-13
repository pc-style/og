import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import {
    Link,
    Upload,
    File,
    Code,
    Gamepad2,
    Cpu,
    Globe,
    Zap,
    Shield,
    Clock,
    Terminal,
    Sparkles,
    Monitor,
    Box,
    Layers,
    Calculator,
    Activity,
    AlertCircle,
    CheckCircle,
    Command,
    Hash,
    Image as ImageIcon,
    Layout,
    MessageSquare,
    Music,
    Search,
    Settings,
    Share2,
    Smartphone,
    Star,
    Tag,
    User,
    Video,
    Wifi
} from "lucide-react";

export const runtime = "edge";

// Icon mapping for safer dynamic loading
const iconMap: Record<string, any> = {
    link: Link,
    upload: Upload,
    file: File,
    code: Code,
    gamepad: Gamepad2,
    cpu: Cpu,
    globe: Globe,
    zap: Zap,
    shield: Shield,
    clock: Clock,
    terminal: Terminal,
    sparkles: Sparkles,
    monitor: Monitor,
    box: Box,
    layers: Layers,
    calculator: Calculator,
    activity: Activity,
    alert: AlertCircle,
    check: CheckCircle,
    command: Command,
    hash: Hash,
    image: ImageIcon,
    layout: Layout,
    message: MessageSquare,
    music: Music,
    search: Search,
    settings: Settings,
    share: Share2,
    smartphone: Smartphone,
    star: Star,
    tag: Tag,
    user: User,
    video: Video,
    wifi: Wifi,
};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Params
        const title = searchParams.get("title") || "PCSTYLE";
        const subtitle = searchParams.get("subtitle") || "pcstyle.dev";
        const iconName = (searchParams.get("icon") || "code").toLowerCase();
        const theme = searchParams.get("theme") || "magenta";
        const customColor = searchParams.get("color");
        const emoji = searchParams.get("emoji");

        // Font
        const fontData = await fetch(
            new URL('https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnF8RD8yKx5.woff2', 'https://fonts.google.com')
        ).then((res) => res.arrayBuffer());

        // Theme Configuration
        const themeColors: Record<string, { primary: string; secondary: string; glow: string }> = {
            magenta: { primary: "#ff00ff", secondary: "rgba(255, 0, 255, 0.2)", glow: "#d946ef" },
            cyan: { primary: "#00ffff", secondary: "rgba(0, 255, 255, 0.2)", glow: "#22d3ee" },
            roxi: { primary: "#ff1a75", secondary: "rgba(255, 26, 117, 0.2)", glow: "#be123c" },
            emerald: { primary: "#34d399", secondary: "rgba(52, 211, 153, 0.2)", glow: "#10b981" },
            violet: { primary: "#a78bfa", secondary: "rgba(167, 139, 250, 0.2)", glow: "#8b5cf6" },
        };

        let colors = themeColors[theme] || themeColors.magenta;

        if (theme === "custom" && customColor) {
            const hex = customColor.startsWith('#') ? customColor : `#${customColor}`;
            colors = {
                primary: hex,
                secondary: `${hex}33`,
                glow: hex
            };
        }

        // Icon Selection
        const Icon = iconMap[iconName] || Code;

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
                    {/* --- BACKGROUND LAYERS --- */}
                    
                    {/* 1. Grid Pattern */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `
                                linear-gradient(to right, #1a1a1a 1px, transparent 1px),
                                linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
                            `,
                            backgroundSize: "60px 60px",
                            opacity: 0.4,
                        }}
                    />

                    {/* 2. Radial Glow (Ambient) */}
                    <div
                        style={{
                            position: "absolute",
                            top: "-20%",
                            left: "-20%",
                            width: "800px",
                            height: "800px",
                            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
                            filter: "blur(80px)",
                            opacity: 0.4,
                        }}
                    />
                     <div
                        style={{
                            position: "absolute",
                            bottom: "-20%",
                            right: "-20%",
                            width: "800px",
                            height: "800px",
                            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
                            filter: "blur(80px)",
                            opacity: 0.4,
                        }}
                    />

                    {/* 3. Scanline Overlay (Simulated with repeating gradient) */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 51%)",
                            backgroundSize: "100% 4px",
                            pointerEvents: "none",
                        }}
                    />

                    {/* --- UI FRAME --- */}
                    <div
                        style={{
                            position: "absolute",
                            inset: "30px",
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
                            background: 'rgba(0,0,0,0.4)',
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: 8, height: 8, background: colors.primary, borderRadius: '50%' }} />
                                <span style={{ color: '#fff', letterSpacing: '1px' }}>PCSTYLE_OS</span>
                            </div>
                            <div style={{ letterSpacing: '2px' }}>SYS.OG.GENERATOR_V2</div>
                        </div>

                        {/* Bottom Bar */}
                         <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            padding: '16px 24px',
                            borderTop: '1px solid #222',
                            background: 'rgba(0,0,0,0.4)',
                            fontSize: '14px',
                            color: '#666',
                            fontFamily: '"JetBrains Mono"'
                        }}>
                             <div style={{ display: 'flex', gap: '20px' }}>
                                 <span>X: 1024</span>
                                 <span>Y: 0768</span>
                                 <span>Z: 0000</span>
                             </div>
                             <div style={{ color: colors.primary }}>
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
                            padding: "0 80px",
                            zIndex: 10,
                        }}
                    >
                        {/* Icon Container (Left) */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "200px",
                                height: "200px",
                                background: "rgba(0,0,0,0.6)",
                                border: `1px solid ${colors.secondary}`,
                                borderRadius: "30px", // Squircle
                                boxShadow: `0 0 50px ${colors.secondary}`,
                                position: "relative",
                            }}
                        >
                            {/* Inner glow ring */}
                             <div style={{
                                position: 'absolute',
                                inset: -2,
                                borderRadius: "32px",
                                border: `2px solid ${colors.primary}`,
                                opacity: 0.3,
                                filter: 'blur(4px)'
                            }} />
                            
                             {emoji ? (
                                <div style={{ fontSize: "100px" }}>{emoji}</div>
                            ) : (
                                <Icon
                                    color={colors.primary}
                                    size={100}
                                    strokeWidth={1.5}
                                />
                            )}
                        </div>

                        {/* Text Container (Right) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '650px' }}>
                            <div
                                style={{
                                    fontSize: "80px",
                                    fontWeight: 900,
                                    color: "white",
                                    lineHeight: 0.95,
                                    letterSpacing: "-3px",
                                    textShadow: `0 0 40px ${colors.secondary}`,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {title}
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ height: '2px', width: '40px', background: colors.primary }} />
                                <div
                                    style={{
                                        fontSize: "32px",
                                        color: "#ccc",
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
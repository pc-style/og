import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import {
    Link,
    Upload,
    File as FileIcon,
    Code,
    Gamepad2,
    Cpu,
    Globe,
    Shield,
    Clock,
    Sparkles,
    Monitor,
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
    Star,
    Tag,
    User,
    Video,
    Wifi,
    Plus,
    Minus,
    Heart,
    ThumbsUp,
    Bell,
    Calendar,
    Map,
    Mail,
    Phone,
    Lock,
    Unlock,
    Key,
    Trash,
    Edit3,
    CheckSquare,
    Square,
    Circle,
    Triangle,
    Sun,
    Moon,
    Cloud,
    MousePointer2,
    Keyboard,
    Printer,
    Database,
    Server,
    HardDrive,
    Github,
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    Youtube,
    Twitch,
    Dribbble,
    Chrome,
    Terminal as TerminalIcon,
    Smartphone as MobileIcon,
    Box as BoxIcon,
    Layers as LayersIcon,
    Zap as ZapIcon,
    Wind,
    Thermometer,
    Droplets,
    Ghost,
    Skull,
    Target,
    Trophy,
} from "lucide-react";

export const runtime = "edge";

// Icon mapping for safer dynamic loading
const iconMap: Record<string, any> = {
    link: Link,
    upload: Upload,
    file: FileIcon,
    code: Code,
    gamepad: Gamepad2,
    cpu: Cpu,
    globe: Globe,
    zap: ZapIcon,
    shield: Shield,
    clock: Clock,
    terminal: TerminalIcon,
    sparkles: Sparkles,
    monitor: Monitor,
    box: BoxIcon,
    layers: LayersIcon,
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
    smartphone: MobileIcon,
    star: Star,
    tag: Tag,
    user: User,
    video: Video,
    wifi: Wifi,
    plus: Plus,
    minus: Minus,
    heart: Heart,
    "thumbs-up": ThumbsUp,
    bell: Bell,
    calendar: Calendar,
    map: Map,
    mail: Mail,
    phone: Phone,
    lock: Lock,
    unlock: Unlock,
    key: Key,
    trash: Trash,
    edit: Edit3,
    "check-square": CheckSquare,
    square: Square,
    circle: Circle,
    triangle: Triangle,
    sun: Sun,
    moon: Moon,
    cloud: Cloud,
    mouse: MousePointer2,
    keyboard: Keyboard,
    printer: Printer,
    database: Database,
    server: Server,
    "hard-drive": HardDrive,
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    twitch: Twitch,
    dribbble: Dribbble,
    chrome: Chrome,
    wind: Wind,
    thermometer: Thermometer,
    droplets: Droplets,
    ghost: Ghost,
    skull: Skull,
    target: Target,
    trophy: Trophy,
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

        // Icon Selection
        const renderIcon = (name: string, color: string) => {
            const IconComponent = iconMap[name] || Code;
            return <IconComponent color={color} size={100} strokeWidth={2.5} />;
        };

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
                    {/* Grid Pattern */}
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
                            <div style={{ letterSpacing: '2px' }}>SYS.OG.GENERATOR_V2</div>
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
                                <div style={{ fontSize: "100px" }}>{emoji}</div>
                            ) : (
                                renderIcon(iconName, colors.primary)
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
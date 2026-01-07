"use client";

import React, { useState, useEffect } from "react";

export const NeuralCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const isTouchDevice = () => {
            if (typeof window === 'undefined') return false;
            return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0));
        };

        if (isTouchDevice()) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <div
                className="fixed pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
                    transition: "transform 0.1s ease-out",
                }}
            >
                <div
                    className={`w-4 h-4 border-2 border-[#ff00ff] rotate-45 transition-colors duration-200 ${isClicking ? "bg-[#ff00ff]" : "bg-transparent"
                        }`}
                    style={{
                        boxShadow: isClicking
                            ? "0 0 15px #ff00ff, 0 0 30px #ff00ff"
                            : "0 0 8px #ff00ff88",
                    }}
                />
            </div>
            <div
                className="fixed pointer-events-none z-[9999] opacity-40 mix-blend-difference"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: "translate(-50%, -50%)",
                    transition: "all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
                }}
            >
                <div className="w-8 h-8 border border-[#ff00ff] rotate-45" />
            </div>
        </>
    );
};

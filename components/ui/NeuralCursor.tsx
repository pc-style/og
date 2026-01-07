"use client";

import React, { useState, useEffect } from "react";

export const NeuralCursor = () => {
    const [mouse, setMouse] = useState({ x: -100, y: -100 });
    const [delayedMouse, setDelayedMouse] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const isTouchDevice = () => {
            if (typeof window === 'undefined') return false;
            return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        };

        if (isTouchDevice()) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY });
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedMouse(mouse);
        }, 60);
        return () => clearTimeout(timeout);
    }, [mouse]);

    if (!isVisible) return null;

    return (
        <div className="hidden lg:block pointer-events-none fixed inset-0 z-[10000] mix-blend-difference">
            {/* Connection Line */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
                <line
                    x1={mouse.x}
                    y1={mouse.y}
                    x2={delayedMouse.x}
                    y2={delayedMouse.y}
                    stroke="#ff00ff"
                    strokeWidth="1"
                />
            </svg>

            {/* Main Cursor (Leading Point) */}
            <div
                className="absolute transition-transform duration-75 ease-out"
                style={{
                    left: 0,
                    top: 0,
                    transform: `translate(${mouse.x - 8}px, ${mouse.y - 8}px) scale(${isClicking ? 0.7 : 1})`,
                }}
            >
                <div
                    className={`w-4 h-4 border border-[#ff00ff] rounded-full transition-colors duration-200 ${isClicking ? "bg-[#ff00ff]" : "bg-transparent"
                        }`}
                    style={{
                        boxShadow: isClicking ? "0 0 15px #ff00ff" : "0 0 5px #ff00ff44",
                    }}
                />
            </div>

            {/* Trailing Point */}
            <div
                className="absolute opacity-50"
                style={{
                    left: 0,
                    top: 0,
                    transform: `translate(${delayedMouse.x - 4}px, ${delayedMouse.y - 4}px)`,
                }}
            >
                <div className="w-2 h-2 bg-[#ff00ff] rounded-full blur-[1px]" />
            </div>
        </div>
    );
};

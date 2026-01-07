"use client";

import React from 'react';

export const CRTOverlay = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-[5000] overflow-hidden select-none">
            {/* Scanlines with RGB split effect */}
            <div
                className="absolute inset-0 bg-[length:100%_4px,6px_100%] pointer-events-none opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))`
                }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
    );
};

import React from "react";

const Loader: React.FC = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "140px",
            width: "100%",
            gap: "18px",
            borderRadius: "18px",
            height: "calc(100vh - 92px)",
        }}
    >
        <div className="modern-loader">
            <div className="dot dot1" />
            <div className="dot dot2" />
            <div className="dot dot3" />
        </div>
        <span
            style={{
            color: "#222",
            fontWeight: 600,
            fontSize: "1.15rem",
            letterSpacing: "0.7px",
            fontFamily: "Segoe UI, Arial, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            }}
        >
            Loading, please wait
            <span className="loading-dots">
            <span className="dot-anim dot-anim1">.</span>
            <span className="dot-anim dot-anim2">.</span>
            <span className="dot-anim dot-anim3">.</span>
            </span>
            <style>
            {`
                .loading-dots {
                display: inline-block;
                margin-left: 2px;
                }
                .dot-anim {
                opacity: 0.3;
                animation: dotFlashing 1.2s infinite linear;
                font-size: 1.3em;
                font-weight: bold;
                color: #3498db;
                }
                .dot-anim1 { animation-delay: 0s; }
                .dot-anim2 { animation-delay: 0.2s; }
                .dot-anim3 { animation-delay: 0.4s; }

                @keyframes dotFlashing {
                0% { opacity: 0.3; }
                20% { opacity: 1; }
                100% { opacity: 0.3; }
                }
            `}
            </style>
        </span>
        <style>
            {`
                .modern-loader {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modern-loader .dot {
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3498db 60%, #8e44ad 100%);
                    box-shadow: 0 2px 8px rgba(52,152,219,0.18);
                    opacity: 0.85;
                    animation: bounce 1.2s infinite;
                }
                .modern-loader .dot1 {
                    left: 0;
                    animation-delay: 0s;
                }
                .modern-loader .dot2 {
                    left: 22px;
                    animation-delay: 0.2s;
                }
                .modern-loader .dot3 {
                    left: 44px;
                    animation-delay: 0.4s;
                }
                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: translateY(0);
                        opacity: 0.85;
                    }
                    40% {
                        transform: translateY(-18px) scale(1.15);
                        opacity: 1;
                    }
                }
            `}
        </style>
    </div>
);

export default Loader;

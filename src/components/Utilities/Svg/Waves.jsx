import React from "react";
import style from "./Waves.module.css";

const Waves = ({ className }) => {
    return (
        <>
            <svg
                className={`${className} ${style.waves}`}
                xmlns="http://www.w3.org/2000/svg"
                xmlns2="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    ></path>
                </defs>
                <g className={`${style.parallax}`}>
                    <use
                        href="#gentle-wave"
                        x="48"
                        y="0"
                        fill="rgba(255,255,255,0.7)"
                    ></use>
                    <use
                        href="#gentle-wave"
                        x="48"
                        y="3"
                        fill="rgba(255,255,255,0.5)"
                    ></use>
                    <use
                        href="#gentle-wave"
                        x="48"
                        y="5"
                        fill="rgba(255,255,255,0.3)"
                    ></use>
                    <use
                        href="#gentle-wave"
                        x="48"
                        y="7"
                        fill="rgba(255,255,255,1)"
                    ></use>
                </g>
            </svg>
        </>
    );
};

export default Waves;

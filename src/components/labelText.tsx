import * as React from "react";

import "../styles/labelText.css"

export interface LabelTextProps {
    className?: string;
    x: number;
    y: number;
    text: string;
    anchor?: "start" | "middle" | "end"
    alignment?: "hanging" | "middle" | "baseline"
}

export const LabelText = (props: LabelTextProps) => {
    const { x, y, text, anchor, alignment, className } = props;
    return <text 
        className={["easel-text", className].filter(e => !!e).join(" ")}
        x={x}
        y={y}
        textAnchor={anchor}
        alignmentBaseline={alignment}
        fill="var(--color-outline)">
            {text}
        </text>
}

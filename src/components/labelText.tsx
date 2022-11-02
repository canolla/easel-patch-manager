import * as React from "react";

import "../styles/labelText.css"

export interface LabelTextProps {
    x: number;
    y: number;
    text: string;
    anchor?: "start" | "middle" | "end"
    alignment?: "hanging" | "middle" | "baseline"
}

export const LabelText = (props: LabelTextProps) => {
    const { x, y, text, anchor, alignment } = props;
    return <text 
        className="easel-text"
        x={x}
        y={y}
        textAnchor={anchor}
        alignmentBaseline={alignment}
        fill="var(--color-outline)">
            {text}
        </text>
}

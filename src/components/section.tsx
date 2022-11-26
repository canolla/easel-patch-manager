import * as React from "react";
import { LabelText } from "./labelText";

export interface SectionProps {
    width: number;
    height: number;
    left: number;
    top: number;
    label?: string;
    fill?: string;
}

export const Section = (props: React.PropsWithChildren<SectionProps>) => {
    const { width, height, left, top, label, fill, children } = props;

    return <g className="section" transform={`translate(${left}, ${top})`}>
        <rect
            x={0} y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill={fill || "none"}
            stroke="var(--color-outline)"/>
        {children}
        {label && <LabelText x={width / 2} y={height - 10} text={label} anchor="middle"/>}
    </g>
}
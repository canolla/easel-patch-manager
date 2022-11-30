import * as React from "react";
import '../styles/iconButton.css';


export interface IconButtonProps {
    left: number;
    top: number;
    title: string;
    onClick: () => void;
}

const ICON_BUTTON_WIDTH = 60;

export const IconButton = (props: React.PropsWithChildren<IconButtonProps>) => {
    const { children, left, top, title, onClick } = props;
    
    const onKeydown = (ev: React.KeyboardEvent<SVGGElement>) => {
        if (ev.key === "Enter") {
            onClick();
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    return <g
        transform={`translate(${left} ${top})`}
        className="icon-button"
        aria-label={title}
        onClick={onClick}
        onKeyDown={onKeydown}
        tabIndex={0}
        role="button">
        <rect
            stroke="var(--color-outline)"
            width={ICON_BUTTON_WIDTH}
            height={ICON_BUTTON_WIDTH}
            fill="var(--color-background)"
            />
            <g transform={`translate(${5} ${5})`}>
                {children}
            </g>
    </g>
}
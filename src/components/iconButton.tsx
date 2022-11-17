import * as React from "react";

export interface IconButtonProps {
    left: number;
    top: number;
}

export const IconButton = (props: React.PropsWithChildren<IconButtonProps>) => {
    const { children } = props;
    return <g>
        <rect
            />
            {children}
    </g>
}
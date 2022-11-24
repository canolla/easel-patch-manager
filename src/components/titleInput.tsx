import * as React from "react";

import '../styles/titleInput.css';

export interface TitleInputProps {
    value: string;
    left: number;
    top: number;
    onChange: (newValue: string) => void;
    
    width: number;
    height: number;
}

export const TitleInput = (props: TitleInputProps) => {
    const { value, left, top, onChange, width, height } = props;
    const [ currentValue, setCurrentValue ] = React.useState<string | undefined>();

    const onInputChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(ev.currentTarget.value);
    }

    const onBlurEvent = (ev: React.FocusEvent<HTMLInputElement>) => {
        if (currentValue) onChange(currentValue)
        setCurrentValue(undefined);
    }

    const onKeydown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === "Enter") ev.currentTarget.blur();
    }

    return <g transform={`translate(${left} ${top})`} className="title-input">
        <rect
            width={width}
            height={height}
            fill="none"
            stroke="var(--color-outline)"
            />
        <foreignObject
            width={width}
            height={height}>
            <input
                type="text"
                value={currentValue == undefined ? value : currentValue}
                onChange={onInputChanged}
                onBlur={onBlurEvent}
                onKeyDown={onKeydown}
                />
        </foreignObject>
    </g>
}
import * as React from "react";
import { connect } from "react-redux";
import { getReadableName } from "../midiMessages";
import { dispatchUpdateFader } from "../store/dispatch";
import { State } from "../store/reducer";
import { toSVGCoordinate } from "../util";

export interface KnobProps {
    color: string;
    x: number;
    y: number;
    value: number;
    module: string;
    fader: string;
    onChange?: (value: number) => void;

    dispatchUpdateFader: (module: string, param: string, value: number) => void;
}

const MAX_VALUE = 0x7ff;
const KNOB_RADIUS = 25;
const KNOB_THICKNESS = 18;

export const KnobImpl = (props: KnobProps) => {
    const { color, x, y, value, module, fader, dispatchUpdateFader } = props;

    const minAngle = 135 * Math.PI / 180;
    const maxAngle = 405 * Math.PI / 180;
    const angle = minAngle + (value / MAX_VALUE) * (maxAngle - minAngle);
    let svgGRef: SVGGElement;

    React.useEffect(() => {
        const pointerUpdate = (e: PointerEvent) => {
            if (!e.buttons) return;
            const rect = svgGRef.getBoundingClientRect();

            const eventPoint = toSVGCoordinate(svgGRef.ownerSVGElement!, e.clientX, e.clientY);
            const rectPoint = toSVGCoordinate(svgGRef.ownerSVGElement!, rect.left + rect.width / 2, rect.top + rect.height / 2)
            let angle = Math.atan2(eventPoint.y - rectPoint.y, eventPoint.x - rectPoint.x);
            if (angle < minAngle) {
                angle += Math.PI * 2
            }
            else if (angle > maxAngle) {
                angle -= Math.PI * 2
            }

            if (angle < minAngle || angle > maxAngle) return;

            dispatchUpdateFader(module, fader, Math.min(MAX_VALUE, Math.max(0, (((angle - minAngle) / (maxAngle - minAngle)) * MAX_VALUE)) | 0));
        }

        let frameRef: number | undefined = undefined;;

        const throttled = (e: PointerEvent) => {
            if (frameRef) cancelAnimationFrame(frameRef);
            frameRef = requestAnimationFrame(() => {
                frameRef = undefined;
                pointerUpdate(e);
            })
        }

        svgGRef.addEventListener("pointerdown", throttled);
        svgGRef.addEventListener("pointermove", throttled);
        return () => {
            svgGRef.removeEventListener("pointerdown", throttled);
            svgGRef.removeEventListener("pointermove", throttled);
        }
    })

    const handleGRef = (g: SVGGElement) => {
        if (!g) return;
        svgGRef = g;
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "PageUp") {
            dispatchUpdateFader(module, fader, Math.min(value + 100, MAX_VALUE));
            e.preventDefault();
            e.stopPropagation();
        }
        else if (e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "PageDown") {
            dispatchUpdateFader(module, fader, Math.max(value - 100, 0));
            e.preventDefault();
            e.stopPropagation();
        }
        else if (e.key === "End") {
            dispatchUpdateFader(module, fader, MAX_VALUE);
            e.preventDefault();
            e.stopPropagation();
        }
        else if (e.key === "Home") {
            dispatchUpdateFader(module, fader, 0);
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const innerArcFlag = angle - minAngle < Math.PI ? "0" : "1";

    return <g
        className="easel-knob"
        transform={`translate(${x}, ${y})`}
        ref={handleGRef}
        tabIndex={0}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={MAX_VALUE}
        aria-valuenow={value}
        aria-label={getReadableName(module, fader)}
        onKeyDown={onKeyDown}>
        <path
            className="knob-bg-outline"
            d={`M ${Math.cos(minAngle) * KNOB_RADIUS} ${Math.sin(minAngle) * KNOB_RADIUS} A ${KNOB_RADIUS} ${KNOB_RADIUS} 0 1 1 ${Math.cos(maxAngle) * KNOB_RADIUS} ${Math.sin(maxAngle) * KNOB_RADIUS}`}
            stroke="var(--color-outline)"
            fill="none"
            strokeLinecap="round"
            strokeWidth={KNOB_THICKNESS + 2}
        />
        <path
            className="knob-bg"
            d={`M ${Math.cos(minAngle) * KNOB_RADIUS} ${Math.sin(minAngle) * KNOB_RADIUS} A ${KNOB_RADIUS} ${KNOB_RADIUS} 0 1 1 ${Math.cos(maxAngle) * KNOB_RADIUS} ${Math.sin(maxAngle) * KNOB_RADIUS}`}
            stroke="var(--color-switch-bg)"
            fill="none"
            strokeLinecap="round"
            strokeWidth={KNOB_THICKNESS}
        />
        <path
            className="knob-fg-outline"
            d={`M ${Math.cos(minAngle) * KNOB_RADIUS} ${Math.sin(minAngle) * KNOB_RADIUS} A ${KNOB_RADIUS} ${KNOB_RADIUS} 0 ${innerArcFlag} 1 ${Math.cos(angle) * KNOB_RADIUS} ${Math.sin(angle) * KNOB_RADIUS}`}
            stroke="var(--color-outline)"
            fill="none"
            strokeLinecap="round"
            strokeWidth={KNOB_THICKNESS - 2}
        />
        <path
            className="knob-fg"
            d={`M ${Math.cos(minAngle) * KNOB_RADIUS} ${Math.sin(minAngle) * KNOB_RADIUS} A ${KNOB_RADIUS} ${KNOB_RADIUS} 0 ${innerArcFlag} 1 ${Math.cos(angle) * KNOB_RADIUS} ${Math.sin(angle) * KNOB_RADIUS}`}
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeWidth={KNOB_THICKNESS - 4}
        />
        <rect width={KNOB_RADIUS * 2} height={KNOB_RADIUS * 2} x={-KNOB_RADIUS} y={-KNOB_RADIUS} opacity="0" />
    </g>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        value: (state.patch as any)[ownProps.module]?.[ownProps.fader],
    }
}

const mapDispatchToProps = {
    dispatchUpdateFader,
};

export const Knob = connect(mapStateToProps, mapDispatchToProps)(KnobImpl);
import * as React from "react";
import { connect } from "react-redux";
import { dispatchSetDragPoint } from "../store/dispatch";
import { State } from "../store/reducer";
import { toSVGCoordinate } from "../util";
import { LabelText } from "./labelText";

export enum ConnectionPoint {
    PulseOutput,
    PressureOutput,
    PitchOutput,
    SequentialVoltageOutput,
    EnvelopeGeneratorOutput,
    PulserOutput,
    RandomOutput,
    Panel1Output,
    Panel2Output,
    EnvelopeDetectorOutput,
    ModulationCVOutput,
    PulserPeriodInput,
    ModulationOscFrequencyInput,
    ModulationOscModulationInput,
    ComplexOscPitchInput,
    ComplexOscTimbreInput,
    LoPassGate1Input,
    LoPassGate2Input,
    PanelInput
}

export interface JackProps {
    x: number;
    y: number;
    color: string;
    connectionPoint: ConnectionPoint;
    id?: number;
    arrow?: boolean;
    text?: string;

    dispatchSetDragPoint: (connectionPoint: ConnectionPoint, id: number, x: number, y: number) => void;
}

const OUTER_RADIUS = 25;
const INNER_RADIUS = 12;

export const JackImpl = (props: JackProps) => {
    const { x, y, text, color, connectionPoint, id, arrow, dispatchSetDragPoint } = props;

    const handleCircleRef = (ref: SVGCircleElement) => {
        if (ref) {
            const rect = ref.getBoundingClientRect();
            const point = toSVGCoordinate(
                ref.ownerSVGElement!,
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            )
            dispatchSetDragPoint(connectionPoint, id || 0, point.x, point.y);
        }
    }

    return <>
        <g transform={`translate(${x} ${y})`}>        
            <circle
                ref={handleCircleRef}
                cx={0}
                cy={0}
                r={OUTER_RADIUS}
                fill={color}
                stroke="var(--color-outline)" />
            <circle 
                cx={0}
                cy={0}
                r={INNER_RADIUS}
                fill="#dedede"
                stroke="var(--color-outline)"  />
            {text && 
                <LabelText
                    text={text}
                    x={0}
                    y={OUTER_RADIUS + 20}
                    alignment="baseline"
                    anchor="middle" />
            }
            {arrow &&
                <g>
                    <line
                        x1={0}
                        y1={-OUTER_RADIUS}
                        x2={0}
                        y2={-OUTER_RADIUS - 78}
                        stroke="var(--color-outline)" />
                    <path
                        d={`M 0 ${-OUTER_RADIUS - 80} l ${4} ${10} q ${-4} ${-4} ${-8} ${0} Z`}
                        fill="var(--color-outline)"
                    />
                </g>
            }
        </g>
    </>
}


function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps
    }
}

const mapDispatchToProps = {
    dispatchSetDragPoint,
};

export const Jack = connect(mapStateToProps, mapDispatchToProps)(JackImpl);
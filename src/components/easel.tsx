import * as React from "react";
import { connect } from "react-redux";
import { dispatchMakeConnection } from "../store/dispatch";
import { DragPoint, State } from "../store/reducer";
import { Connection } from "../types";
import { distance, toSVGCoordinate } from "../util";
import { Cable } from "./cable";
import { ConnectionPoint } from "./jack";
import { ComplexOscillatorView } from "./modules/complexOscillator";
import { DualLoPassGates } from "./modules/dualLoPassGates";
import { EnvelopeGenerator } from "./modules/envelopeGenerator";
import { ModulationOscillator } from "./modules/modulationOscillator";
import { Patchbay } from "./modules/patchbay";
import { Pulser } from "./modules/pulser";
import { Sequencer } from "./modules/sequencer";
import { TopBar } from "./modules/topBar";

export interface EaselProps {
    dragPoints: DragPoint[];
    connections: Connection[];
    dispatchMakeConnection: (startPoint: ConnectionPoint, startId: number, endPoint: ConnectionPoint, endId: number) => void;
}

const DRAG_RADIUS = 25;

export const EaselImpl = (props: EaselProps) => {
    const { dragPoints, connections, dispatchMakeConnection } = props;

    const [dragStart, setDragStart] = React.useState<DragPoint>();
    const [dragEnd, setDragEnd] = React.useState<DOMPoint>();

    let svgRef: SVGSVGElement;

    const handleSVGRef = (ref: SVGSVGElement) => {
        if (ref) svgRef = ref;
    }

    React.useEffect(() => {
        const getDragPoint = (svgCoordinate: DOMPoint) => {
            for (const point of dragPoints) {
                if (distance(svgCoordinate.x, svgCoordinate.y, point.x, point.y) <= DRAG_RADIUS) {
                    return point;
                }
            }
        }

        const onPointerDown = (ev: PointerEvent) => {
            const point = toSVGCoordinate(svgRef, ev.clientX, ev.clientY);
            const dragPoint = getDragPoint(point);

            if (dragPoint) {
                setDragStart(dragPoint);
                ev.preventDefault();
                ev.stopPropagation();
            }
        }

        const onPointerUp = (ev: PointerEvent) => {
            if (!dragStart) return;
            const point = toSVGCoordinate(svgRef, ev.clientX, ev.clientY);
            const dragPoint = getDragPoint(point);

            if (dragPoint) {
                dispatchMakeConnection(
                    dragStart!.connectionPoint,
                    dragStart!.id,
                    dragPoint.connectionPoint,
                    dragPoint.id
                )
            }

            setDragStart(undefined);
            setDragEnd(undefined);
        }

        const onPointerMove = (ev: PointerEvent) => {
            if (!dragStart) return;

            const point = toSVGCoordinate(svgRef, ev.clientX, ev.clientY);
            setDragEnd(point);
            ev.preventDefault();
            ev.stopPropagation();
        }

        const onPointerLeave = (ev: PointerEvent) => {
            setDragStart(undefined);
            setDragEnd(undefined);
        }

        svgRef.addEventListener("pointerdown", onPointerDown);
        svgRef.addEventListener("pointerup", onPointerUp);
        svgRef.addEventListener("pointermove", onPointerMove, true);
        svgRef.addEventListener("pointerleave", onPointerLeave);
        
        return () => {
            svgRef.removeEventListener("pointerdown", onPointerDown);
            svgRef.removeEventListener("pointerup", onPointerUp);
            svgRef.removeEventListener("pointermove", onPointerMove, true);
            svgRef.removeEventListener("pointerleave", onPointerLeave);
        }
    }, [dragStart, dragPoints]);

    const takenColors: boolean[] = [];
    const cables = connections.map((c, index) => {
        const start = dragPoints.find(p => c.start.connectionPoint === p.connectionPoint && c.start.id === p.id);
        const end = dragPoints.find(p => c.end.connectionPoint === p.connectionPoint && c.end.id === p.id);
        takenColors[c.color] = true;
        return <Cable
            key={index}
            x0={start!.x}
            y0={start!.y}
            x1={end!.x}
            y1={end!.y}
            colorIndex={c.color} />
    })

    let nextColor = takenColors.length;
    for (let i = 0; i < takenColors.length; i++) {
        if (!takenColors[i]) {
            nextColor = i;
            break;
        }
    }

    return <svg viewBox="0 0 1580 900" xmlns="http://www.w3.org/2000/svg" ref={handleSVGRef}>
        <defs>
            <pattern id="stripes"
                    x="0" y="0" width="8" height="8"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(-45)" >

                <rect
                    x={0}
                    y={0}
                    width={1}
                    height={8}
                    fill="var(--color-outline)" />

            </pattern>
        </defs>
        <TopBar />
        <Sequencer />
        <EnvelopeGenerator />
        <Pulser />
        <ModulationOscillator />
        <ComplexOscillatorView />
        <DualLoPassGates />
        <Patchbay />
        { cables }
        {dragStart &&
            <Cable
                x0={dragStart.x}
                y0={dragStart.y}
                x1={dragEnd ? dragEnd.x : dragStart.x}
                y1={dragEnd ? dragEnd.y : dragStart.y}
                colorIndex={nextColor}
                />
        }
    </svg>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        dragPoints: state.dragPoints,
        connections: state.patch.connections
    }
}

const mapDispatchToProps = {
    dispatchMakeConnection
};

export const Easel = connect(mapStateToProps, mapDispatchToProps)(EaselImpl);
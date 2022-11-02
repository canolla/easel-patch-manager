import { ConnectionPoint } from "../components/jack";
import { Connection, ConnectionJack, Easel, EaselKind } from "../types";
import { emptyPatch } from "../util";
import { MAKE_CONNECTION, SET_DRAG_POINT, UPDATE_FADER, UPDATE_SWITCH } from "./actions";

export interface State {
    patch: Easel;
    dragPoints: DragPoint[];
    kind: EaselKind;
}

export interface DragPoint {
    connectionPoint: ConnectionPoint;
    id: number;
    x: number;
    y: number;
}

const initialState: State = {
    patch: emptyPatch(),
    dragPoints: [],
    kind: "iprogram"
}

export function topReducer(state = initialState, action: any): State {
    switch (action.type) {
        case UPDATE_FADER:
            return {
                ...state,
                patch: {
                    ...state.patch,
                    [action.module]: {
                        ...state.patch[action.module as keyof Easel],
                        [action.param]: Math.min(Math.max(action.value, 0), 0xfff)
                    }
                }
            };
        case UPDATE_SWITCH:
            return {
                ...state,
                patch: {
                    ...state.patch,
                    [action.module]: {
                        ...state.patch[action.module as keyof Easel],
                        [action.param]: action.value
                    }
                }
            };
        case SET_DRAG_POINT:
            return {
                ...state,
                dragPoints: setDragPoint(
                    state.dragPoints,
                    action.connectionPoint,
                    action.id,
                    action.x,
                    action.y
                )
            };
        case MAKE_CONNECTION:
            return {
                ...state,
                patch: {
                    ...state.patch,
                    connections: makeConnection(
                        state.patch.connections,
                        action.startPoint,
                        action.startId,
                        action.endPoint,
                        action.endId
                    )
                }
            }
    }

    return state;
}


function setDragPoint(dragPoints: DragPoint[], connectionPoint: ConnectionPoint, id: number, x: number, y: number) {
    const result = dragPoints.map(p => ({...p}));

    for (const point of dragPoints) {
        if (point.connectionPoint === connectionPoint && point.id === id) {
            point.x = x;
            point.y = y;
            return result;
        }
    }

    result.push({
        connectionPoint,
        id,
        x,
        y
    });

    return result;
}

function makeConnection(existing: Connection[], startPoint: ConnectionPoint, startId: number, endPoint: ConnectionPoint, endId: number) {
    let start: ConnectionJack = {
        connectionPoint: startPoint,
        id: startId
    }

    let end: ConnectionJack = {
        connectionPoint: endPoint,
        id: endId
    }

    if (start.connectionPoint === end.connectionPoint) {
        if (start.id > end.id) {
            let swap = start;
            start = end;
            end = swap;
        }
    }
    else if (start.connectionPoint > end.connectionPoint) {
        let swap = start;
        start = end;
        end = swap;
    }

    const takenColors: boolean[] = [];
    
    for (const connection of existing) {
        if (connection.start.connectionPoint === start.connectionPoint &&
            connection.start.id === start.id &&
            connection.end.connectionPoint === end.connectionPoint &&
            connection.end.id === end.id) {
                return existing;
        }

        takenColors[connection.color] = true;
    }

    let nextColor = takenColors.length;
    for (let i = 0; i < takenColors.length; i++) {
        if (!takenColors[i]) {
            nextColor = i;
            break;
        }
    }

    return existing.slice().concat([{ start, end, color: nextColor }]);
}
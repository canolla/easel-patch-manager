import { ConnectionPoint } from "../components/jack";
import { sendMIDIMessage } from "../midi";
import { createFaderMessage, createSwitchMessage } from "../midiMessages";
import { Connection, ConnectionJack, Easel, EaselKind } from "../types";
import { emptyPatch, rateLimit } from "../util";
import { MAKE_CONNECTION, SET_DRAG_POINT, SET_MIDI_INPUT, SET_MIDI_OUTPUT, UPDATE_FADER, UPDATE_SWITCH } from "./actions";

export interface State {
    patch: Easel;
    dragPoints: DragPoint[];
    kind: EaselKind;

    midiInput?: string;
    midiOutput?: string;
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
    sendMIDI(state.midiOutput, action);
    
    switch (action.type) {
        case UPDATE_FADER:
            return {
                ...state,
                patch: {
                    ...state.patch,
                    [action.module]: {
                        ...state.patch[action.module as keyof Easel],
                        [action.param]: Math.min(Math.max(action.value, 0), 0x7ff)
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
        case SET_MIDI_INPUT:
            return {
                ...state,
                midiInput: action.name
            }
        case SET_MIDI_OUTPUT:
            return {
                ...state,
                midiOutput: action.name
            }
    }

    return state;
}

const sendMIDI = rateLimit((output: string | undefined, action: any) => {
    if (!output) return;

    switch (action.type) {
        case UPDATE_FADER:
            sendMIDIMessage(output, createFaderMessage(action.module, action.param, action.value));
            break;
        case UPDATE_SWITCH:
            sendMIDIMessage(output, createSwitchMessage(action.module, action.param, action.value));
            break;
    }
}, 16)


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
import { ConnectionPoint } from "../components/jack";
import { SavedPatch } from "../indexedDB";
import { sendMIDIMessage } from "../midi";
import { createConnectCVMessage, createDisconnectCVMessage, createFaderMessage, createSwitchMessage } from "../midiMessages";
import { Connection, ConnectionJack, Easel, MidiMessageSpeed, ModalState, ModalType } from "../types";
import { cleanPatchName, decodePatch, emptyPatch, rateLimit } from "../util";
import { CONNECT_CV, DISCONNECT_CV, HIDE_MODAL, OPEN_SAVED_PATCH, SET_DRAG_POINT, SET_MIDI_INPUT, SET_MIDI_OUTPUT, SET_MIDI_SPEED, SET_PATCH, SET_PATCH_EDITED, SET_PATCH_NAME, SHOW_MODAL, UPDATE_FADER, UPDATE_SWITCH } from "./actions";

export interface State {
    saved?: SavedPatch;
    patch: Easel;
    name: string;
    dragPoints: DragPoint[];

    midiInput?: string;
    midiOutput?: string;
    midiSpeed: MidiMessageSpeed;

    modal?: ModalState;
    patchEdited?: boolean;
}

export interface DragPoint {
    connectionPoint: ConnectionPoint;
    id: number;
    x: number;
    y: number;
}

const initialState: State = {
    patch: emptyPatch(),
    name: "Untitled",
    dragPoints: [],
    midiSpeed: "medium",
}

export function topReducer(state = initialState, action: any): State {
    sendMIDI(state.midiOutput, action, state);
    
    switch (action.type) {
        case OPEN_SAVED_PATCH:
            return {
                ...state,
                saved: action.patch,
                name: action.patch.name,
                patch: decodePatch(action.patch.patch),
                patchEdited: false
            };
        case SET_PATCH:
            return {
                ...state,
                patch: action.patch
            };
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
        case CONNECT_CV:
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
        case DISCONNECT_CV:
            return {
                ...state,
                patch: {
                    ...state.patch,
                    connections: breakConnection(
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
        case SET_PATCH_NAME:
            return {
                ...state,
                name: cleanPatchName(action.name)
            }
        case SHOW_MODAL:
            return {
                ...state,
                modal: defaultModalState(action.modalType)
            }
        case HIDE_MODAL:
            return {
                ...state,
                modal: undefined
            }
        case SET_MIDI_SPEED:
            return {
                ...state,
                midiSpeed: action.speed
            }
        case SET_PATCH_EDITED:
            return {
                ...state,
                patchEdited: action.edited
            }
    }

    return state;
}

const sendMIDI = rateLimit((output: string | undefined, action: any, state: State) => {
    if (!output) return;

    switch (action.type) {
        case UPDATE_FADER:
            sendMIDIMessage(output, createFaderMessage(action.module, action.param, action.value));
            break;
        case UPDATE_SWITCH:
            sendMIDIMessage(output, createSwitchMessage(action.module, action.param, action.value));
            break;
        case CONNECT_CV:
            sendMIDIMessage(output, createConnectCVMessage(action.startPoint, action.endPoint))
            break;
        case DISCONNECT_CV:
            // There are duplicates of some connection points, so we only want to send the message
            // if there is exactly one connection left (the one being disconnected)
            let cvCount = 0;
            for (const connection of state.patch.connections) {
                if (connection.start.connectionPoint === action.startPoint && connection.end.connectionPoint === action.endPoint ||
                    connection.end.connectionPoint === action.startPoint && connection.start.connectionPoint === action.endPoint) {
                    cvCount++;
                }
            }

            if (cvCount === 1) {
                sendMIDIMessage(output, createDisconnectCVMessage(action.startPoint, action.endPoint));
            }
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

function breakConnection(existing: Connection[], startPoint: ConnectionPoint, startId: number, endPoint: ConnectionPoint, endId: number) {
    return existing.filter(c => {
        if (c.start.connectionPoint === startPoint && c.start.id === startId && c.end.connectionPoint === endPoint && c.end.id === endId) return false;
        if (c.start.connectionPoint === endPoint && c.start.id === endId && c.end.connectionPoint === startPoint && c.end.id === startId) return false;

        return true;
    })
}

function defaultModalState(type: ModalType): ModalState {
    return {
        type
    }
}
// export interface Easel {
//     sequencer: SequentialVoltageSource;
//     envelope: EnvelopeGenerator;
//     pulser: Pulser;
//     modOsc: ModulationOscillator;
//     complexOsc: ComplexOscillator;
//     gates: DualLoPassGate;
//     random: Random;
//     connections: boolean[][];
// }

import { ConnectionPoint } from "../components/jack";
import { ComplexOscillator, DualLoPassGate, Easel, EnvelopeGenerator, ModulationOscillator, Pulser, Random, SwitchValue } from "../types";
import { MAKE_CONNECTION, SET_DRAG_POINT, SET_MIDI_INPUT, SET_MIDI_OUTPUT, UPDATE_FADER, UPDATE_SWITCH } from "./actions";


export function dispatchUpdateFader(module: "envelope", param: keyof EnvelopeGenerator, value: number): any;
export function dispatchUpdateFader(module: "pulser", param: keyof Pulser, value: number): any;
export function dispatchUpdateFader(module: "modOsc", param: keyof ModulationOscillator, value: number): any;
export function dispatchUpdateFader(module: "complexOsc", param: keyof ComplexOscillator, value: number): any;
export function dispatchUpdateFader(module: "gates", param: keyof DualLoPassGate, value: number): any;
export function dispatchUpdateFader(module: "random", param: keyof Random, value: number): any;
export function dispatchUpdateFader(module: keyof Easel, param: string, value: number) {
    return {
        type: UPDATE_FADER,
        module,
        param,
        value
    };
};

export function dispatchUpdateSwitch(module: "envelope", param: keyof EnvelopeGenerator, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "pulser", param: keyof Pulser, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "modOsc", param: keyof ModulationOscillator, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "complexOsc", param: keyof ComplexOscillator, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "gates", param: keyof DualLoPassGate, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: "random", param: keyof Random, value: SwitchValue): any;
export function dispatchUpdateSwitch(module: keyof Easel, param: string, value: SwitchValue) {
    return {
        type: UPDATE_SWITCH,
        module,
        param,
        value
    };
};

export function dispatchSetDragPoint(connectionPoint: ConnectionPoint, id: number, x: number, y: number) {
    return {
        type: SET_DRAG_POINT,
        connectionPoint,
        id,
        x,
        y
    }
}

export function dispatchMakeConnection(startPoint: ConnectionPoint, startId: number, endPoint: ConnectionPoint, endId: number) {
    return {
        type: MAKE_CONNECTION,
        startPoint,
        startId,
        endPoint,
        endId
    }
}

export function dispatchSetMIDIInput(name: string) {
    return {
        type: SET_MIDI_INPUT,
        name
    }
}

export function dispatchSetMIDIOutput(name: string) {
    return {
        type: SET_MIDI_OUTPUT,
        name
    }
}
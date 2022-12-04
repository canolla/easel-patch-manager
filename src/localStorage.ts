export function setLastEditedProject(id: string) {
    localStorage["LAST_EDITED_PROJECT"] = id;
}

export function getLastEditedProject() {
    return localStorage["LAST_EDITED_PROJECT"];
}

export function setPreferredMidiInput(id: string) {
    localStorage["PREFERRED_MIDI_INPUT"] = id;
}

export function getPreferredMidiInput() {
    return localStorage["PREFERRED_MIDI_INPUT"];
}

export function setPreferredMidiOutput(id: string) {
    localStorage["PREFERRED_MIDI_OUTPUT"] = id;
}

export function getPreferredMidiOutput() {
    return localStorage["PREFERRED_MIDI_OUTPUT"];
}
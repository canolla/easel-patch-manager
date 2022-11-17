let midiAccess: WebMidi.MIDIAccess;
let midiAccessPromise: Promise<WebMidi.MIDIAccess>;

async function getAccessAsync() {
    if (midiAccess) return midiAccess;
    if (!midiAccessPromise) midiAccessPromise = navigator.requestMIDIAccess({ sysex: true });
    return midiAccessPromise;
}

export async function listMIDIDevicesAsync() {
    const access = await getAccessAsync();

    const out: [string, string][] = [];
    for (const entry of access.outputs) {
        out.push([entry[0], entry[1].name!]);
    }
    return out;
}

export async function sendMIDIMessage(output: string, bytes: Uint8Array) {
    const access = await getAccessAsync();
    const out = access.outputs.get(output);

    if (out) {
        out.send(bytes);
    }
}
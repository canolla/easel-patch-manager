let midiAccess: WebMidi.MIDIAccess;
let midiAccessPromise: Promise<WebMidi.MIDIAccess>;

async function getAccessAsync() {
    if (midiAccess) return midiAccess;
    if (!midiAccessPromise) midiAccessPromise = navigator.requestMIDIAccess({ sysex: true });
    return midiAccessPromise;
}

export async function listMIDIOutputsAsync() {
    const access = await getAccessAsync();

    const out: [string, string][] = [];
    for (const entry of access.outputs) {
        out.push([entry[0], entry[1].name!]);
    }
    return out;
}

export async function listMIDIInputsAsync() {
    const access = await getAccessAsync();

    const out: [string, string][] = [];
    for (const entry of access.inputs) {
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

export async function sendMIDIMessagesAsync(output: string, messages: Uint8Array[], onProgress?: (current: number, total: number) => void) {
    const access = await getAccessAsync();

    const out = access.outputs.get(output);
    if (!out) return;

    return new Promise<void>((resolve, reject) => {
        let currentIndex = 0;
        let intervalRef = setInterval(() => {
            if (currentIndex === messages.length) {
                clearInterval(intervalRef);

                try {
                    if (onProgress) onProgress(currentIndex, messages.length);
                }
                catch {
                    // ignore
                }

                resolve();
                return;
            }
            
            try {
                if (onProgress) onProgress(currentIndex, messages.length);
            }
            catch {
                // ignore
            }

            try {
                out.send(messages[currentIndex]);
            }
            catch (e) {
                clearInterval(intervalRef);
                reject(e);
                return;
            }

            currentIndex ++;
        }, 20)
    },)
}
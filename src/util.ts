import { Easel } from "./types";

export function encodePatch(patch: Easel) {
    let bytes = "";

    forEachValue(patch, (value, bytes) => {
        addBytes(value, bytes);
        return 0;
    });

    return encodeURIComponent(btoa(bytes));

    function addBytes(data: number, numBytes: number) {
        for (let i = 0; i < numBytes; i++) {
            bytes += String.fromCharCode((data >> (i * 8)) & 0xff);
        }
    }
}

export function decodePatch(encoded: string) {
    const bytes = atob(decodeURIComponent(encoded));

    let offset = 0;

    return forEachValue(emptyPatch(), (value, numBytes) => {
        let current = 0;

        for (let i = 0; i < numBytes; i++) {
            current |= (bytes.charCodeAt(offset) << (i * 8))
            offset++;
        }

        return current;
    });
}

export function emptyPatch(): Easel {
    return {
        sequencer: {
            triggerSelect: "bottom",
            stages: "bottom",
        
            voltage1: 0,
            voltage2: 0,
            voltage3: 0,
            voltage4: 0,
            voltage5: 0,
            pulse1: "top",
            pulse2: "top",
            pulse3: "top",
            pulse4: "top",
            pulse5: "top",
        },
        envelope: {
            attack: 0,
            sustain: 0,
            decay: 0,
            triggerSelect: "bottom",
            modeSelect: "bottom",
        },
        pulser: {
            triggerSelect: "bottom",
            modeSelect: "bottom",
            period: 0,
            periodCV: 0,
        },
        modOsc: {
            keyboard: "bottom",
            waveshape: "bottom",
            range: "bottom",
            modulationType: "bottom",
            frequency: 0,
            frequencyCV: 0,
            modulation: 0,
            modulationCV: 0,
        },
        complexOsc: {
            keyboard: "bottom",
            waveshape: "bottom",
            polarity: "bottom",
            pitch: 0,
            pitchCV: 0,
            timbre: 0,
            timbreCV: 0,
            timbreKnob: 0,
        },
        gates: {
            gate2Source: "bottom",
            gate1Mode: "bottom",
            gate2Mode: "bottom",
            level1: 0,
            level1CV: 0,
            level2: 0,
            level2CV: 0,
        },
        random: {
            triggerSource: "bottom",
        },
        connections: [],
    };
}

export function throttle(cb: () => void, interval: number) {
    let timeout: number | undefined;

    return () => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            cb();
            timeout = undefined;
        }, interval) as any;
    }
}

function forEachValue(patch: Easel, cb: (value: number, bytes: number) => number) {
    const result: any = {};
    for (const module of Object.keys(patch).sort()) {
        result[module] = {};
        for (const param of Object.keys((patch as any)[module]).sort()) {
            const current = (patch as any)[module][param];

            if (Array.isArray(current)) continue;
            
            if (typeof current === "string") {
                const possible = ["top", "bottom", "middle"];
                result[module][param] = possible[cb(possible.indexOf(current), 1)];
            }
            else {
                result[module][param] = cb(current, 2);
            }
        }
    }

    return result as Easel;
}

export function toSVGCoordinate(svg: SVGSVGElement, x: number, y: number) {
    const point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    return point.matrixTransform(svg.getScreenCTM()?.inverse());
}

export function distance(x0: number, y0: number, x1: number, y1: number) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}
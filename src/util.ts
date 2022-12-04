import { getMessageName } from "./midiMessages";
import { Connection, Easel } from "./types";

export class CancellationToken {
    isCancelled = false;

    cancel() {
        this.isCancelled = true;
    }
}

export function encodePatch(patch: Easel) {
    let bytes = "";

    forEachValue(patch, (value, bytes) => {
        addBytes(value, bytes);
        return 0;
    });

    for (const connection of patch.connections) {
        addBytes(connection.start.connectionPoint, 1);
        addBytes(connection.start.id, 1);
        addBytes(connection.end.connectionPoint, 1);
        addBytes(connection.end.id, 1);
        addBytes(connection.color, 1);
    }

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

    const out = forEachValue(emptyPatch(), (value, numBytes) => {
        let current = 0;

        for (let i = 0; i < numBytes; i++) {
            current |= (bytes.charCodeAt(offset) << (i * 8))
            offset++;
        }

        return current;
    });

    out.connections = [];

    const readByte = () => {
        const res = bytes.charCodeAt(offset);
        offset++;
        return res;
    }

    for (let i = offset; i < bytes.length; i += 5) {
        const connection: Connection = {
            start: {
                connectionPoint: readByte(),
                id: readByte()
            },
            end: {
                connectionPoint: readByte(),
                id: readByte()
            },
            color: readByte()
        }

        out.connections.push(connection);
    }

    return out;
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

export function rateLimit(cb: (...args: any) => void, interval: number) {
    let lastTime = Date.now();

    return (...args: any) => {
        if (Date.now() - lastTime < interval) return;

        lastTime = Date.now();
        cb(...args);
    }
}

export function forEachValue(patch: Easel, cb: (value: number, bytes: number, module: string, param: string, originalValue: any) => number) {
    const result: any = {};
    for (const module of Object.keys(patch).sort()) {
        result[module] = {};

        if (module === "connections") continue;

        for (const param of Object.keys((patch as any)[module]).sort()) {
            const current = (patch as any)[module][param];

            if (Array.isArray(current)) continue;
            
            if (typeof current === "string") {
                const possible = ["top", "bottom", "middle"];
                result[module][param] = possible[cb(possible.indexOf(current), 1, module, param, current)];
            }
            else {
                result[module][param] = cb(current, 2, module, param, current);
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

export function cleanPatchName(title: string) {
    return title.replace(/[^a-zA-Z0-9 ]/g, "");
}

export function formatLastEditedDate(date: number) {
    return describetime(Date.now() / 1000, date / 1000)
}

function describePlural(value: number, unit: string) {
    return value + " " + unit + (value == 1 ? "" : "s")
}
function describetime(now: number, then: number) {
    const seconds = now - then
    if (isNaN(seconds)) return ""
    if (seconds < 0)
        return "now"
    else if (seconds < 10)
        return "a few seconds ago"
    else if (seconds < 60)
        return " " + describePlural(Math.floor(seconds), "second") + " ago"
    else if (seconds < 2 * 60)
        return "a minute ago"
    else if (seconds < 60 * 60)
        return " " + describePlural(Math.floor(seconds / 60), "minute") + " ago"
    else if (seconds < 2 * 60 * 60)
        return "an hour ago";
    else if (seconds < 60 * 60 * 24)
        return " " + describePlural(Math.floor(seconds / 60 / 60), "hour") + " ago"
    else if (seconds < 60 * 60 * 24 * 30)
        return " " + describePlural(Math.floor(seconds / 60 / 60 / 24), "day") + " ago"
    else if (seconds < 60 * 60 * 24 * 365)
        return " " + describePlural(Math.floor(seconds / 60 / 60 / 24 / 30), "month") + " ago"
    else
        return " " + describePlural(Math.floor(seconds / 60 / 60 / 24 / 365), "year") + " ago"
}

export function createPreviewURI(svg: SVGSVGElement) {
    const clone = svg.cloneNode(true) as SVGSVGElement;

    const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    clone.appendChild(style);
    style.textContent = previewCSS;

    const content = clone.querySelector(".easel-content");

    clone.setAttribute("viewBox", "0 0 1588 778");
    content?.setAttribute("transform", "translate(6, 6)")

    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "2");
    bg.setAttribute("y", "2");
    bg.setAttribute("width", "1582");
    bg.setAttribute("height", "750");
    bg.setAttribute("fill", "var(--color-preview-bg)");

    clone.insertBefore(bg, clone.firstChild)

    const selectorsToRemove = [
        ".title-input",
        ".easel-text",
        ".icon-button",
        ".jack-arrow",
        ".wave-path",
        ".easel-fader-bg.filled",
        "foreignObject",
        ".knob-fg-outline",
        ".knob-bg",
        ".drag-point"
    ]

    for (const selector of selectorsToRemove) {
        const objs = clone.querySelectorAll(selector);
    
        for (let i = 0; i < objs.length; i++) {
            objs.item(i).remove();
        }
    }

    const text = new XMLSerializer().serializeToString(clone);
    return "data:image/svg+xml;base64," + btoa(text);
}

const previewCSS = `
* {
    --color-preview-fg: #1a2c7d;
    --color-preview-bg: #fff;

    --color-sequencer: var(--color-preview-fg);
    --color-envelope-generator: var(--color-preview-fg);
    --color-pulser: var(--color-preview-fg);
    --color-modulation-oscillator: var(--color-preview-fg);
    --color-complex-oscillator: var(--color-preview-fg);
    --color-dual-lo-pass-gate: var(--color-preview-fg);
    --color-random-voltage: var(--color-preview-fg);

    --color-keyboard-pulse: var(--color-preview-fg);
    --color-keyboard-pressure: var(--color-preview-fg);
    --color-keyboard-pitch: var(--color-preview-fg);
    --color-input: var(--color-preview-fg);

    --color-outline: var(--color-preview-fg);
    --color-background: var(--color-preview-bg);
    --color-switch-bg: var(--color-preview-bg);
    --color-inner-jack: var(--color-preview-bg);

    --color-cable-0: var(--color-preview-bg);
    --color-cable-1: var(--color-preview-bg);
    --color-cable-2: var(--color-preview-bg);
    --color-cable-3: var(--color-preview-bg);
    --color-cable-4: var(--color-preview-bg);
    --color-cable-5: var(--color-preview-bg);
    --color-cable-6: var(--color-preview-bg);
    --color-cable-7: var(--color-preview-bg);
    --color-cable-8: var(--color-preview-bg);

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
.easel-text {
    fill: var(--color-outline);
    font-size: 14px;
    user-select: none;
}
.section>rect {
    stroke-width: 8;
}
.cable-bg {
    stroke-width: 20;
}
.easel-jack>circle {
    stroke: none;
}
.easel-toggle>circle {
    fill: var(--color-preview-bg);
    stroke: none;
    transform: translate(0, 13px);
}
.easel-toggle>rect {
    transform: translate(0, 13px);
    stroke-width: 4;
}
.easel-toggle-bg {
    fill: var(--color-preview-fg);
}
.knob-fg {
    stroke: var(--color-preview-bg);
}
.knob-bg-outline {
    stroke-width: 26;
}
.easel-knob>path {
    transform: translate(0, 10px);
}
.easel-fader-bg {
    fill-opacity: 1;
    stroke-width: 4;
}
`
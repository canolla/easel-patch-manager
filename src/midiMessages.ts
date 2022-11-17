const definitions = [
    {
        "name": "cv_connect",
        "length": 35,
        "template": "f0 24 2f 63 76 5f 63 6f 6e 6e 65 63 74 00 2c 69 69 69 66 00 00 00 00 00 00 00 00 00 00 XX 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 13
            },
            {
                "offset": 33,
                "min": 0,
                "max": 8
            }
        ]
    },
    {
        "name": "fd_co_cvsPitch",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 63 6f 5f 63 76 73 50 69 74 63 68 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 14
            },
            {
                "offset": 29,
                "min": 0,
                "max": 123
            }
        ]
    },
    {
        "name": "fd_co_cvsTimbre",
        "length": 35,
        "template": "f0 20 2f 66 64 5f 63 6f 5f 63 76 73 54 69 6d 62 72 65 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 32,
                "min": 0,
                "max": 15
            },
            {
                "offset": 33,
                "min": 0,
                "max": 125
            }
        ]
    },
    {
        "name": "fd_co_pitch",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 63 6f 5f 70 69 74 63 68 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 125
            }
        ]
    },
    {
        "name": "fd_co_timbre",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 63 6f 5f 74 69 6d 62 72 65 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 119
            }
        ]
    },
    {
        "name": "fd_dlpg_cvsLevel1",
        "length": 35,
        "template": "f0 20 2f 66 64 5f 64 6c 70 67 5f 63 76 73 4c 65 76 65 6c 31 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 32,
                "min": 0,
                "max": 15
            },
            {
                "offset": 33,
                "min": 0,
                "max": 127
            }
        ]
    },
    {
        "name": "fd_dlpg_cvsLevel2",
        "length": 35,
        "template": "f0 20 2f 66 64 5f 64 6c 70 67 5f 63 76 73 4c 65 76 65 6c 32 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 32,
                "min": 0,
                "max": 15
            },
            {
                "offset": 33,
                "min": 0,
                "max": 127
            }
        ]
    },
    {
        "name": "fd_dlpg_level1",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 64 6c 70 67 5f 6c 65 76 65 6c 31 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 125
            }
        ]
    },
    {
        "name": "fd_dlpg_level2",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 64 6c 70 67 5f 6c 65 76 65 6c 32 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 123
            }
        ]
    },
    {
        "name": "fd_eg_a",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 65 67 5f 61 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 127
            }
        ]
    },
    {
        "name": "fd_eg_d",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 65 67 5f 64 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 120
            }
        ]
    },
    {
        "name": "fd_eg_s",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 65 67 5f 73 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 14
            },
            {
                "offset": 25,
                "min": 0,
                "max": 111
            }
        ]
    },
    {
        "name": "fd_mo_cvsFreq",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 6d 6f 5f 63 76 73 46 72 65 71 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 127
            }
        ]
    },
    {
        "name": "fd_mo_cvsMod",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 6d 6f 5f 63 76 73 4d 6f 64 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 109
            }
        ]
    },
    {
        "name": "fd_mo_freq",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 6d 6f 5f 66 72 65 71 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 127
            }
        ]
    },
    {
        "name": "fd_mo_mod",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 6d 6f 5f 6d 6f 64 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 113
            }
        ]
    },
    {
        "name": "fd_p_cvs",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 70 5f 63 76 73 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 125
            }
        ]
    },
    {
        "name": "fd_p_period",
        "length": 31,
        "template": "f0 1c 2f 66 64 5f 70 5f 70 65 72 69 6f 64 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 126
            }
        ]
    },
    {
        "name": "fd_svs_1",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 73 76 73 5f 32 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 126
            }
        ]
    },
    {
        "name": "fd_svs_2",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 73 76 73 5f 32 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 126
            }
        ]
    },
    {
        "name": "fd_svs_3",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 73 76 73 5f 32 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 126
            }
        ]
    },
    {
        "name": "fd_svs_4",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 73 76 73 5f 34 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 123
            }
        ]
    },
    {
        "name": "fd_svs_5",
        "length": 27,
        "template": "f0 18 2f 66 64 5f 73 76 73 5f 35 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 24,
                "min": 0,
                "max": 15
            },
            {
                "offset": 25,
                "min": 0,
                "max": 125
            }
        ]
    },
    {
        "name": "kn_co_timbre",
        "length": 31,
        "template": "f0 1c 2f 6b 6e 5f 63 6f 5f 74 69 6d 62 72 65 00 00 00 2c 69 69 00 00 00 00 00 00 00 XX XX f7",
        "arguments": [
            {
                "offset": 28,
                "min": 0,
                "max": 15
            },
            {
                "offset": 29,
                "min": 0,
                "max": 127
            }
        ]
    },
    {
        "name": "rt_keyDown",
        "length": 23,
        "template": "f0 14 2f 72 74 5f 6b 65 79 44 6f 77 6e 00 2c 69 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 21,
                "min": 0,
                "max": 28
            }
        ]
    },
    {
        "name": "rt_keyUp",
        "length": 23,
        "template": "f0 14 2f 72 74 5f 6b 65 79 55 70 00 00 00 2c 69 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 21,
                "min": 0,
                "max": 28
            }
        ]
    },
    {
        "name": "sw_co_keyboard",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 63 6f 5f 6b 65 79 62 6f 61 72 64 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_co_polarity",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 63 6f 5f 70 6f 6c 61 72 69 74 79 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_co_timbre",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 63 6f 5f 74 69 6d 62 72 65 00 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_eg_mode",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 65 67 5f 6d 6f 64 65 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_eg_trigger",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 65 67 5f 74 72 69 67 67 65 72 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_gate1Mode",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 67 61 74 65 31 4d 6f 64 65 00 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_gate2Mode",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 67 61 74 65 32 4d 6f 64 65 00 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_gate2Source",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 67 61 74 65 32 53 6f 75 72 63 65 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_mo_keyboard",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 6d 6f 5f 6b 65 79 62 6f 61 72 64 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_mo_mod",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 6d 6f 5f 6d 6f 64 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_mo_range",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 6d 6f 5f 72 61 6e 67 65 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_mo_waveshape",
        "length": 35,
        "template": "f0 20 2f 73 77 5f 6d 6f 5f 77 61 76 65 73 68 61 70 65 00 00 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 33,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_p_mode",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 70 5f 6d 6f 64 65 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_p_trigger",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 70 5f 74 72 69 67 67 65 72 00 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_svs_p1",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 73 76 73 5f 70 31 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_svs_p2",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 73 76 73 5f 70 32 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_svs_p3",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 73 76 73 5f 70 33 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_svs_p4",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 73 76 73 5f 70 34 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_svs_p5",
        "length": 27,
        "template": "f0 18 2f 73 77 5f 73 76 73 5f 70 35 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 25,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_svs_stages",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 73 76 73 5f 73 74 61 67 65 73 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "sw_svs_trigger",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 73 76 73 5f 74 72 69 67 67 65 72 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    }
]; 

const messageNames = {
    sequencer: {
        triggerSelect: "sw_svs_trigger",
        stages: "sw_svs_stages",
    
        voltage1: "fd_svs_1",
        voltage2: "fd_svs_2",
        voltage3: "fd_svs_3",
        voltage4: "fd_svs_4",
        voltage5: "fd_svs_5",
        pulse1: "sw_svs_p1",
        pulse2: "sw_svs_p2",
        pulse3: "sw_svs_p3",
        pulse4: "sw_svs_p4",
        pulse5: "sw_svs_p5",
    },
    envelope: {
        attack: "fd_eg_a",
        sustain: "fd_eg_d",
        decay: "fd_eg_s",
        triggerSelect: "sw_eg_trigger",
        modeSelect: "sw_eg_mode",
    },
    pulser: {
        triggerSelect: "sw_p_trigger",
        modeSelect: "sw_p_mode",
        period: "fd_p_period",
        periodCV: "fd_p_cvs",
    },
    modOsc: {
        keyboard: "sw_mo_keyboard",
        waveshape: "sw_mo_waveshape",
        range: "sw_mo_range",
        modulationType: "sw_mo_mod",
        frequency: "fd_mo_freq",
        frequencyCV: "fd_mo_cvsFreq",
        modulation: "fd_mo_mod",
        modulationCV: "fd_mo_cvsMod",
    },
    complexOsc: {
        keyboard: "sw_co_keyboard",
        waveshape: "sw_co_timbre",
        polarity: "sw_co_polarity",
        pitch: "fd_co_pitch",
        pitchCV: "fd_co_cvsPitch",
        timbre: "fd_co_timbre",
        timbreCV: "fd_co_cvsTimbre",
        timbreKnob: "kn_co_timbre",
    },
    gates: {
        gate2Source: "sw_gate2Source",
        gate1Mode: "sw_gate1Mode",
        gate2Mode: "sw_gate2Mode",
        level1: "fd_dlpg_level1",
        level1CV: "fd_dlpg_cvsLevel1",
        level2: "fd_dlpg_level2",
        level2CV: "fd_dlpg_cvsLevel2",
    },
    random: {
        triggerSource: "bottom",
    }
};

function getMessageByName(name: string) {
    return definitions.find(d => d.name === name);
}

function getMessageTemplate(module: string, key: string) {
    const name = (messageNames as any)[module][key];
    return getMessageByName(name);
}

function getMessageTemplateBytes(module: string, key: string) {
    const template = getMessageTemplate(module, key)!;

    const bytes = template.template.split(" ");
    const out = new Uint8Array(template.length);
    for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] == "XX") continue;
        out[i] = parseInt(bytes[i], 16);
    }
    return out;
}

export function createFaderMessage(module: string, key: string, value: number) {
    const out = getMessageTemplateBytes(module, key);

    value = Math.max(0, Math.min(0x7ff, value));

    out[out.length - 2] = value & 0x7f;
    out[out.length - 3] = (value >> 7) & 0xf;

    return out;
}

export function createSwitchMessage(module: string, key: string, value: "top" | "middle" | "bottom") {
    const out = getMessageTemplateBytes(module, key);

    let num: number;
    switch (value) {
        case "top": num = 2; break;
        case "middle": num = 1; break;
        case "bottom": num = 0; break;
    }

    out[out.length - 2] = num;
    return out;
}
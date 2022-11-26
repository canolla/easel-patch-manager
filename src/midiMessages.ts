import { ConnectionPoint } from "./components/jack";
import { Easel, ParamKind } from "./types";
import { forEachValue } from "./util";

const definitions = [
    {
        "name": "cv_connect",
        "length": 35,
        "template": "F0 24 2F 63 76 5F 63 6F 6E 6E 65 63 74 00 2C 69 69 69 66 00 00 00 00 00 00 00 00 00 00 XX 00 00 00 XX 3F F7 80 00 00",
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
        // This one is just cv_connect with a different suffix
        "name": "cv_disconnect",
        "length": 35,
        "template": "f0 24 2f 63 76 5f 63 6f 6e 6e 65 63 74 00 2c 69 69 69 66 00 00 00 00 00 00 00 00 00 00 XX 00 00 00 XX 00 00 00 00 f7",
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
    },
    {
        "name": "sw_rv_trigger",
        "length": 31,
        "template": "f0 1c 2f 73 77 5f 72 76 5f 74 72 69 67 67 65 72 00 00 2c 69 69 00 00 00 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 29,
                "min": 0,
                "max": 2
            }
        ]
    },
    {
        "name": "ps_clearBuffer",
        "length": 23,
        "template": "f0 14 2f 70 73 5f 63 6c 65 61 72 42 75 66 66 65 72 00 2c 00 00 00 f7",
        "arguments": []
    },
    {
        "name": "ps_save",
        "length": 23,
        "template": "f0 14 2f 70 73 5f 73 61 76 65 00 00 00 00 2c 69 00 00 00 00 00 XX f7",
        "arguments": [
            {
                "offset": 21,
                "min": 0,
                "max": 1
            }
        ]
    },
    {
        "name": "ps_setName",
        "length": 35,
        "template": "f0 20 2f 70 73 5f 73 65 74 4e 61 6d 65 00 2c 69 73 00 00 00 00 01 49",
        "arguments": []
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
        triggerSource: "sw_rv_trigger",
    }
};

const connectionIds: { [index: string]: number } = {
    "SequentialVoltageOutput": 0,
    "EnvelopeGeneratorOutput": 1,
    "PulserOutput": 2,
    "PulseOutput": 3,
    "PressureOutput": 4,
    "PitchOutput": 5,
    "RandomOutput": 6,
    "EnvelopeDetectorOutput": 10,
    "ModulationCVOutput": 11,
    "Panel1Output": 12,
    "Panel2Output": 13,
    "PulserPeriodInput": 0,
    "ModulationOscFrequencyInput": 1,
    "ModulationOscModulationInput": 2,
    "ComplexOscPitchInput": 3,
    "ComplexOscTimbreInput": 4,
    "ComplexOscWaveshapeInput": 5,
    "LoPassGate1Input": 6,
    "LoPassGate2Input": 7,
    "PanelInput": 8,
    "EnvelopeAttackInput": 9,
    "EnvelopeSustainInput": 10,
    "EnvelopeDecayInput": 11,
};

export function getMessageName(module: string, param: string) {
    return (messageNames as any)[module][param];
}

function getMessageByName(name: string) {
    return definitions.find(d => d.name === name);
}

function getMessageTemplate(module: string, key: string) {
    const name = getMessageName(module, key);
    return getMessageByName(name);
}

function getMessageTemplateBytes(module: string, key: string) {
    const template = getMessageTemplate(module, key)!;
    return getMessageBytes(template.template);
}

function getMessageBytes(template: string) {
    const bytes = template.split(" ");
    const out = new Uint8Array(bytes.length);
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

export function createConnectCVMessage(from: number, to: number) {
    const msg = getMessageByName("cv_connect");
    const out = getMessageBytes(msg!.template);

    let outputName = ConnectionPoint[from];

    if (outputName.indexOf("Input") !== -1) {
        let swap = from;
        from = to;
        to = swap;
    }

    // output
    out[29] = connectionIds[ConnectionPoint[from]]
    // input
    out[33] = connectionIds[ConnectionPoint[to]]

    return out;
}

export function createDisconnectCVMessage(from: number, to: number) {
    const msg = getMessageByName("cv_disconnect");
    const out = getMessageBytes(msg!.template);

    let outputName = ConnectionPoint[from];

    if (outputName.indexOf("Input") !== -1) {
        let swap = from;
        from = to;
        to = swap;
    }

    // output
    out[29] = connectionIds[ConnectionPoint[from]]
    // input
    out[33] = connectionIds[ConnectionPoint[to]]

    return out;
}

export function createClearBufferMessage() {
    const msg = getMessageByName("ps_clearBuffer");
    const out = getMessageBytes(msg!.template);

    return out;
}

export function createSaveMessage(saveIndex: number) {
    const msg = getMessageByName("ps_save");
    const out = getMessageBytes(msg!.template);

    out[out.length - 2] = saveIndex;

    return out;
}

export function createSetNameMessage(name: string) {
    const msg = getMessageByName("ps_setName");
    const prefix = getMessageBytes(msg!.template);

    const out = new Uint8Array(prefix.length + name.length + 1);
    out.set(prefix, 0);
    for (let i = 0; i < name.length; i++) {
        out[prefix.length + i] = name.charCodeAt(i);
    }

    out[out.length - 1] = 0xf7;
    
    return out;
}

export function createPatchMessages(easel: Easel, clearBuffer: boolean, name?: string, saveIndex?: number) {
    const queue: Uint8Array[] = [];

    if (clearBuffer) {
        queue.push(createClearBufferMessage());
    }

    forEachValue(easel, (value, bytes, module, param, rawValue) => {
        const messageName = getMessageName(module, param);

        if (messageName.startsWith("fd") || messageName.startsWith("kn")) {
            queue.push(createFaderMessage(module, param, rawValue));
        }
        else {
            queue.push(createSwitchMessage(module, param, rawValue));
        }
        return 0;
    });

    for (const connection of easel.connections) {
        queue.push(createConnectCVMessage(connection.start.connectionPoint, connection.end.connectionPoint));
    }

    if (name) {
        queue.push(createSetNameMessage(name));
    }

    if (saveIndex !== undefined) {
        queue.push(createSaveMessage(saveIndex))
    }

    return queue;
}

const readableNames = {
    "sw_svs_trigger": "Sequencer Trigger Mode",
    "sw_svs_stages": "Sequencer Stages",
    "fd_svs_1": "Sequencer Stage 1",
    "fd_svs_2": "Sequencer Stage 2",
    "fd_svs_3": "Sequencer Stage 3",
    "fd_svs_4": "Sequencer Stage 4",
    "fd_svs_5": "Sequencer Stage 5",
    "sw_svs_p1": "Sequqncer Pulse 1",
    "sw_svs_p2": "Sequqncer Pulse 2",
    "sw_svs_p3": "Sequencer Pulse 3",
    "sw_svs_p4": "Sequencer Pulse 4",
    "sw_svs_p5": "Sequencer Pulse 5",
    "fd_eg_a": "Envelope Generator Attack",
    "fd_eg_d": "Envelope Generator Decay",
    "fd_eg_s": "Envelope Generator Sustain",
    "sw_eg_trigger": "Envelope Trigger Mode",
    "sw_eg_mode": "Envelope Generator Mode",
    "sw_p_trigger": "Pulser Trigger Mode",
    "sw_p_mode": "Pulser Mode",
    "fd_p_period": "Pulser Period",
    "fd_p_cvs": "Pulser Period CV",
    "sw_mo_keyboard": "Mod Osc Key Tracking",
    "sw_mo_waveshape": "Mod Osc Waveshape",
    "sw_mo_range": "Mod Osc Range",
    "sw_mo_mod": "Mod Osc Modulation Type",
    "fd_mo_freq": "Mod Osc Frequency",
    "fd_mo_cvsFreq": "Mod Osc Frequency CV",
    "fd_mo_mod": "Mod Osc Modulation",
    "fd_mo_cvsMod": "Mod Osc Moduplation CV",
    "sw_co_keyboard": "Comp Osc Key Tracking",
    "sw_co_timbre": "Comp Osc Waveshape Switch",
    "sw_co_polarity": "Comp Osc Polarity",
    "fd_co_pitch": "Comp Osc Pitch",
    "fd_co_cvsPitch": "Comp Osc Pitch CV",
    "fd_co_timbre": "Comp Osc Timbre",
    "fd_co_cvsTimbre": "Comp Osc Timbre CV",
    "kn_co_timbre": "Comp Osc Waveshape",
    "sw_gate2Source": "Gate 2 Source",
    "sw_gate1Mode": "Gate 1 Mode",
    "sw_gate2Mode": "Gate 2 Mode",
    "fd_dlpg_level1": "Gate 1 Level",
    "fd_dlpg_cvsLevel1": "Gate 1 Level CV",
    "fd_dlpg_level2": "Gate 2 Level",
    "fd_dlpg_cvsLevel2": "Gate 2 Level CV",
    "sw_rv_trigger": "Random Voltage Trigger Mode",
}

const paramKinds: {[index: string]: ParamKind} = {
    "sw_svs_trigger": "three-way",
    "sw_svs_stages": "three-way",
    "fd_svs_1": "fader",
    "fd_svs_2": "fader",
    "fd_svs_3": "fader",
    "fd_svs_4": "fader",
    "fd_svs_5": "fader",
    "sw_svs_p1": "two-way",
    "sw_svs_p2": "two-way",
    "sw_svs_p3": "two-way",
    "sw_svs_p4": "two-way",
    "sw_svs_p5": "two-way",
    "fd_eg_a": "fader",
    "fd_eg_d": "fader",
    "fd_eg_s": "fader",
    "sw_eg_trigger": "three-way",
    "sw_eg_mode": "three-way",
    "sw_p_trigger": "three-way",
    "sw_p_mode": "three-way",
    "fd_p_period": "fader",
    "fd_p_cvs": "fader",
    "sw_mo_keyboard": "two-way",
    "sw_mo_waveshape": "three-way",
    "sw_mo_range": "two-way",
    "sw_mo_mod": "three-way",
    "fd_mo_freq": "fader",
    "fd_mo_cvsFreq": "fader",
    "fd_mo_mod": "fader",
    "fd_mo_cvsMod": "fader",
    "sw_co_keyboard": "two-way",
    "sw_co_timbre": "three-way",
    "sw_co_polarity": "two-way",
    "fd_co_pitch": "fader",
    "fd_co_cvsPitch": "fader",
    "fd_co_timbre": "fader",
    "fd_co_cvsTimbre": "fader",
    "kn_co_timbre": "fader",
    "sw_gate2Source": "three-way",
    "sw_gate1Mode": "three-way",
    "sw_gate2Mode": "three-way",
    "fd_dlpg_level1": "fader",
    "fd_dlpg_cvsLevel1": "fader",
    "fd_dlpg_level2": "fader",
    "fd_dlpg_cvsLevel2": "fader",
    "sw_rv_trigger": "three-way",
}
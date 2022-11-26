import * as React from "react";
import { FaderView } from "../fader";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface ModulationOscillatorProps {

}

export const ModulationOscillator = (props: ModulationOscillatorProps) => {
    return <Section left={665} top={120} width={305} height={500}>
        <Section left={0} top={0} width={305} height={30} label="MODULATION OSCILLATOR" />
        <Section left={0} top={30} width={175} height={85} label="keyboard">
            <ToggleSwitch
                color="var(--color-modulation-oscillator)"
                top={5}
                left={32}

                topOption="on"
                bottomOption="off"

                value={"top"}
                twoWay={true}
                module={"modOsc"} param={"keyboard"}
            />
        </Section>
        <Section left={175} top={30} width={130} height={85} label="waveshape">
            <ToggleSwitch
                color="var(--color-modulation-oscillator)"
                top={5}
                left={20}

                value={"top"}
                module={"modOsc"} param={"waveshape"}
            />
            <path className="wave-path" stroke="var(--color-outline)" strokeWidth="1" fill="none" d="m 55 10 m 0 10 l 20 -10 l 0 10 l 20 -10 l 0 10 l 20 -10 l 0 10" />
            <path className="wave-path" stroke="var(--color-outline)" strokeWidth="1" fill="none" d="m 55 25 m 0 10 l 0 -10 l 10 0 l 0 10 l 10 0 l 0 -10 l 10 0 l 0 10 l 10 0 l 0 -10 l 10 0 l 0 10 l 10 0 l 0 -10" />
            <path className="wave-path" stroke="var(--color-outline)" strokeWidth="1" fill="none" d="m 55 40 m 0 10 l 10 -10 l 10 10 l 10 -10 l 10 10 l 10 -10 l 10 10" />
        </Section>
        <Section left={0} top={115} width={175} height={85} label="range">
            <ToggleSwitch
                color="var(--color-modulation-oscillator)"
                top={5}
                left={32}

                topOption="high"
                bottomOption="low"

                value={"top"}
                twoWay={true}
                module={"modOsc"} param={"range"}
            />
        </Section>
        <Section left={175} top={115} width={130} height={85} label="modulation">
            <ToggleSwitch
                color="var(--color-modulation-oscillator)"
                top={5}
                left={20}

                topOption="bal. ext"
                middleOption="a.m. osc."
                bottomOption="f.m. osc."

                value={"top"}
                module={"modOsc"} param={"modulationType"}
            />
        </Section>
        <Section left={0} top={200} width={305} height={300}>
            <FaderView left={30} top={20} value={0} color="var(--color-modulation-oscillator)" module={"modOsc"} fader={"frequencyCV"}/>
            <FaderView left={105} top={20} value={0} color="var(--color-modulation-oscillator)" label="frequency" module={"modOsc"} fader={"frequency"}/>
            <FaderView left={180} top={20} value={0} color="var(--color-modulation-oscillator)" module={"modOsc"} fader={"modulationCV"}/>
            <FaderView left={255} top={20} value={0} color="var(--color-modulation-oscillator)" label="modulation" module={"modOsc"} fader={"modulation"}/>
        </Section>
    </Section>
}
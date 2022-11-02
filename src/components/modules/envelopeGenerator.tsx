import * as React from "react";
import { FaderView } from "../fader";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface EnvelopeGeneratorProps {

}

export const EnvelopeGenerator = (props: EnvelopeGeneratorProps) => {
    return <Section left={315} top={120} width={200} height={500}>
        <Section left={0} top={0} width={200} height={30} label="ENVELOPE GENERATOR" />
        <Section left={0} top={30} width={200} height={85} label="trigger select">
            <ToggleSwitch
                color="var(--color-envelope-generator)"
                top={5}
                left={35}

                topOption="keyboard"
                middleOption="pulser"
                bottomOption="sequencer"

                module={"envelope"} param={"triggerSelect"}
            />
        </Section>
        <Section left={0} top={115} width={200} height={85} label="mode select">
            <ToggleSwitch
                color="var(--color-envelope-generator)"
                top={5}
                left={35}

                topOption="sustained"
                middleOption="transient"
                bottomOption="self"

                module={"envelope"} param={"modeSelect"}
            />
        </Section>
        <Section left={0} top={200} width={200} height={300}>
            <FaderView left={25} top={20} value={0} color="var(--color-envelope-generator)" label="attack" module={"envelope"} fader={"attack"}/>
            <FaderView left={90} top={20} value={0} color="var(--color-envelope-generator)" label="sustain" module={"envelope"} fader={"sustain"}/>
            <FaderView left={155} top={20} value={0} color="var(--color-envelope-generator)" label="decay" module={"envelope"} fader={"decay"}/>
        </Section>
    </Section>
}
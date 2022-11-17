import * as React from "react";
import { Jack, ConnectionPoint } from "../jack";
import { Section } from "../section";

export interface TopBarProps {

}

export const TopBar = (props: TopBarProps) => {
    return <Section left={0} top={0} width={1575} height={120}>
        <Section left={0} top={0} width={970} height={120}>
            <Section left={0} top={0} width={970} height={30} label="EASEL PROGRAM MANAGER" />
            <Jack
                x={915}
                y={65}
                color="var(--color-modulation-oscillator)"
                connectionPoint={ConnectionPoint.ModulationCVOutput}
                text="mod cv out" />
        </Section>
        <Section left={970} top={0} width={305} height={120}>-
            <Section left={0} top={0} width={305} height={30} label="EXTERNAL CV" />
            <Jack
                x={55}
                y={65}
                color="var(--color-input)"
                connectionPoint={ConnectionPoint.PanelInput}
                text="to panel" />
            <Jack
                x={152.5}
                y={65}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.Panel1Output}
                id={0}
                text="from panel 1" />
            <Jack
                x={250}
                y={65}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.Panel2Output}
                text="from panel 2" />
        </Section>
        <Section left={1275} top={0} width={300} height={120}>
            <Section left={0} top={0} width={300} height={30} label="PRE AMP / ENVELOPE DETECTOR" />
            <Section left={10} top={40} width={180} height={70} fill="url(#stripes)" />
            <Jack
                x={250}
                y={65}
                color="var(--color-sequencer)"
                connectionPoint={ConnectionPoint.EnvelopeDetectorOutput}
                text="env det out" />
        </Section>
    </Section>
}
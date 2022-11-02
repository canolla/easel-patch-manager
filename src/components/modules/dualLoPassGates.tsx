import * as React from "react";
import { FaderView } from "../fader";
import { LabelText } from "../labelText";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface DualLoPassGatesProps {

}

export const DualLoPassGates = (props: DualLoPassGatesProps) => {
    return <Section left={1275} top={120} width={300} height={500}>
        <Section left={0} top={0} width={300} height={30} label="DUAL LO PASS GATE" />
        <Section left={0} top={30} width={300} height={85} label="gate 2 source">

        <ToggleSwitch
                color="var(--color-dual-lo-pass-gate)"
                top={5}
                left={85}

                topOption="aux in"
                middleOption="mod oscillator"
                bottomOption="gate 1"

                module={"gates"} param={"gate2Source"}
            />
        </Section>
        <Section left={0} top={115} width={300} height={85} label="mode select">
            <ToggleSwitch
                color="var(--color-dual-lo-pass-gate)"
                top={5}
                left={35}
                label="gate 1"

                module={"gates"} param={"gate1Mode"}
            />

            <ToggleSwitch
                color="var(--color-dual-lo-pass-gate)"
                top={5}
                left={245}
                label="gate 2"

                module={"gates"} param={"gate2Mode"}
            />

            <LabelText
                x={150}
                y={15}
                text={"lopass filter"}
                anchor="middle"
                alignment="middle"
                />

            <LabelText
                x={150}
                y={30}
                text={"combination"}
                anchor="middle"
                alignment="middle"
                />

            <LabelText
                x={150}
                y={45}
                text={"voltage controlled amp"}
                anchor="middle"
                alignment="middle"
                />
        </Section>
        <Section left={0} top={200} width={300} height={300}>
            <FaderView left={30} top={20} value={0} color="var(--color-dual-lo-pass-gate)" module={"gates"} fader={"level1CV"}/>
            <FaderView left={105} top={20} value={0} color="var(--color-dual-lo-pass-gate)" label="gate 1" module={"gates"} fader={"level1"}/>
            <FaderView left={180} top={20} value={0} color="var(--color-dual-lo-pass-gate)" module={"gates"} fader={"level2CV"}/>
            <FaderView left={255} top={20} value={0} color="var(--color-dual-lo-pass-gate)" label="gate 2" module={"gates"} fader={"level2"}/>
        </Section>
    </Section>
}
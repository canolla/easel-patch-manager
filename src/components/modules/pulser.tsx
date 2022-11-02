import * as React from "react";
import { FaderView } from "../fader";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface PulserProps {

}

export const Pulser = (props: PulserProps) => {
    return <Section left={515} top={120} width={150} height={500}>
        <Section left={0} top={0} width={150} height={30} label="PULSER" />
        <Section left={0} top={30} width={150} height={85} label="trigger select">
            <ToggleSwitch
                color="var(--color-pulser)"
                top={5}
                left={32}

                topOption="keyboard"
                middleOption="self"
                bottomOption="sequencer"

                value={"top"}
                module={"pulser"} param={"triggerSelect"}
            />
        </Section>
        <Section left={0} top={115} width={150} height={85} label="mode">
            <ToggleSwitch
                color="var(--color-pulser)"
                top={5}
                left={32}

                topOption="triggered"
                middleOption="off"
                bottomOption="once"

                value={"top"}
                module={"pulser"} param={"modeSelect"}
            />
        </Section>
        <Section left={0} top={200} width={150} height={300}>
            <FaderView left={30} top={20} value={0} color="var(--color-pulser)" module={"pulser"} fader={"periodCV"}/>
            <FaderView left={105} top={20} value={0} color="var(--color-pulser)" label="period" module={"pulser"} fader={"period"}/>
        </Section>
    </Section>
}
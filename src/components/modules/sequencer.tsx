import * as React from "react";
import { FaderView } from "../fader";
import { LabelText } from "../labelText";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface SequencerProps {

}

export const Sequencer = (props: SequencerProps) => {
    return <Section left={0} top={120} width={315} height={500}>
        <Section left={0} top={0} width={315} height={30} label="SEQUENTIAL VOLTAGE SOURCE" />
        <Section left={0} top={30} width={175} height={85} label="trigger select">
            <ToggleSwitch
                color="var(--color-sequencer)"
                top={5}
                left={35}

                topOption="keyboard"
                middleOption="pulser"
                bottomOption="off"

                value={"top"}
                module={"sequencer"} param={"triggerSelect"}
            />
        </Section>
        <Section left={175} top={30} width={140} height={85} label="stages">
            <ToggleSwitch
                color="var(--color-sequencer)"
                top={5}
                left={40}

                topOption="3"
                middleOption="4"
                bottomOption="5"

                value={"top"}
                module={"sequencer"} param={"stages"}
            />
        </Section>
        <Section left={0} top={115} width={315} height={85} label="pulse sequence">
            <LabelText x={25} y={20} text="1" />
            <LabelText x={80} y={20} text="2" />
            <LabelText x={135} y={20} text="3" />
            <LabelText x={190} y={20} text="4" />
            <LabelText x={245} y={20} text="5" />
            <ToggleSwitch
                color="var(--color-sequencer)"
                top={5}
                left={42}

                value={"top"}
                twoWay={true}
                module={"sequencer"} param={"pulse1"}
            />
            <ToggleSwitch
                color="var(--color-sequencer)"
                top={5}
                left={97}

                value={"top"}
                twoWay={true}
                module={"sequencer"} param={"pulse2"}
            />
            <ToggleSwitch
                color="var(--color-sequencer)"
                top={5}
                left={152}

                value={"top"}
                twoWay={true}
                module={"sequencer"} param={"pulse3"}
            />
            <ToggleSwitch
                color="var(--color-sequencer)"
                top={5}
                left={207}

                value={"top"}
                twoWay={true}
                module={"sequencer"} param={"pulse4"}
            />
            <ToggleSwitch
                color="var(--color-sequencer)"
                top={5}
                left={262}

                value={"top"}
                twoWay={true}
                module={"sequencer"} param={"pulse5"}
            />
        </Section>
        <Section left={0} top={200} width={315} height={300} label="sequencer voltage levels">
            <FaderView left={52} top={20} value={800} color="var(--color-sequencer)" module={"sequencer"} fader={"voltage1"}/>
            <FaderView left={107} top={20} value={1500} color="var(--color-sequencer)" module={"sequencer"} fader={"voltage2"}/>
            <FaderView left={162} top={20} value={2500} color="var(--color-sequencer)" module={"sequencer"} fader={"voltage3"}/>
            <FaderView left={217} top={20} value={0} color="var(--color-sequencer)" module={"sequencer"} fader={"voltage4"}/>
            <FaderView left={272} top={20} value={0} color="var(--color-sequencer)" module={"sequencer"} fader={"voltage5"}/>
        </Section>
    </Section>
}
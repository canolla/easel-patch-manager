import * as React from "react";
import { Jack, ConnectionPoint } from "../jack";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface PatchbayProps {

}

export const Patchbay = (props: PatchbayProps) => {
    return <Section left={0} top={620} width={1575} height={120}>
        <Section left={0} top={0} width={180} height={120}>
            <Section left={0} top={0} width={180} height={30} label="KEYBOARD OUTPUT" />
            <Jack
                x={30}
                y={65}
                color="var(--color-keyboard-pulse)"
                connectionPoint={ConnectionPoint.PulseOutput}
                text="pulse" />
            <Jack
                x={90}
                y={65}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={0}
                text="pressure" />
            <Jack
                x={150}
                y={65}
                color="var(--color-keyboard-pitch)"
                connectionPoint={ConnectionPoint.PitchOutput}
                text="pitch" />
        </Section>
        <Section left={180} top={0} width={135} height={120}>
            <Section left={0} top={0} width={135} height={30} label="RANDOM VOLTAGE" />

            <Section left={0} top={30} width={135} height={90} label="trigger source">
                <ToggleSwitch
                    color="var(--color-random-voltage)"
                    top={5}
                    left={23}

                    topOption="keyboard"
                    middleOption="pulser"
                    bottomOption="sequencer"

                    value={"top"}
                    module={"random"} param={"triggerSource"}
                />
            </Section>
        </Section>
        <Section left={315} top={0} width={1260} height={120}>
            <Jack
                x={32}
                y={30}
                color="var(--color-input)"
                connectionPoint={ConnectionPoint.EnvelopeAttackInput}
                arrow="short"
                id={0} />
            <Jack
                x={32}
                y={90}
                color="var(--color-sequencer)"
                connectionPoint={ConnectionPoint.SequentialVoltageOutput}
                id={0} />
            <Jack
                x={97}
                y={60}
                color="var(--color-input)"
                arrow="medium"
                connectionPoint={ConnectionPoint.EnvelopeSustainInput}
                id={0} />
            <Jack
                x={163}
                y={30}
                color="var(--color-input)"
                arrow="short"
                connectionPoint={ConnectionPoint.EnvelopeDecayInput}
                id={0} />
            <Jack
                x={163}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={0} />
            <Jack
                x={239}
                y={60}
                color="var(--color-input)"
                arrow="long"
                connectionPoint={ConnectionPoint.PulserPeriodInput}
                id={0} />

            <Jack
                x={313}
                y={30}
                color="var(--color-envelope-generator)"
                connectionPoint={ConnectionPoint.EnvelopeGeneratorOutput}
                id={0} />
            <Jack
                x={313}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={1} />
            <Jack
                x={388}
                y={60}
                color="var(--color-input)"
                arrow="long"
                connectionPoint={ConnectionPoint.ModulationOscFrequencyInput} />


            <Jack
                x={463}
                y={30}
                color="var(--color-pulser)"
                connectionPoint={ConnectionPoint.PulserOutput}
                id={1} />
            <Jack
                x={463}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={1} />
            <Jack
                x={538}
                y={60}
                color="var(--color-input)"
                arrow="long"
                connectionPoint={ConnectionPoint.ModulationOscModulationInput} />


            <Jack
                x={613}
                y={30}
                color="var(--color-sequencer)"
                connectionPoint={ConnectionPoint.SequentialVoltageOutput}
                id={1} />
            <Jack
                x={613}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={2} />
            <Jack
                x={693}
                y={60}
                color="var(--color-input)"
                arrow="long"
                connectionPoint={ConnectionPoint.ComplexOscPitchInput} />


            <Jack
                x={768}
                y={30}
                color="var(--color-envelope-generator)"
                connectionPoint={ConnectionPoint.EnvelopeGeneratorOutput}
                id={1} />
            <Jack
                x={768}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={2} />
            <Jack
                x={843}
                y={60}
                color="var(--color-input)"
                arrow="long"
                connectionPoint={ConnectionPoint.ComplexOscTimbreInput} />

            <Jack
                x={918}
                y={30}
                color="var(--color-pulser)"
                connectionPoint={ConnectionPoint.PulserOutput}
                id={2} />
            <Jack
                x={918}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={3} />
            <Jack
                x={998}
                y={60}
                color="var(--color-input)"
                arrow="long"
                connectionPoint={ConnectionPoint.LoPassGate1Input} />
            
            <Jack
                x={1073}
                y={30}
                color="var(--color-envelope-generator)"
                connectionPoint={ConnectionPoint.EnvelopeGeneratorOutput}
                id={2} />
            <Jack
                x={1073}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={3} />
            <Jack
                x={1148}
                y={60}
                color="var(--color-input)"
                arrow="long"
                connectionPoint={ConnectionPoint.LoPassGate2Input} />
        
            <Jack
                x={1223}
                y={30}
                color="var(--color-pulser)"
                connectionPoint={ConnectionPoint.PulserOutput}
                id={3} />
            <Jack
                x={1223}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={4} />
            
        </Section>
    </Section>
}
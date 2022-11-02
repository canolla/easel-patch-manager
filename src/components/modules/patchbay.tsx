import * as React from "react";
import { Jack, ConnectionPoint } from "../jack";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface PatchbayProps {

}

export const Patchbay = (props: PatchbayProps) => {
    return <Section left={0} top={620} width={1575} height={120}>
        <Section left={0} top={0} width={250} height={120}>
            <Section left={0} top={0} width={250} height={30} label="KEYBOARD OUTPUT" />
            <Jack
                x={35}
                y={65}
                color="var(--color-keyboard-pulse)"
                connectionPoint={ConnectionPoint.PulseOutput}
                text="pulse" />
            <Jack
                x={125}
                y={65}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={0}
                text="pressure" />
            <Jack
                x={215}
                y={65}
                color="var(--color-keyboard-pitch)"
                connectionPoint={ConnectionPoint.PitchOutput}
                text="pitch" />
        </Section>
        <Section left={250} top={0} width={160} height={120}>
            <Section left={0} top={0} width={160} height={30} label="RANDOM VOLTAGE" />

            <Section left={0} top={30} width={160} height={90} label="trigger source">
                <ToggleSwitch
                    color="var(--color-random-voltage)"
                    top={5}
                    left={32}

                    topOption="keyboard"
                    middleOption="pulser"
                    bottomOption="sequencer"

                    value={"top"}
                    module={"random"} param={"triggerSource"}
                />
            </Section>
        </Section>
        <Section left={410} top={0} width={1165} height={120}>
            <Jack
                x={70}
                y={30}
                color="var(--color-sequencer)"
                connectionPoint={ConnectionPoint.SequentialVoltageOutput}
                id={0} />
            <Jack
                x={70}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={0} />
            <Jack
                x={143}
                y={60}
                color="var(--color-input)"
                arrow={true}
                connectionPoint={ConnectionPoint.PulserPeriodInput}
                id={0} />

            <Jack
                x={218}
                y={30}
                color="var(--color-envelope-generator)"
                connectionPoint={ConnectionPoint.EnvelopeGeneratorOutput}
                id={0} />
            <Jack
                x={218}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={1} />
            <Jack
                x={293}
                y={60}
                color="var(--color-input)"
                arrow={true}
                connectionPoint={ConnectionPoint.ModulationOscFrequencyInput} />


            <Jack
                x={368}
                y={30}
                color="var(--color-pulser)"
                connectionPoint={ConnectionPoint.PulserOutput}
                id={1} />
            <Jack
                x={368}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={1} />
            <Jack
                x={443}
                y={60}
                color="var(--color-input)"
                arrow={true}
                connectionPoint={ConnectionPoint.ModulationOscModulationInput} />


            <Jack
                x={518}
                y={30}
                color="var(--color-sequencer)"
                connectionPoint={ConnectionPoint.SequentialVoltageOutput}
                id={1} />
            <Jack
                x={518}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={2} />
            <Jack
                x={598}
                y={60}
                color="var(--color-input)"
                arrow={true}
                connectionPoint={ConnectionPoint.ComplexOscPitchInput} />


            <Jack
                x={673}
                y={30}
                color="var(--color-envelope-generator)"
                connectionPoint={ConnectionPoint.EnvelopeGeneratorOutput}
                id={1} />
            <Jack
                x={673}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={2} />
            <Jack
                x={748}
                y={60}
                color="var(--color-input)"
                arrow={true}
                connectionPoint={ConnectionPoint.ComplexOscTimbreInput} />

            <Jack
                x={823}
                y={30}
                color="var(--color-pulser)"
                connectionPoint={ConnectionPoint.PulserOutput}
                id={2} />
            <Jack
                x={823}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={3} />
            <Jack
                x={903}
                y={60}
                color="var(--color-input)"
                arrow={true}
                connectionPoint={ConnectionPoint.LoPassGate1Input} />
            
            <Jack
                x={978}
                y={30}
                color="var(--color-envelope-generator)"
                connectionPoint={ConnectionPoint.EnvelopeGeneratorOutput}
                id={2} />
            <Jack
                x={978}
                y={90}
                color="var(--color-random-voltage)"
                connectionPoint={ConnectionPoint.RandomOutput}
                id={3} />
            <Jack
                x={1053}
                y={60}
                color="var(--color-input)"
                arrow={true}
                connectionPoint={ConnectionPoint.LoPassGate2Input} />
        
            <Jack
                x={1128}
                y={30}
                color="var(--color-pulser)"
                connectionPoint={ConnectionPoint.PulserOutput}
                id={3} />
            <Jack
                x={1128}
                y={90}
                color="var(--color-keyboard-pressure)"
                connectionPoint={ConnectionPoint.PressureOutput}
                id={4} />
            
        </Section>
    </Section>
}
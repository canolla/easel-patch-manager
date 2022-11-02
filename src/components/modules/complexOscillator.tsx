import * as React from "react";
import { connect } from "react-redux";
import { dispatchUpdateFader, dispatchUpdateSwitch } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { ComplexOscillator } from "../../types";
import { FaderView } from "../fader";
import { Knob } from "../knob";
import { Section } from "../section";
import { ToggleSwitch } from "../toggleSwitch";

export interface ComplexOscillatorViewProps extends ComplexOscillator {
}

export const ComplexOscillatorViewImpl = (props: ComplexOscillatorViewProps) => {
    const {
        pitch,
        pitchCV,
        polarity,
        keyboard,
        timbre,
        timbreCV,
        timbreKnob,
        waveshape
    } = props;
    return <Section left={970} top={120} width={305} height={500}>
        <Section left={0} top={0} width={305} height={30} label="COMPLEX OSCILLATOR" />
        <Section left={0} top={30} width={175} height={85} label="keyboard">
            <ToggleSwitch
                color="var(--color-complex-oscillator)"
                top={5}
                left={32}

                topOption="on"
                bottomOption="off"

                value={keyboard}
                twoWay={true}
                module={"complexOsc"} param={"keyboard"}
            />
        </Section>
        <Section left={0} top={115} width={175} height={85} label="polarity">
            <ToggleSwitch
                color="var(--color-complex-oscillator)"
                top={5}
                left={32}

                topOption="-"
                bottomOption="+"

                value={polarity}
                twoWay={true}
                module={"complexOsc"} param={"polarity"}
            />
        </Section>
        <Section left={175} top={30} width={130} height={170} label="timbre">
            <Knob
                x={65}
                y={45}
                value={timbreKnob}
                color="var(--color-complex-oscillator)"
                module={"complexOsc"}
                fader={"timbreKnob"} 
            />
            <ToggleSwitch
                color="var(--color-complex-oscillator)"
                top={90}
                left={20}

                value={waveshape}
                module={"complexOsc"} param={"waveshape"}
            />
            <path stroke="var(--color-outline)" strokeWidth="1" fill="none" d="m 55 95 m 0 10 l 20 -10 l 0 10 l 20 -10 l 0 10 l 20 -10 l 0 10" />
            <path stroke="var(--color-outline)" strokeWidth="1" fill="none" d="m 55 110 m 0 10 l 0 -10 l 10 0 l 0 10 l 10 0 l 0 -10 l 10 0 l 0 10 l 10 0 l 0 -10 l 10 0 l 0 10 l 10 0 l 0 -10" />
            <path stroke="var(--color-outline)" strokeWidth="1" fill="none" d="m 55 125 m 0 10 l 10 -10 l 10 10 l 10 -10 l 10 10 l 10 -10 l 10 10" />
        </Section>
        <Section left={0} top={200} width={305} height={300}>
            <FaderView left={30} top={20} value={pitchCV} color="var(--color-complex-oscillator)" module={"complexOsc"} fader={"pitchCV"} />
            <FaderView left={105} top={20} value={pitch} color="var(--color-complex-oscillator)" label="pitch" module={"complexOsc"} fader={"pitch"}/>
            <FaderView left={180} top={20} value={timbreCV} color="var(--color-complex-oscillator)" module={"complexOsc"} fader={"timbreCV"}/>
            <FaderView left={255} top={20} value={timbre} color="var(--color-complex-oscillator)" label="timbre" module={"complexOsc"} fader={"timbre"}/>
        </Section>
    </Section>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...state.patch.complexOsc
    }
}

const mapDispatchToProps = {
    dispatchUpdateFader,
    dispatchUpdateSwitch
};

export const ComplexOscillatorView = connect(mapStateToProps, mapDispatchToProps)(ComplexOscillatorViewImpl);
import * as React from "react";
import { connect } from "react-redux";
import { dispatchSetPatchName, dispatchShowModal } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { ModalType } from "../../types";
import { createPreviewURI } from "../../util";
import { IconButton } from "../iconButton";
import { DownloadIcon } from "../icons/downloadIcon";
import { FolderIcon } from "../icons/folderIcon";
import { MidiIcon } from "../icons/midiIcon";
import { SaveIcon } from "../icons/saveIcon";
import { Jack, ConnectionPoint } from "../jack";
import { Section } from "../section";
import { TitleInput } from "../titleInput";

export interface TopBarProps {
    dispatchSetPatchName: (name: string) => void;
    dispatchShowModal: (type: ModalType) => void;
    patchName: string;
}

export const TopBarImpl = (props: TopBarProps) => {
    const { patchName, dispatchSetPatchName, dispatchShowModal } = props;

    let svgRef: SVGSVGElement;
    const handleRef = (ref: SVGGElement) => {
        if (ref) svgRef = ref.ownerSVGElement!
    }

    const onSaveClicked = () => {
        console.log(createPreviewURI(svgRef))
    }


    return <Section left={0} top={0} width={1575} height={120}>
        <g ref={handleRef} />
        <Section left={0} top={0} width={840} height={120}>
            <Section left={0} top={0} width={840} height={30} label="EASEL PROGRAM MANAGER" />
            <IconButton
                left={15}
                top={45}
                title="Save Patch"
                onClick={onSaveClicked}>
                <SaveIcon />
            </IconButton>
            <IconButton
                left={90}
                top={45}
                title="Send patch to easel"
                onClick={() => dispatchShowModal("download")}>
                <DownloadIcon />
            </IconButton>
            <IconButton
                left={165}
                top={45}
                title="Saved Patches"
                onClick={() => dispatchShowModal("file")}>
                <FolderIcon />
            </IconButton>
            <IconButton
                left={240}
                top={45}
                title="Midi Config"
                onClick={() => dispatchShowModal("midi")}>
                <MidiIcon />
            </IconButton>
            <TitleInput
                left={315}
                top={45}
                height={60}
                width={410}
                onChange={dispatchSetPatchName}
                value={patchName}
                />
            <Jack
                x={785}
                y={65}
                color="var(--color-modulation-oscillator)"
                connectionPoint={ConnectionPoint.ModulationCVOutput}
                text="mod cv out" />
        </Section>
        <Section left={840} top={0} width={305} height={120}>-
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
        <Section left={1145} top={0} width={130} height={120}>-
            <Section left={0} top={0} width={130} height={30} label="COMP OSC" />
            {/* <path 
                d="M 65 65 h 45 a 5 5 1 0 1 5 5 v 60 a 5 5 1 0 1 -5 5 h -40 a 5 5 1 0 0 -5 5 v 30"
                stroke="var(--color-outline)"
                strokeDasharray="3 3"
                fill="none"
            /> */}
            <Jack
                x={65}
                y={65}
                color="var(--color-input)"
                connectionPoint={ConnectionPoint.ComplexOscWaveshapeInput}
                text="waveshape" />
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

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        patchName: state.name
    }
}

const mapDispatchToProps = {
    dispatchSetPatchName,
    dispatchShowModal
};

export const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarImpl);
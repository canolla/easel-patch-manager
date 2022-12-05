import * as React from "react";
import { connect } from "react-redux";
import { SavedPatch, savePatchAsync, updatePatchAsync } from "../../indexedDB";
import { dispatchSetPatchName, dispatchShowModal, dispatchOpenSavedPatch } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Easel, ModalType } from "../../types";
import { createPreviewURI, encodePatch } from "../../util";
import { IconButton } from "../iconButton";
import { DownloadIcon } from "../icons/downloadIcon";
import { FolderIcon } from "../icons/folderIcon";
import { MidiIcon } from "../icons/midiIcon";
import { SaveIcon } from "../icons/saveIcon";
import { Jack, ConnectionPoint } from "../jack";
import { LabelText } from "../labelText";
import { Section } from "../section";
import { TitleInput } from "../titleInput";

export interface TopBarProps {
    dispatchSetPatchName: (name: string) => void;
    dispatchShowModal: (type: ModalType) => void;
    dispatchOpenSavedPatch: (patch: SavedPatch) => void;
    patchName: string;
    saved?: SavedPatch;
    patch: Easel;
    patchNotSaved: boolean;
}

export const TopBarImpl = (props: TopBarProps) => {
    const { patchName, saved, patch, patchNotSaved, dispatchSetPatchName, dispatchShowModal, dispatchOpenSavedPatch } = props;

    let svgRef: SVGSVGElement;
    const handleRef = (ref: SVGGElement) => {
        if (ref) svgRef = ref.ownerSVGElement!
    }

    const onSaveClicked = async () => {
        let saveResult: SavedPatch;
        if (saved) {
            saveResult = await updatePatchAsync({
                ...saved,
                patch: encodePatch(patch),
                preview: createPreviewURI(svgRef),
                name: patchName
            });
        }
        else {
            saveResult = await savePatchAsync(patchName, patch, createPreviewURI(svgRef));
        }

        dispatchOpenSavedPatch(saveResult);
    }


    return <Section left={0} top={0} width={1575} height={120}>
        <g ref={handleRef} />
        <Section left={0} top={0} width={840} height={120}>
            <Section left={0} top={0} width={840} height={30} label="UNOFFICIAL EASEL PROGRAM MANAGER" />
            <IconButton
                left={15}
                top={45}
                title="Saved Patches"
                onClick={() => dispatchShowModal("file")}>
                <FolderIcon />
            </IconButton>
            <IconButton
                left={90}
                top={45}
                title="Save Patch"
                onClick={onSaveClicked}>
                <SaveIcon />
            </IconButton>
            <IconButton
                left={165}
                top={45}
                title="Send patch to easel"
                onClick={() => dispatchShowModal("download")}>
                <DownloadIcon />
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
            {patchNotSaved &&
                <g transform="translate(15, 45)">
                    <LabelText className="big" x={90} y={28} text="Patch not" anchor="middle" />
                    <LabelText className="big" x={90} y={50} text="saved!" anchor="middle" />
                </g>
            }
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

    let patchNotSaved = !state.saved;

    if (state.saved) {
        patchNotSaved = state.patchEdited || state.saved.name !== state.name;
    }

    return {
        ...ownProps,
        patchName: state.name,
        saved: state.saved,
        patch: state.patch,
        patchNotSaved
    }
}

const mapDispatchToProps = {
    dispatchSetPatchName,
    dispatchShowModal,
    dispatchOpenSavedPatch
};

export const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarImpl);
import * as React from "react";
import { connect } from "react-redux";
import { listMIDIInputsAsync } from "../../midi";
import { dispatchHideModal, dispatchSetMIDIInput } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Dropdown, DropdownItem } from "../common/Dropdown";
import { MidiOutputSelector } from "./midiOutputSelector";
import { Modal } from "./modal";

export interface MidiModalProps {
    dispatchHideModal: () => void;
    dispatchSetMIDIInput: (id?: string) => void;
    midiInput?: string;
}

export const MidiModalImpl = (props: MidiModalProps) => {
    const { dispatchHideModal, dispatchSetMIDIInput, midiInput } = props;

    const [midiInputs, setMidiInputs] = React.useState<[string, string][]>([]);

    React.useEffect(() => {
        listMIDIInputsAsync().then(setMidiInputs);
    }, [])

    const inputs: DropdownItem[] = [
        {
            label: "None",
            title: "None",
            id: "None"
        }
    ]

    for (const device of midiInputs) {
        inputs.push({
            label: device[1],
            title: device[1],
            id: "input-" + device[0]
        })
    }

    let selectedInput = "None";

    if (midiInputs.some(i => i[0] === midiInput)) {
        selectedInput = "input-" + midiInput;
    }

    const onInputSelected = (id: string) => {
        if (id === "None") dispatchSetMIDIInput(undefined);
        else dispatchSetMIDIInput(id.split("-").slice(1).join("-"));
    }

    return <Modal
        title="Midi config"
        onCloseClick={dispatchHideModal}>
        <div className="modal-field">
            <div className="modal-field-label">
                Midi input:
            </div>
            <Dropdown
                id="midi-input"
                onItemSelected={onInputSelected}
                items={inputs}
                selectedId={selectedInput}
            />
        </div>
        <MidiOutputSelector />
    </Modal>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        midiInput: state.midiInput
    }
}

const mapDispatchToProps = {
    dispatchHideModal,
    dispatchSetMIDIInput
};

export const MidiModal = connect(mapStateToProps, mapDispatchToProps)(MidiModalImpl);
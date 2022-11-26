import * as React from "react";
import { connect } from "react-redux";
import { listMIDIInputsAsync, listMIDIOutputsAsync } from "../../midi";
import { dispatchHideModal, dispatchSetMIDIInput, dispatchSetMIDIOutput } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Dropdown, DropdownItem } from "../common/Dropdown";
import { Modal } from "./modal";

export interface MidiModalProps {
    dispatchHideModal: () => void;
    dispatchSetMIDIInput: (id?: string) => void;
    dispatchSetMIDIOutput: (id?: string) => void;
    midiOutput?: string;
    midiInput?: string;
}

export const MidiModalImpl = (props: MidiModalProps) => {
    const { dispatchHideModal, dispatchSetMIDIOutput, dispatchSetMIDIInput, midiInput, midiOutput } = props;

    const [midiInputs, setMidiInputs] = React.useState<[string, string][]>([]);
    const [midiOutputs, setMidiOutputs] = React.useState<[string, string][]>([]);

    React.useEffect(() => {
        listMIDIOutputsAsync().then(setMidiOutputs);
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


    const outputs: DropdownItem[] = [
        {
            label: "None",
            title: "None",
            id: "None"
        }
    ]

    for (const device of midiOutputs) {
        outputs.push({
            label: device[1],
            title: device[1],
            id: "output-" + device[0]
        })
    }

    let selectedOutput = "None";

    if (midiOutputs.some(i => i[0] === midiOutput)) {
        selectedOutput = "output-" + midiOutput;
    }

    const onInputSelected = (id: string) => {
        if (id === "None") dispatchSetMIDIInput(undefined);
        else dispatchSetMIDIInput(id);
    }

    const onOutputSelected = (id: string) => {
        if (id === "None") dispatchSetMIDIOutput(undefined);
        else dispatchSetMIDIOutput(id);
    }


    return <Modal
        title="Midi config"
        onCloseClick={dispatchHideModal}>
        <div className="modal-field">
            <div className="modal-field-label">
                Midi Input:
            </div>
            <Dropdown
                id="midi-input"
                onItemSelected={onInputSelected}
                items={inputs}
                selectedId={selectedInput}
            />
        </div>
        <div className="modal-field">
            <div className="modal-field-label">
                Midi Output:
            </div>
            <Dropdown
                id="midi-output"
                onItemSelected={onOutputSelected}
                items={inputs}
                selectedId={selectedOutput}
            />
        </div>
    </Modal>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        midiOutput: state.midiOutput,
        midiInput: state.midiInput
    }
}

const mapDispatchToProps = {
    dispatchHideModal,
    dispatchSetMIDIInput,
    dispatchSetMIDIOutput
};

export const MidiModal = connect(mapStateToProps, mapDispatchToProps)(MidiModalImpl);
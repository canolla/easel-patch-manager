import React from "react";
import { connect } from "react-redux";
import { addConnectionChangedListener, listMIDIOutputsAsync, removeConnectionChangedListener } from "../../midi";
import { dispatchHideModal, dispatchSetMIDIOutput } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Dropdown, DropdownItem } from "../common/Dropdown";

export interface MidiOutputSelectorProps {
    dispatchSetMIDIOutput: (id?: string) => void;
    midiOutput?: string;
}

const MidiOutputSelectorImpl = (props: MidiOutputSelectorProps) => {
    const { dispatchSetMIDIOutput, midiOutput } = props;

    const [midiOutputs, setMidiOutputs] = React.useState<[string, string][]>([]);

    React.useEffect(() => {
        const updateMidiOutputsAsync = async () => {
            const outputs = await listMIDIOutputsAsync();
            setMidiOutputs(outputs);
        }

        updateMidiOutputsAsync();

        addConnectionChangedListener(updateMidiOutputsAsync);
        return () => {
            removeConnectionChangedListener(updateMidiOutputsAsync);
        }
    }, []);

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

    const onOutputSelected = (id: string) => {
        if (id === "None") dispatchSetMIDIOutput(undefined);
        else dispatchSetMIDIOutput(id.split("-").slice(1).join("-"));
    }

    return <div className="modal-field">
        <div className="modal-field-label">
            Midi output:
        </div>
        <Dropdown
            id="midi-output"
            onItemSelected={onOutputSelected}
            items={outputs}
            selectedId={selectedOutput}
        />
    </div>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        midiOutput: state.midiOutput,
    }
}

const mapDispatchToProps = {
    dispatchHideModal,
    dispatchSetMIDIOutput
};

export const MidiOutputSelector = connect(mapStateToProps, mapDispatchToProps)(MidiOutputSelectorImpl);
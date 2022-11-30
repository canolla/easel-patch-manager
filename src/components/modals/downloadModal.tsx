import * as React from "react";
import { connect } from "react-redux";
import { sendMIDIMessagesAsync } from "../../midi";
import { createDisconnectAllMessages, createPatchMessages } from "../../midiMessages";
import { dispatchHideModal, dispatchSetMidiSpeed } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Easel, MidiMessageSpeed } from "../../types";
import { CancellationToken } from "../../util";
import { Dropdown, DropdownItem } from "../common/Dropdown";
import { MidiOutputSelector } from "./midiOutputSelector";
import { Modal, ModalAction } from "./modal";

export interface DownloadModalProps {
    dispatchHideModal: () => void;
    dispatchSetMidiSpeed: (speed: MidiMessageSpeed) => void;
    patch: Easel;
    patchName: string;
    midiOutput?: string;
    midiSpeed: MidiMessageSpeed;
}

export const DownloadModalImpl = (props: DownloadModalProps) => {
    const { dispatchHideModal, patch, patchName, midiOutput, midiSpeed, dispatchSetMidiSpeed } = props;
    
    const [selectedSlot, setSelectedSlot] = React.useState<string>("None");
    const [sendingPatch, setSendingPatch] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [cancellationToken, setCancellationToken] = React.useState<CancellationToken>();

    const saveSlots: DropdownItem[] = [
        {
            label: "None",
            id: "None",
            title: "None"
        }
    ];

    for (let i = 0; i < 24; i++) {
        saveSlots.push({
            label: i < 9 ? "0" + (i + 1) : "" + (i + 1),
            title: "Save Slot " + (i + 1),
            id: "slot-" + i
        })
    }

    const onSaveSlotSelected = (id: string) => {
        setSelectedSlot(id);
    }

    const messageSpeeds: DropdownItem[] = [
        {
            label: "Very Slow",
            title: "Very Slow",
            id: "very-slow"
        },
        {
            label: "Slow",
            title: "Slow",
            id: "slow"
        },
        {
            label: "Medium",
            title: "Medium",
            id: "medium"
        },
        {
            label: "Fast",
            title: "Fast",
            id: "fast"
        }
    ];

    const onMidiSpeedSelected = (id: string) => {
        dispatchSetMidiSpeed(id as MidiMessageSpeed);
    }

    const actions: ModalAction[] = [];

    if (sendingPatch || midiOutput) {
        actions.push({
            label: "Cancel",
            onClick: () => {
                if (cancellationToken) {
                    cancellationToken.cancel();
                }
                dispatchHideModal();
            }
        });
    }

    if (!sendingPatch && midiOutput) {
        actions.push({
            label: "Send",
            onClick: () => {
                if (cancellationToken) cancellationToken.cancel();
                setSendingPatch(true);
                
                let messages = createPatchMessages(
                    patch,
                    true,
                    patchName,
                    selectedSlot !== "None" ? parseInt(selectedSlot.split("-").slice(-1)[0]) : undefined
                );

                // Disconnect any connections that might have been made
                if (selectedSlot === "None") {
                    messages = createDisconnectAllMessages().concat(messages);
                }

                const token = new CancellationToken();
                setCancellationToken(token);

                sendMIDIMessagesAsync(midiOutput!, messages, (current, total) => {
                    setProgress(Math.round((current / total) * 100));
                }, token)
                .then(() => {
                    setCancellationToken(undefined);
                    dispatchHideModal();
                });
            }
        });
    }

    const fill = "var(--color-outline)"
    const empty = "var(--color-background)"

    return <Modal
        title="Send patch to easel"
        onCloseClick={dispatchHideModal}
        actions={actions}>
        {!sendingPatch &&
            <>
                <div className="modal-field">
                    <div className="modal-field-label">
                        Save to slot:
                    </div>
                    <Dropdown
                        id="download-save-slot"
                        onItemSelected={onSaveSlotSelected}
                        items={saveSlots}
                        selectedId={selectedSlot}
                    />
                </div>
                <MidiOutputSelector />
                <div className="modal-field">
                    <div className="modal-field-label">
                        Message speed:
                    </div>
                    <Dropdown
                        id="download-midi-speed"
                        onItemSelected={onMidiSpeedSelected}
                        items={messageSpeeds}
                        selectedId={midiSpeed}
                    />
                </div>
            </>
        }
        {sendingPatch &&
            <div className="progress-bar-outer">
                <div>
                    Sending patch to easel...
                </div>
                <div className="progress-bar" style={{backgroundImage: `linear-gradient(to right, ${fill} 0%, ${fill} ${progress}%, ${empty} ${progress}%, ${empty} 100%)`}} />
            </div>
        }
    </Modal>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        patch: state.patch,
        patchName: state.name,
        midiOutput: state.midiOutput,
        midiSpeed: state.midiSpeed
    }
}

const mapDispatchToProps = {
    dispatchHideModal,
    dispatchSetMidiSpeed
};

export const DownloadModal = connect(mapStateToProps, mapDispatchToProps)(DownloadModalImpl);
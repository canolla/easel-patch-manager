import * as React from "react";
import { connect } from "react-redux";
import { dispatchHideModal } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Modal } from "./modal";

export interface MidiModalProps {
    dispatchHideModal: () => void;
}

export const MidiModalImpl = (props: MidiModalProps) => {
    const { dispatchHideModal } = props;

    return <Modal
        title="Midi Config"
        onCloseClick={dispatchHideModal}>


    </Modal>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
    }
}

const mapDispatchToProps = {
    dispatchHideModal,
};

export const MidiModal = connect(mapStateToProps, mapDispatchToProps)(MidiModalImpl);
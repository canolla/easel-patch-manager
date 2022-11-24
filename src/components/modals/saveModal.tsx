import * as React from "react";
import { connect } from "react-redux";
import { dispatchHideModal } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Modal } from "./modal";

export interface SaveModalProps {
    dispatchHideModal: () => void;
}

export const SaveModalImpl = (props: SaveModalProps) => {
    const { dispatchHideModal } = props;

    return <Modal
        title="Save Patch"
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

export const SaveModal = connect(mapStateToProps, mapDispatchToProps)(SaveModalImpl);
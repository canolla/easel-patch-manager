import * as React from "react";
import { connect } from "react-redux";
import { dispatchHideModal } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Modal } from "./modal";

export interface FileModalProps {
    dispatchHideModal: () => void;
}

export const FileModalImpl = (props: FileModalProps) => {
    const { dispatchHideModal } = props;

    return <Modal
        title="Saved Patches"
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

export const FileModal = connect(mapStateToProps, mapDispatchToProps)(FileModalImpl);
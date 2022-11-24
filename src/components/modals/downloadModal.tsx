import * as React from "react";
import { connect } from "react-redux";
import { dispatchHideModal } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Modal } from "./modal";

export interface DownloadModalProps {
    dispatchHideModal: () => void;
}

export const DownloadModalImpl = (props: DownloadModalProps) => {
    const { dispatchHideModal } = props;

    return <Modal
        title="Send Patch to Easel"
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

export const DownloadModal = connect(mapStateToProps, mapDispatchToProps)(DownloadModalImpl);
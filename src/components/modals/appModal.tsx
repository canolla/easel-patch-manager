import * as React from "react";
import { connect } from "react-redux";
import { dispatchUpdateFader } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { ModalState } from "../../types";
import { DownloadModal } from "./downloadModal";
import { FileModal } from "./fileModal";
import { MidiModal } from "./midiModal";
import { SaveModal } from "./saveModal";

export interface AppModalProps {
    modalState: ModalState;
}

export const AppModalImpl = (props: AppModalProps) => {
    const { modalState } = props;

    switch (modalState.type) {
        case "download": return <DownloadModal />
        case "file": return <FileModal />
        case "midi": return <MidiModal />
        case "save": return <SaveModal />
    }
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        modalState: state.modal
    }
}

const mapDispatchToProps = {
    dispatchUpdateFader,
};

export const AppModal = connect(mapStateToProps, mapDispatchToProps)(AppModalImpl);
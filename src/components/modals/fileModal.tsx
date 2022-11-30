import * as React from "react";
import { connect } from "react-redux";
import { allPatchesAsync, SavedPatch } from "../../indexedDB";
import { dispatchHideModal, dispatchOpenSavedPatch } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { formatLastEditedDate } from "../../util";
import { Modal } from "./modal";

import "../../styles/fileModal.css";

export interface FileModalProps {
    dispatchHideModal: () => void;
    dispatchOpenSavedPatch: (patch: SavedPatch) => void;
}

export const FileModalImpl = (props: FileModalProps) => {
    const { dispatchHideModal, dispatchOpenSavedPatch } = props;
    const [savedProjects, setSavedProjects] = React.useState<SavedPatch[]>([]);

    React.useEffect(() => {
        allPatchesAsync().then(setSavedProjects)
    }, [])

    const onPatchClick = (patch: SavedPatch) => {
        dispatchOpenSavedPatch(patch);
        dispatchHideModal();
    }

    return <Modal
        title="Saved patches"
        onCloseClick={dispatchHideModal}>
        <div className="saved-patches-scroller">
            <div className="saved-patches-list">
                {savedProjects.map(patch => 
                    <div key={patch.id} className="saved-patch-list-item" onClick={() => onPatchClick(patch)}>
                        <div className="saved-patch-detail">
                            <div className="saved-patch-name">
                                {patch.name}
                            </div>
                            <div className="saved-patch-time">
                                Last edited {formatLastEditedDate(patch.lastSavedTime)}
                            </div>
                        </div>
                        <div className="saved-patch-preview">
                            <img src={patch.preview} alt="Preview of patch" />
                        </div>
                    </div>
                )}
            </div>
        </div>
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
    dispatchOpenSavedPatch
};

export const FileModal = connect(mapStateToProps, mapDispatchToProps)(FileModalImpl);
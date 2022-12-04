import * as React from "react";
import { connect } from "react-redux";
import { SavedPatch, savePatchAsync, updatePatchAsync } from "../../indexedDB";
import { dispatchHideModal, dispatchOpenSavedPatch, dispatchCreateNewPatch } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { Easel, SaveModalState } from "../../types";
import { createPreviewURI, encodePatch } from "../../util";
import { Modal, ModalAction } from "./modal";

export interface SaveModalProps {
    dispatchHideModal: () => void;
    dispatchCreateNewPatch: () => void;
    dispatchOpenSavedPatch: (patch: SavedPatch) => void;
    patchToLoad: SavedPatch;
    saved?: SavedPatch;
    patchName: string;
    patch: Easel;
}

export const SaveModalImpl = (props: SaveModalProps) => {
    const { dispatchHideModal, dispatchOpenSavedPatch, dispatchCreateNewPatch, patchToLoad, saved, patchName, patch } = props;

    const actions: ModalAction[] = [
        {
            label: "Don't Save",
            onClick: () => {
                dispatchHideModal();
                if (patchToLoad) {
                    dispatchOpenSavedPatch(patchToLoad);
                }
                else {
                    dispatchCreateNewPatch();
                }
            }
        },
        {
            label: "Save",
            onClick: async () => {
                dispatchHideModal();


                const svgRef = document.querySelector(".App > svg") as SVGSVGElement;

                if (saved) {
                    await updatePatchAsync({
                        ...saved,
                        patch: encodePatch(patch),
                        preview: createPreviewURI(svgRef),
                        name: patchName
                    });
                }
                else {
                    await savePatchAsync(patchName, patch, createPreviewURI(svgRef));
                }

                
                if (patchToLoad) {
                    dispatchOpenSavedPatch(patchToLoad);
                }
                else {
                    dispatchCreateNewPatch();
                }
            }
        }
    ]

    return <Modal
        className="small"
        title="Unsaved patch"
        onCloseClick={dispatchHideModal}
        actions={actions}>
        <div className="modal-text-content">
            Your patch has unsaved changes. Do you want to save before continuing?
        </div>
    </Modal>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        patchToLoad: (state.modal as SaveModalState).patchToLoad,
        saved: state.saved,
        patch: state.patch,
        patchName: state.name
    }
}

const mapDispatchToProps = {
    dispatchHideModal,
    dispatchOpenSavedPatch,
    dispatchCreateNewPatch
};

export const SaveModal = connect(mapStateToProps, mapDispatchToProps)(SaveModalImpl);
import React from 'react';
import './App.css';
import './styles/colors.css';
import { Easel } from './components/easel';
import store from './store/store';
import { decodePatch, encodePatch, throttle } from './util';
import { dispatchSetPatch, dispatchSetPatchEdited, dispatchOpenSavedPatch, dispatchSetPatchName } from './store/dispatch';
import { State } from './store/reducer';
import { connect } from 'react-redux';
import { ModalState } from './types';
import { AppModal } from './components/modals/appModal';
import { getLastEditedProject } from './localStorage';
import { getPatchAsync, SavedPatch } from './indexedDB';

store.subscribe(throttle(() => {
	const state = store.getState();
	const current = state.patch;
	const encoded = encodePatch(current);
	window.location.replace("#" + encoded + "&" + encodeURIComponent(state.name));

	if (state.saved) {
		const edited = state.saved.patch !== encoded;

		if (!!(state.patchEdited) !== edited) {
			store.dispatch(dispatchSetPatchEdited(edited));
		}
	}
}, 500))

interface AppProps {
	modal?: ModalState
	dispatchSetPatch: (patch: any) => void;
	dispatchOpenSavedPatch: (patch: SavedPatch) => void;
	dispatchSetPatchName: (name: string) => void;
}

const AppImpl = (props: AppProps) => {
	const { modal, dispatchSetPatch, dispatchOpenSavedPatch, dispatchSetPatchName } = props;

	React.useEffect(() => {
		const initAsync = async () => {
			const lastEdited = getLastEditedProject();
			let savedPatch: SavedPatch | undefined;
			if (lastEdited) {
				savedPatch = await getPatchAsync(parseInt(lastEdited));
			}
			const hash = window.location.hash;
			if (hash?.length <= 2) {
				if (savedPatch) {
					dispatchOpenSavedPatch(savedPatch);
				}

				return;
			}

			const parts = hash.slice(1).split("&");
			const encodedPatch = parts[0];
			const patch = decodePatch(encodedPatch);
			const patchName = decodeURIComponent(parts[1]);

			if (savedPatch?.patch === encodedPatch && savedPatch.name === patchName) {
				dispatchOpenSavedPatch(savedPatch);
				return;
			}

			dispatchSetPatch(patch);
			dispatchSetPatchName(patchName);
		}

		initAsync();
	}, []);
	
	return (
		<div className="App">
			<Easel />
			{modal && <AppModal />}
		</div>
	);
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
		modal: state.modal
    }
}

const mapDispatchToProps = {
	dispatchSetPatch,
	dispatchOpenSavedPatch,
	dispatchSetPatchName
};


export default connect(mapStateToProps, mapDispatchToProps)(AppImpl);

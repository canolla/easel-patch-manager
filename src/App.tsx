import React from 'react';
import './App.css';
import './styles/colors.css';
import { Easel } from './components/easel';
import store from './store/store';
import { decodePatch, encodePatch, throttle } from './util';
import { dispatchSetPatch } from './store/dispatch';

store.subscribe(throttle(() => {
	const current = store.getState().patch;
	window.location.replace("#" + encodePatch(current))
}, 500))

function App() {
	React.useEffect(() => {
		const hash = window.location.hash;

		if (hash?.length > 2) {
			const state = decodePatch(hash.slice(1));
			store.dispatch(dispatchSetPatch(state));
		}
	}, [])
	return (
		<div className="App">
			<Easel />
		</div>
	);
}

export default App;

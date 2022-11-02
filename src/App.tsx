import React from 'react';
import './App.css';
import './styles/colors.css';
import { Easel } from './components/easel';
import store from './store/store';
import { encodePatch, throttle } from './util';

// store.subscribe(throttle(() => {
// 	const current = store.getState().patch;
// 	window.location.replace("#" + encodePatch(current))
// }, 500))

function App() {
	return (
		<div className="App">
			<Easel />
		</div>
	);
}

export default App;

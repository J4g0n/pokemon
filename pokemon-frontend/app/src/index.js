import React from 'react';  
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import getStore from './redux/store.js';
import App from './components/App.jsx';



const main = () => {
	const appRoot = document.createElement('div');
	document.body.appendChild(appRoot);
	ReactDOM.render(
		<Provider store={getStore()}>
			<App />
		</Provider>,
		appRoot
	);
};

main();  

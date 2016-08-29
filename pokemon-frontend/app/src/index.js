import React from 'react';  
import ReactDOM from 'react-dom';  
import App from './components/App.jsx';  

const main = function() {  
	console.log("Hello world!");
	const appRoot = document.createElement('div');
	document.body.appendChild(appRoot);
	ReactDOM.render(<App />, appRoot); 
};

main();  

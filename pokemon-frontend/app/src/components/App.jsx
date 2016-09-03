import React from 'react';  
import Menu from './Menu.jsx';
import Content from './Content.jsx';

require("../styles/app.less");


class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	 	return (
	 		<div className="app-layout">
				<Menu />
				<Content />
			</div>
		);
	}
}

export default App
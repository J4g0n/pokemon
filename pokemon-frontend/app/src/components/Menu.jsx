import React from 'react';  

require("../styles/menu.less");

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"searchText": ""
		};
	}

	onSearchChange(searchText) {
		this.setState({
			"searchText": searchText
		});

		const debouncedGetPokemon = _.debounce(() => this.props.searchPokemon(searchText), 500);
		debouncedGetPokemon();
	}

	render() {
		const { searchText, resetApp } = this.props;
	 	return (
	 		<div className="menu">
				<div className="logo" onClick={resetApp}>
					<img src={ require("../images/pokeball.png") } alt="pokeball" height="40px" width="40px"/>
				</div>
				<div className="search">
					<input
						type="text"
						placeholder="Poke here!"
						value={searchText}
						onChange={(event) => this.onSearchChange(event.target.value)}
					/>
				</div>
			</div>
		);
	}
}

Menu.propTypes = {
	searchPokemon: React.PropTypes.func.isRequired,
	resetApp: React.PropTypes.func.isRequired
};

export default Menu
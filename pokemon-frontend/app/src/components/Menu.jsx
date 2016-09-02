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
		debouncedGetPokemon(searchText)
	}

	render() {
		const { searchText } = this.props;
	 	return (
	 		<div className="menu">
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
	searchPokemon: React.PropTypes.func.isRequired
};

export default Menu
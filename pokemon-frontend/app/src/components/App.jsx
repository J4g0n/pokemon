import React from 'react';  
import Menu from './Menu.jsx';
import Content from './Content.jsx';

import { getPokemonList } from "../repositories/pokemonRepository";

require("../styles/content.less");


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"searchText": "",
			"pokemons": []
		}
	}

	componentDidMount() {
		getPokemonList().then(pokemons => {
			this.setState({
				"pokemons": pokemons.results
			});
		});
	}

	onSearchChange(searchText) {
		if (searchText.length > 3) {
			this.setState({
				"searchText": searchText
			});
		}
	}

	render() {
		const { searchText, pokemons } = this.state;
	 	return (
	 		<div className="app-layout">
				<Menu onChange={this.onSearchChange.bind(this)} searchText={searchText}/>
				<Content pokemons={pokemons}/>
			</div>
		);
	}
}

export default App
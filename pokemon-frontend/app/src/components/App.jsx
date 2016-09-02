import React from 'react';  
import Menu from './Menu.jsx';
import Content from './Content.jsx';

import { getPokemonList } from "../repositories/pokemonRepository";

require("../styles/app.less");


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"searchText": undefined,
			"selectedPokemon": undefined,
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

	searchPokemon(name) {
		const { pokemons } = this.state;
		const foundPokemon = _.find(pokemons, (pokemon) => pokemon.name === name.toLowerCase());
		this.setState({
			"searchText": name,
			"selectedPokemon": foundPokemon
		});
	}

	filterPokemons() {
		const { pokemons, searchText } = this.state;
		const filteredPokemons = _.filter(pokemons, pokemon => _.startsWith(pokemon.name, searchText));
		return _.isEmpty(filteredPokemons) ? pokemons : filteredPokemons;
	}

	selectPokemon(pokemon) {
		this.setState({
			"selectedPokemon": pokemon
		});
	}

	render() {
		const { selectedPokemon } = this.state;
	 	return (
	 		<div className="app-layout">
				<Menu searchPokemon={this.searchPokemon.bind(this)}/>
				<Content
					pokemons={this.filterPokemons()}
					selectedPokemon={selectedPokemon}
					onClickPokemon={this.selectPokemon.bind(this)}
				/>
			</div>
		);
	}
}

export default App
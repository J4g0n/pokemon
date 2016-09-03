import React from 'react';  
import Menu from './Menu.jsx';
import Content from './Content.jsx';

import { getPokemonList, getPokemon } from "../repositories/pokemonRepository";

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
		this.setState({
			"searchText": name
		});
	}

	resetApp() {
		this.setState({
			"selectedPokemon": undefined
		});
	}

	filterPokemons() {
		const { pokemons, searchText } = this.state;
		const filteredPokemons = _.filter(pokemons, pokemon => _.startsWith(pokemon.name, searchText));
		return _.isEmpty(filteredPokemons) ? pokemons : filteredPokemons;
	}

	selectPokemon(pokemon) {
		getPokemon(pokemon.url).then(json => {
			console.log("Pokemon fetched: ", json);
			this.setState({
				"selectedPokemon": json
			})
		});
	}

	render() {
		const { selectedPokemon } = this.state;
	 	return (
	 		<div className="app-layout">
				<Menu
					searchPokemon={this.searchPokemon.bind(this)}
					resetApp={this.resetApp.bind(this)}
				/>
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
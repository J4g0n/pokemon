import React from 'react';
import _ from 'lodash';

require("../styles/pokemonList.less");

class PokemonList extends React.Component {
	renderPokemons(pokemons) {
		const { onClickPokemon } = this.props;
		return _.map(pokemons, pokemon => {
			return (
				<li key={pokemon.name} onClick={() => onClickPokemon(pokemon)}>{pokemon.name}</li>
			);
		});
	}

	render() {
		const { pokemons } = this.props;
	 	return (
			<ul>
				{this.renderPokemons(pokemons)}
			</ul>
		);
	}
}

PokemonList.propTypes = {
	pokemons: React.PropTypes.array.isRequired,
	onClickPokemon: React.PropTypes.func.isRequired
};

export default PokemonList
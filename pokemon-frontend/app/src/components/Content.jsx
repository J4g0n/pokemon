import React from 'react';
import { connector } from '../redux/connector.jsx';
import PokemonCard from './PokemonCard.jsx';
import PokemonList from './PokemonList.jsx';

import { getPokemonList, getPokemon } from "../repositories/pokemonRepository";

require("../styles/content.less");


class Content extends React.Component {
	componentDidMount() {
		console.log("Content props: ", this.props);
		const { dispatch, actions, pokemons } = this.props;
		// todo fetching init datas here is just bad
		if (_.isEmpty(pokemons)) {
			getPokemonList().then(pokemons => {
				dispatch(actions.getPokemonList(pokemons.results));
			});
		}
	}

	onClickPokemon(pokemon) {
		const { dispatch, actions } = this.props;
		getPokemon(pokemon.url).then(foundPokemon => {
			console.log("Pokemon fetched: ", foundPokemon);
			dispatch(actions.selectPokemon(foundPokemon));
		});
	}

	filterPokemons() {
		const { pokemons, searchText } = this.props;
		const filteredPokemons = _.filter(pokemons, pokemon => _.startsWith(pokemon.name, searchText));
		return _.isEmpty(filteredPokemons) ? pokemons : filteredPokemons;
	}

	render() {
		const { selectedPokemon, pokemons } = this.props;
	 	return (
	 		<div className="content">
				{
					selectedPokemon ?
						<PokemonCard pokemon={selectedPokemon}/> :
						<PokemonList
							onClickPokemon={this.onClickPokemon.bind(this)}
							pokemons={this.filterPokemons()}
						/>
				}
			</div>
		);
	}
}

Content.propTypes = {
	pokemons: React.PropTypes.array.isRequired,
	selectedPokemon: React.PropTypes.object,
	searchText: React.PropTypes.string
};

export default connector(state => state.content)(Content);
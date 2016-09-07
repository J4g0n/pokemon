import React from 'react';
import { connector } from '../redux/connector.jsx';
import PokemonCard from './PokemonCard.jsx';
import PokemonList from './PokemonList.jsx';

import { getPokemonList, getPokemon, getTypeStats } from "../repositories/pokemonRepository";

require("../styles/content.less");


class Content extends React.Component {
	componentDidMount() {
		const { dispatch, actions, pokemons } = this.props;
		// todo fetching init datas here is just bad, trigger this in main function instead
		if (_.isEmpty(pokemons)) {
			getPokemonList().then(pokemons => {
				dispatch(actions.getPokemonList(pokemons));
			});
		}
	}

	onClickPokemon(pokemon) {
		const { dispatch, actions } = this.props;
		getPokemon(pokemon.id).then(foundPokemon => {
			dispatch(actions.selectPokemon(foundPokemon));
        });
		getTypeStats(pokemon.id).then(result => {
			console.log("type stats: ", result);
			dispatch(actions.getTypeStats(result));
		});
	}

	filterPokemons() {
		const { pokemons, searchText } = this.props;
		const filteredPokemons = _.filter(pokemons, pokemon => _.startsWith(pokemon.name, searchText));
		return _.isEmpty(filteredPokemons) ? pokemons : filteredPokemons;
	}

	render() {
		const { selectedPokemon, pokemons, typeStats } = this.props;
	 	return (
	 		<div className="content">
				{
					selectedPokemon ?
						<PokemonCard pokemon={selectedPokemon} typeStats={typeStats}/> :
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
	typeStats: React.PropTypes.array,
	selectedPokemon: React.PropTypes.object,
	searchText: React.PropTypes.string
};

export default connector(state => state.content)(Content);
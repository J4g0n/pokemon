import React from 'react';
import PokemonTwitterTimeline from './PokemonTwitterTimeline.jsx';
import PokemonStats from './PokemonStats.jsx';
import _ from 'lodash';


require("../styles/pokemonCard.less");

class PokemonCard extends React.Component {
	render() {
		const { pokemon, typeStats } = this.props;
		//console.log("Pokemon: ", pokemon);
		// todo img url reference the one on api side, improve later
	 	return (
	 		<div className="pokemon-card">
				<div className="pokemon-picture">
					<img src={pokemon.imgurl} alt="Pokemon picture"/>
				</div>
				<div className="pokemon-name">{pokemon.name}</div>
				<PokemonStats pokemonName={pokemon.name} pokemonStats={pokemon.stats} pokemonTypes={typeStats}/>
			</div>
		);
//		<PokemonTwitterTimeline pokemonName={pokemon.name}/>
	}
}

PokemonCard.propTypes = {
	pokemon: React.PropTypes.object.isRequired,
	typeStats: React.PropTypes.array
};

export default PokemonCard
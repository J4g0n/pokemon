import React from 'react';
import _ from 'lodash';


require("../styles/pokemonCard.less");

class PokemonCard extends React.Component {
	render() {
		const { pokemon } = this.props;
	 	return (
	 		<div className="pokemon-card">
				{pokemon.id}
				{pokemon.name}
			</div>
		);
	}
}

PokemonCard.propTypes = {
	pokemon: React.PropTypes.object.isRequired
};

export default PokemonCard
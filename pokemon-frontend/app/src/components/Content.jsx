import React from 'react';
import _ from 'lodash';

require("../styles/content.less");


class Content extends React.Component {
	renderPokemons(pokemons) {
		return _.map(pokemons, pokemon => {
			return (
				<li key={pokemon.name}>{pokemon.name}</li>
			);
		});
	}

	render() {
		const { pokemons } = this.props;
	 	return (
	 		<div className="content">
				<ul>
					{this.renderPokemons(pokemons)}
				</ul>
			</div>
		);
	}
}

Content.propTypes = {
	pokemons: React.PropTypes.array.isRequired
};

export default Content
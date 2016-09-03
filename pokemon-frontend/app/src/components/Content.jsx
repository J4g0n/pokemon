import React from 'react';
import { connector } from '../redux/connector.jsx';
import PokemonCard from './PokemonCard.jsx';
import PokemonList from './PokemonList.jsx';

require("../styles/content.less");


class Content extends React.Component {
	render() {
		const { selectedPokemon } = this.props;
	 	return (
	 		<div className="content">
				{
					selectedPokemon ?
						<PokemonCard pokemon={selectedPokemon}/> :
						<PokemonList {...this.props}/>
				}
			</div>
		);
	}
}

Content.propTypes = {
	pokemons: React.PropTypes.array.isRequired,
	onClickPokemon: React.PropTypes.func.isRequired,
	selectedPokemon: React.PropTypes.object
};

export default connector(state => state)(Content);
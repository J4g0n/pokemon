import React from 'react';
import { connector } from '../redux/connector.jsx';

require("../styles/menu.less");

class Menu extends React.Component {
	onSearchChange(searchText) {
		const { actions, dispatch } = this.props;
		dispatch(actions.searchPokemon(searchText));
	}

	resetApp() {
		const { actions, dispatch } = this.props;
		dispatch(actions.resetApp());
	}

	render() {
		const { searchText } = this.props;
	 	return (
	 		<div className="menu">
				<div className="logo" onClick={() => this.resetApp()}>
					<img src={ require("../images/pokeball.png") } alt="pokeball" height="40px" width="40px"/>
				</div>
				<div className="search">
					<input
						type="text"
						placeholder="Poke here!"
						value={searchText}
						onChange={(event) => this.onSearchChange(event.target.value)}
					/>
				</div>
			</div>
		);
	}
}

Menu.propTypes = {
	searchText: React.PropTypes.string.isRequired
};

export default connector(state => state.search)(Menu)
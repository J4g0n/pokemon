import React from 'react';  

require("../styles/menu.less");

class Menu extends React.Component {
	render() {
		const { searchText, onChange } = this.props;
	 	return (
	 		<div className="menu">
				<div className="search">
					<input
						type="text"
						placeholder="Poke here!"
						value={searchText}
						onChange={(event) => onChange(event.target.value)}
					/>
				</div>
			</div>
		);
	}
}

Menu.propTypes = {
	onChange: React.PropTypes.func.isRequired,
	searchText: React.PropTypes.string
};

export default Menu
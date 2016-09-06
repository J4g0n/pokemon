import React, { Component, PropTypes } from 'react';


class PokemonStats extends Component {
    renderHeader(statsName) {
        return (
            <tr>
                <td key="type"></td>
                {_.map(statsName, statName => <td key={statName}>{statName}</td>)}
            </tr>
        )
    }

    renderStatsRow(rowName, stats) {
        return (
            <tr key={rowName}>
                <td key={rowName}>{rowName}</td>
                {_.map(stats, stat => <td key={stat.id}>{stat.value}</td>)}
            </tr>
        )
    }

    renderPokemonStats(pokemonStats) {
        return this.renderStatsRow(this.props.pokemonName, pokemonStats)
    }

    renderPokemonTypesStats(pokemonTypesStats) {
        return _.map(pokemonTypesStats, pokemonType => this.renderStatsRow(pokemonType.name, pokemonType.stats))
    }

    render() {
        const { pokemonStats, pokemonTypes } = this.props;
        const orderedStats = _.orderBy(pokemonStats, stat => stat.id)
        const orderedPokemonTypes = _.map(pokemonTypes, pokemonType => {
            return Object.assign(pokemonType, {
                stats: _.orderBy(pokemonTypes.stats)
            });
        });
        return (
            <table className="pokemon-stats">
                <thead>
                    {this.renderHeader(orderedStats.map(orderedStat => orderedStat.name))}
                </thead>
                <tbody>
                    {this.renderPokemonStats(pokemonStats)}
                    {this.renderPokemonTypesStats(orderedPokemonTypes)}
                </tbody>
            </table>
        );
    }
}

PokemonStats.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    pokemonStats: PropTypes.array.isRequired,
    pokemonTypes: PropTypes.array.isRequired
};

export default PokemonStats;
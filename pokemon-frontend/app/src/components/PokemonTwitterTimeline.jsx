import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class PokemonTwitterTimeline extends Component {
    constructor(props) {
        super(props);
        this.state = ({ initialized: false });
    }

    componentDidMount() {
        if (this.state.initialized) {
            return;
        }

        /* todo this can't work because widgets has to be generated manually to get a widget id,
         * i could find a hack to do this automatically but i thing this is going to be painfull
         * best idea relies on fetching tweets directly from api
         */
        twttr.widgets.createTimeline(
            {
                 sourceType: "widget",
                 widgetId: "773093869604970496"
            },
            ReactDOM.findDOMNode(this.refs.twittertimeline),
            {
                height: 400
            }
        );

        this.initialized();
    }

    initialized() {
        this.setState({ initialized: true });
    }

    render() {
        const { pokemon, widgetId, chrome, limit } = this.props;
        return (
            <div ref="twittertimeline"/>
        );
    }
}

PokemonTwitterTimeline.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    widgetId: PropTypes.string,
    chrome: PropTypes.string,
    limit: PropTypes.number
};

export default PokemonTwitterTimeline;
/*
<a class="twitter-timeline"
   href="https://twitter.com/hashtag/pikachu"
   data-widget-id="773093869604970496">
        #pikachu Tweets
</a>
<script>
!function(d,s,id){
    var js,
        fjs=d.getElementsByTagName(s)[0],
        p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src=p+"://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }
}
</script>
*/
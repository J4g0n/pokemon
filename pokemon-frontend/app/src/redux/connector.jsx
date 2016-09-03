import React from "react";
import { connect } from 'react-redux';
import { actionHandlers } from './actions.js';

const actionHandlerInjector = (TargetedComponent) => class extends React.Component {
    render() {
        return <TargetedComponent actions={actionHandlers} {...this.props}/>;
    }
};

export const connector = state => TargettedComponent => connect(state)(actionHandlerInjector(TargettedComponent));
// I had to add Redux only in this component due to problems with
// NavigatorIOS. See https://github.com/facebook/react-native/issues/795

'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

import MessageList from './MessageList';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <MessageList
        value={state}
        {...actions}
        dispatch={this.props.dispatch}
        navigator={this.props.navigator} />
    );
  }
}

export default connect(state => ({
    state: state.fetcher.toArray()
  })//,
  // (dispatch) => ({
  //   actions: bindActionCreators(actions, dispatch)
  // })
)(Main);

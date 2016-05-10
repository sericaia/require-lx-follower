'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  Text,
  Linking
} from 'react-native';

import { fetchMessages } from '../actions/actions';
import GithubList from './GithubList';
import MeetupList from './MeetupList';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flexDirection: 'column',
    alignSelf: 'stretch',
  }
});

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var emptyRows = this.ds.cloneWithRows([]);
    this.state = {
      githubList: emptyRows,
      meetupList: emptyRows,
    };
  }

  filterProvider(list, provider) {
    return list.filter((item) => item.provider === provider);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchMessages('github', 'require-lx/community', 5));
    dispatch(fetchMessages('meetup', 'require-lx', 5));
  }

  componentWillReceiveProps(nextProps) {

    //TODO optimize

    var githubList = this.filterProvider(nextProps.value, 'github');
    var meetupList = this.filterProvider(nextProps.value, 'meetup');

    this.setState({
      githubList: this.ds.cloneWithRows(githubList),
      meetupList: this.ds.cloneWithRows(meetupList),
    });
  }

  handleURLClick(url) {

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Require-lx Follower</Text>

        <GithubList
          value={this.state.githubList}
          handleURLClick={this.handleURLClick}
          provider="github"/>
        <MeetupList
          value={this.state.meetupList}
          handleURLClick={this.handleURLClick}
          provider="meetup" />
      </View>
    );
  }
}

MessageList.propTypes = {
  value: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      title: React.PropTypes.string,
      state: React.PropTypes.string,
      updatedAt: React.PropTypes.number
    })
  ),
  fetchMessages: React.PropTypes.func
};

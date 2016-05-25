'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  Linking,
  Image,
  Text
} from 'react-native';

import Swiper from 'react-native-swiper';

import { fetchMessages } from '../actions/actions';
import GithubList from './GithubList';
import MeetupList from './MeetupList';

const styles = StyleSheet.create({
  mainSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  fetchSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginRight: 30
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  thumb: {
    width: 110,
    height: 110,
    overflow: 'visible',
    margin: 5
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
      <Swiper showsButtons={true}>

        <View style={styles.mainSlide}>
          <View style={styles.imagesContainer}>
            <Image
              source={require('./images/require-lx.png')}
              style={styles.thumb}
            />
            <Image
              source={require('./images/nodeschool.png')}
              style={styles.thumb}
            />
          </View>
          <Text>Require-lx Follower</Text>
        </View>

        <View style={styles.fetchSlide}>
          <GithubList
            value={this.state.githubList}
            handleURLClick={this.handleURLClick}
            provider="github"/>
        </View>
        <View style={styles.fetchSlide}>
          <MeetupList
            value={this.state.meetupList}
            handleURLClick={this.handleURLClick}
            provider="meetup" />
        </View>
      </Swiper>
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

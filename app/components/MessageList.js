'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  Text
} from 'react-native';

import { fetchMessages } from '../actions/actions';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  listView: {
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7EDBF',
    margin: 1,
    padding: 5
  },
  listItemTitle: {
    fontSize: 18
  },
  listItemDuration: {
  },
  btnArea: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  }
});

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.value)
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchMessages('require-lx/community'));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.value)
    });
  }

  renderMessage(value) {
    if (!value) {
      return (<Text>Loading data.. </Text>);
    }
    return (
      <View style={styles.listItem} key={value.id}>
        <Text style={styles.listItemTitle}>{value.title}</Text>
        <Text style={styles.listItemDuration}>{value.state}</Text>
        <Text style={styles.listItemDuration}>{value.updatedAt}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Require-lx Follower</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage}
          style={styles.listView}
        />
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
      updatedAt: React.PropTypes.string
    })
  ),
  fetchMessages: React.PropTypes.func
};

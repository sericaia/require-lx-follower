'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  listView: {
  },
  listItem: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: '#F7EDBF',
    margin: 1,
    padding: 5,
    flexWrap: 'wrap'
  },
  listItemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  listItemSubTitle: {
    fontSize: 12
  },
  btnArea: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  thumb: {
    width: 140,
    height: 60,
    overflow: 'visible'
  },
});

export default class GithubList extends Component {
  constructor(props) {
    super(props);

    this.enableEmptySections = true;

    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(value) {
    if (!value) {
      return (<Text>Loading data.. </Text>);
    }

    return (
      <TouchableHighlight
        onPress={() => this.props.handleURLClick(value.url)}>
        <View style={styles.listItem} key={value.id}>

          <Text style={styles.listItemTitle}>{value.title}</Text>
          <Text style={styles.listItemSubTitle}>{value.createdAt} ({value.state})</Text>

        </View>
      </TouchableHighlight>
    );
  }

  render() {

    return (
      <View style={styles.container}>

          <Image
            source={require('./images/github_logo.png')}
            style={styles.thumb}
          />

        <ListView
          dataSource={this.props.value}
          renderRow={this.renderMessage}
          style={styles.listView}
          enableEmptySections={this.enableEmptySections}
        />
      </View>
    );
  }
}

// TODO: adapt to dataSource instead of arrayOf
// GithubList.propTypes = {
//   value: React.PropTypes.arrayOf(
//     React.PropTypes.shape({
//       id: React.PropTypes.number,
//       title: React.PropTypes.string,
//       state: React.PropTypes.string,
//       updatedAt: React.PropTypes.string
//     })
//   )
// };

import React, {
  StyleSheet,
  Component,
  NavigatorIOS
} from 'react-native';

import Main from './Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default class Follower extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Main,
          title: 'Follower'
        }}
      />
    );
  }
}

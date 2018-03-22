/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  MaskedViewIOS,
  Animated
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  children: React.Node,
  isLoaded: boolean,
  imageSource: any,
  backgroundStyle: any,
};

type State = {
  loadingProgress: Animated.Value,
  animationDone: boolean,
};

export default class Loader extends Component<Props,State> {
  static defaultProps = {
    isLoaded: false,
  };

  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isLoaded && !this.props.isLoaded) {
      Animated.timing(this.state.loadingProgress, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          animationDone: true,
        });
      });
    }
  }
  render() {
    const imageScale = {
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 0.8, 70],
          }),
        },
      ],
    };
    return (
        <MaskedViewIOS 
          style={styles.container}
          maskElement={<View style={styles.maskElement}>
                          <Animated.Image
                            style={[styles.maskImageStyle, imageScale]}
                            source={require('./tree.png')}
                          />
                      </View>}
        >
          <View style={styles.background} />
        </MaskedViewIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%'
  },
  maskElement: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
     alignItems: 'center'
  },
  text: {
    fontSize: 60,
    color: 'black',
    fontWeight: 'bold'
  },
  background: {
    backgroundColor: '#324376',
    flex: 1,
    height: '100%'
  },
  maskImageStyle: {
    height: 100,
    width: 100,
  },
});

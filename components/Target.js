import React, { Component,PropTypes } from 'react';
import {StyleSheet,Text,View,Dimensions,TouchableOpacity,Image} from 'react-native';

class Target extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.targetContainer, {
        left: this.props.x,
        top: this.props.y,
        height: this.props.radius * 2,
        width: this.props.radius * 2
      }]}
      />
    );
  }
}

const styles = StyleSheet.create({
  targetContainer: {
    position: 'absolute',
    backgroundColor: '#ff260f',
    borderRadius: 24
  },
});

export default Target;

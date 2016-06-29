import React, { Component,PropTypes } from 'react';
import {StyleSheet,Text,View,Dimensions,TouchableOpacity,Image} from 'react-native';

const LC_WAITING = 0;

class Arrow extends Component {

  constructor(props) {
    super(props);
    this.xIn = null;
    this.yIn = null;
    this.xOut = null;
    this.yOut = null;
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1}
      onPressIn={(e) => {
        if(this.props.lifecycle === LC_WAITING){
          this.xIn = e.nativeEvent.locationX;
          this.yIn = e.nativeEvent.locationY;
          this.initialPageY = e.nativeEvent.pageY;
          this.initialPageX = e.nativeEvent.pageX;
        }
      }}
      onPressOut={(e) => {
        if(this.props.lifecycle === LC_WAITING){
          let dx = e.nativeEvent.pageX - this.initialPageX;
          let dy = e.nativeEvent.pageY - this.initialPageY;

          const angle = Math.atan2(dy, dx) * 180 / Math.PI;

          this.props.onStart(angle-90, dy);

          this.initialPageX = null;
          this.initialPageY = null;
          this.xIn = null;
          this.yIn = null;
          this.xOut = null;
          this.yOut = null;
        }
      }}
      style={[styles.arrowContainer, {
        width: this.props.length,
        height: this.props.length * 1.5,
        left: this.props.x,
        bottom: this.props.y,
      }]}>
      <Image
      renderToHardwareTextureAndroid
      source={require('../img/arrow.png')} style={[{
        width: this.props.length,
        height: this.props.length * 1.5,
        backgroundColor: 'transparent'
      }]}
      />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

export default Arrow;

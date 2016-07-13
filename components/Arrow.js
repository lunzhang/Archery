import React, { Component,PropTypes } from 'react';
import {StyleSheet,Text,View,Dimensions,Image,PanResponder} from 'react-native';

//window dimensions
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
//arrow dimensions
const length = 24;
const BOW_X = WINDOW_WIDTH / 2 - (length / 2);
const BOW_Y = WINDOW_HEIGHT*4/5;
// arrow lifecycle
const LC_WAITING = 0;
const LC_STARTING = 1;

class Arrow extends Component {

  constructor(props) {
    super(props);
    this.state={
      rotate:0,
      x:BOW_X,
      y:BOW_Y
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {

      },
      onPanResponderMove: (e, gestureState) => {
        if(this.props.lifecycle === LC_WAITING){
          let nextState = null;
          nextState = Object.assign({}, this.state);
          this.pull(nextState,gestureState);
          this.rotate(nextState,gestureState.moveX,gestureState.moveY);
          this.setState(nextState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if(this.props.lifecycle === LC_WAITING){
          this.props.onStart(this.state.rotate, gestureState.dy);
        }
      },
    });
  }

  rotate(nextState,x,y){
    let dx = x - BOW_X - this.props.length/2 ;
    let dy = BOW_Y - y;
    let angle = Math.atan2(dx,dy) * 180 / Math.PI;
    nextState.rotate = angle-180;
  }

  pull(nextState,gestureState){
    if(gestureState.dy > 0 && gestureState.dy < 50){
      nextState.y = BOW_Y + gestureState.dy;
    }
  }

  updatePosition(state){
    let nextState = null;
    nextState = Object.assign({}, this.state);
    nextState.x = this.state.x + state.vx;
    nextState.y = this.state.y + state.vy;
    this.setState(nextState);
  }

  restart(){
    this.setState({
      rotate:0,
      x:BOW_X,
      y:BOW_Y
    });
  }

  render() {
    return (
      <View
      {...this.panResponder.panHandlers}
      style={[styles.arrowContainer, {
        width: this.props.length,
        height: this.props.length * 1.5,
        left: this.state.x,
        top: this.state.y,
        transform:[
          {rotate:this.state.rotate + 'deg'}
        ]
      }]}>
      <Image
      renderToHardwareTextureAndroid
      source={require('../img/arrow.png')} style={[{
        width: this.props.length,
        height: this.props.length * 1.5,
        backgroundColor: 'transparent'
      }]}
      />
      </View>
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

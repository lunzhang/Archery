import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Dimensions,AsyncStorage } from 'react-native';
import Arrow from './components/Arrow';
import Target from './components/Target';
import Detail from './components/Detail';

//window dimensions
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
//target dimensions
const TARGET_RADIUS = 24;
const TARGET_Y = WINDOW_HEIGHT/7;
const TARGET_X = (WINDOW_WIDTH / 2) - TARGET_RADIUS;
//arrow dimensions
const length = 24;
const BOW_X = WINDOW_WIDTH / 2 - (length / 2);
const BOW_Y = WINDOW_HEIGHT*4/5;
// arrow lifecycle
const LC_WAITING = 0;
const LC_STARTING = 1;

class Archery extends Component {

  constructor(props){
    super(props);
    this.interval = null;
    this.state = {
      loading:true,
      vx: 0,
      vy: 0,
      lifecycle: LC_WAITING,
      scored: null,
      score: 0
    };
    this.generateWind(this.state);
    AsyncStorage.getItem('highScore',(e,d)=>{
      let nextState = null;
      nextState = Object.assign({}, this.state);
      if(d){
        nextState.highScore=JSON.parse(d).highScore;
      }else{
        nextState.highScore=0;
      }
      nextState.loading=false;
      this.setState(nextState);
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.update.bind(this), 1000/60 );
  }

  update(){
    if (this.state.lifecycle === LC_WAITING) return;

    let nextState = null;
    nextState = Object.assign({}, this.state);
    this.refs.arrow.updatePosition(this.state);
    this.updateVelocity(nextState);

    this.handleCollision(nextState);
    this.handleRestart(nextState);

    this.setState(nextState);
  }

  updateVelocity(nextState){
    nextState.vx += Math.sin(this.state.windAngle * Math.PI / 180) * this.state.windSpeed/1000;
    nextState.vy += Math.cos(this.state.windAngle * Math.PI / 180) * this.state.windSpeed/1000;
  }

  handleCollision(nextState){
    let arrow = this.refs.arrow;
    if (this.state.scored === null) {
      let collisionX = (arrow.state.x + length > TARGET_X && arrow.state.x < TARGET_X + (TARGET_RADIUS*2) );
      let collisionY = (arrow.state.y + length > TARGET_Y && arrow.state.y < TARGET_Y + (TARGET_RADIUS*2) );
      if(collisionX && collisionY){
        nextState.scored = true;
        nextState.score += 1;
        nextState.vx = 0;
        nextState.vy = -10;
        if(nextState.score > nextState.highScore){
          nextState.highScore = nextState.score;
          AsyncStorage.setItem('highScore',JSON.stringify({
            highScore:nextState.highScore
          }));
        }
      }
    }
  }

  handleRestart(nextState) {
    let arrow = this.refs.arrow;
    let outOfScreenX = (arrow.state.x > WINDOW_WIDTH || arrow.state.x < 0 - length * 2);
    let outOfScreenY = (arrow.state.y > WINDOW_HEIGHT || arrow.state.y < 0 - length * 2);
    if (outOfScreenX || outOfScreenY) {
      this.restart(nextState);
    }
  }

  restart(state){
    if(!state.scored){
      state.score = 0;
    }
    state.scored = null;
    state.vy = 6;
    state.vx = 0;
    state.lifecycle = LC_WAITING;
    this.generateWind(state);
    this.refs.arrow.restart();
  }

  onStart(angle,dy) {
    if (this.state.lifecycle === LC_WAITING) {
      if(angle < -90 && angle >= -180){
        angle+=90;
      }else if(angle < -180 && angle >= -270){
        angle=270-angle;
      }else if(angle < -270 && angle >= -360){
        angle=360+angle;
      }
      this.setState({
        vx: angle * .1,
        vy: -dy/10,
        lifecycle: LC_STARTING,
      });
    }
  }

  render() {
    if(this.state.loading){
      return (<View><Text>Loading....</Text></View>);
    }else{
      return (
        <View style={styles.container}>
        <Detail score={this.state.score} highScore={this.state.highScore} windSpeed={this.state.windSpeed} windAngle={this.state.windAngle}/>
        <Target y={TARGET_Y} x={TARGET_X} radius={TARGET_RADIUS} />
        <Arrow ref='arrow' onStart={this.onStart.bind(this)} lifecycle={this.state.lifecycle} length={length} />
        </View>
      );
    }
  }

  generateWind(state){
    state.windSpeed = Math.floor(Math.random()*100);
    state.windAngle = Math.floor(Math.random()*360);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Archery;

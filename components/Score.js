import React, { Component,PropTypes } from 'react';
import{View,Text,StyleSheet,Dimensions} from 'react-native';

class Score extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={[styles.scoreContainer,{ left:10 ,top:0 }]}>
      <Text style={[styles.scoreStyle]}>
      Score : {this.props.score}
      </Text>
      <Text style={[styles.scoreStyle]}>
      High Score : {this.props.highScore}
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreContainer: {
    justifyContent: 'flex-end',
    paddingBottom:36
  },
  scoreStyle:{
    flex: 1,
    fontSize: 24,
    fontWeight: '100',
    color: '#707070'
  }
});

export default Score;

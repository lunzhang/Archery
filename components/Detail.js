import React, { Component,PropTypes } from 'react';
import{View,Text,StyleSheet,Dimensions,Image} from 'react-native';

class Detail extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={[styles.detailContainer,{ left:10 ,top:0 }]}>
        <View style={[styles.detailContained]}>
          <Text style={[styles.detailStyle]}>Score : {this.props.score}</Text>
          <Text style={[styles.detailStyle]}>High Score : {this.props.highScore}</Text>
        </View>
        <View style={[styles.detailContained,{ alignItems: 'center'}]}>
          <Text style={[styles.detailStyle]} >{this.props.windSpeed} </Text>
          <Image renderToHardwareTextureAndroid
          source={require('../img/arrow.png')} style={[{
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          transform: [
            {rotate: this.props.windAngle + 'deg'},
          ]
          }]} resizeMode={'contain'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    justifyContent: 'flex-end',
    paddingBottom:36,
    flexDirection:'row'
  },
  detailContained:{
    flex:.5
  },
  detailStyle:{
    flex: 1,
    fontSize: 24,
    fontWeight: '100',
    color: '#707070'
  }
});

export default Detail;

import React from "react";
import { View ,TouchableOpacity,Image} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


import { Text,Card } from "_atoms";
import {AppStyles,Colors,Mixins} from '_styles'
let { boxShadow} = Mixins

const Label = ({title,cardStyle,image,labelStyle,cross,onPressRight}) => {
  return <View style={cardStyle && cardStyle}>
    <View style={[AppStyles.rowSpaceBetween,]}>
    <Text h6 style={[{color:'rgba(0,0,0,0.9)'},labelStyle && labelStyle]}>
      {title}
    </Text>
    </View>

   </View>
}


export default Label;

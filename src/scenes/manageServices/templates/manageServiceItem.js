// src/components/Product.js
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import {Mixins, Typography, Colors, AppStyles} from '_styles';
let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const ManageServiceItem = ({
  item = {},
  onPress,
  customeStyle,
  isCart,
  onPressEdit,
}) => (
  <Card
    cardStyle={[
      padding(0),
      margin(16, 16, 8, 16),
      boxShadow('black', {height: 1, width: 0}, 1, 0.1),
      {borderRadius: moderateScale(8)},
    ]}>
    {/*******************  Top View  ******************/}
    <View style={styles.topView}>
      <View style={{flex: 0.9}}>
        <Text h6 style={styles.topTitle}>
          {item.name}
        </Text>
        <View style={styles.line}></View>
        <Text p style={styles.datetime}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity
      onPress={()=> onPressEdit && onPressEdit()}
      style={{flex: 0.1}}>
        <SmallIcon
          source={Images.editProfile}
          style={{height: scale(16), width: scale(16)}}
        />
      </TouchableOpacity>
    </View>

    {/*******************  Bottom  View  ******************/}
    <View style={[AppStyles.rowSpaceBetween, styles.bottomView]}>
      <View style={styles.buttonAcceptView}>
        <Text p style={styles.buttonText}>
          Price
        </Text>
      </View>
      <View style={styles.buttonDeclineView}>
        <Text h6 style={[styles.rightbuttonText, {color: Colors.black}]}>
          <Text h6 style={[styles.rightbuttonText, {color: Colors.primary}]}>
            ${item.price}
          </Text>{' '}
          Session
        </Text>
      </View>
    </View>
  </Card>
);
export default ManageServiceItem;

const styles = StyleSheet.create({
  topView: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingLeft: moderateScale(12),
    paddingVertical: moderateScale(12),
    flexDirection: 'row',
  },
  datetime: {color: Colors.lightblack},
  profileText: {color: Colors.black},
  bottomView: {
    paddingHorizontal: moderateScale(8),
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(4),
  },
  topTitle: {color: 'rgba(0,0,0,0.75)', fontSize: Typography.normalize(16)},
  buttonText: {
    color: Colors.textColor,
    fontSize: Typography.normalize(13),
  },
  line: {
    height: 1,
    width: scale(55),
    marginBottom: moderateScale(5),
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  rightbuttonText: {
    color: Colors.textColor,
    fontSize: Typography.normalize(13),
  },
});

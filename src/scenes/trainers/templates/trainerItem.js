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

const TrainerItem = ({
  item = {},
  onPress,
  customeStyle,
  isAssignTrainer = false,
  isSelectTrainer = false,
  deletAction,
  leftImageView,
  onSelectTrainer,
}) => (
  <Card cardStyle={[styles.cardStyle]}>
    {/*******************  Request Profile View  ******************/}
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[
        AppStyles.row,
        {
          paddingVertical: verticalScale(8),
          paddingHorizontal: moderateScale(8),
        },
      ]}>
      <View
        style={[
          {
            flex: item.isSelect ? 0.35 : isAssignTrainer ? 0.3 : 0.35,
            height: scale(65),
            width: scale(65),
          },
        ]}>
        {item.profileImage ? (
          <Image
            source={{uri: item.profileImage}}
            style={styles.profileStyle}
          />
        ) : (
          <SmallIcon source={Images.notfound2} style={styles.profileStyle} />
        )}
      </View>
      <View style={[styles.leftSection]}>
        <Text
          h6
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(18),
            },
          ]}>
          {item.name}
        </Text>

        {!isSelectTrainer && (
          <View style={AppStyles.row}>
            <SmallIcon source={Images.address1} style={styles.imageStyle} />
            <Text p style={[styles.profileText, {paddingLeft: 4}]}>
              {item.address},
            </Text>
          </View>
        )}

        <View style={[AppStyles.column, {paddingTop: 2}]}>
          {item.skills && item.skills.length > 0 ? (
            <Text p style={[styles.profileText, {color: Colors.black}]}>
              {item.skills.toString()}
            </Text>
          ) : null}
        </View>
      </View>

      {/******* Delete**********/}
      {!isSelectTrainer && (
        <TouchableOpacity
          onPress={() => deletAction && deletAction()}
          style={styles.rightStatus}>
          <SmallIcon source={Images.delete} style={styles.deleteImageStyle} />
        </TouchableOpacity>
      )}
      {/******* Check Assign Icon  **********/}
      {isAssignTrainer && item.isSelect && (
        <View style={styles.rightStatus}>
          <SmallIcon source={Images.listtick} style={styles.deleteImageStyle} />
        </View>
      )}
    </TouchableOpacity>
  </Card>
);
export default TrainerItem;
const styles = StyleSheet.create({
  cardStyle: {
    ...padding(0),
    ...margin(16, 16, 8, 16),
    ...boxShadow('black', {height: 1, width: 0}, 1, 0.1),
    borderRadius: 16,
  },
  profileText: {
    color: Colors.lightblack,
    fontSize: Typography.normalize(12),
  },
  profileStyle: {height: scale(65), width: scale(65), borderRadius: 8},
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  deleteImageStyle: {height: moderateScale(16), width: moderateScale(16)},
  leftSection: {
    flex: 0.8,
    justifyContent: 'flex-start',
  },
  rightStatus: {
    flex: 0.2,
    paddingVertical: moderateScale(4),
  },
});

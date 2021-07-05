import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Share,
  AppStylesheet,
} from 'react-native';
import {Text, Button, Header, Card, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {InvitationLink} from '../templates';

import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin} = Mixins;

// Component
const textMessage = `I love the BeeTrainer Pro. Use this link to Sign Up:`
const ReferFriend = ({navigation}) => {
const [shareMessage,setShareMessage] =useState(
    ` ${textMessage} https://play.google.com/store/apps/details?id=com.beetrainer.pro`)
/****************************** Main function  **************************/
   const inviteSend = async () => {
        try {
          const result = await Share.share({
            message: shareMessage,
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
/****************************** Render function *************************/

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburger}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0), padding(0)]}
        title={'Invite / Refer a Friend'}
        textStyle={{textAlign: 'center'}}
      />

      <ScrollView
        contentContainerStyle={[padding(16, 16, 0, 16)]}
        keyboardShouldPersistTaps={'never'}
        style={{backgroundColor: Colors.white}}>
        <View
          style={[
            {
              marginTop: moderateScale(32),
              flex: 1,
            },
          ]}>
          {/**************** Image View  *******************/}
          <View style={AppStyles.imageViewStyle}>
            <Image
              source={Images.refer}
              style={AppStyles.imageStyle}
              resizeMode={'contain'}
            />
          </View>
          {/**************** Heading View  *******************/}
          <View style={AppStyles.headingView}>
            <Text p style={AppStyles.textHeading}>
              Refer Now{' '}
            </Text>
          </View>
          <View
            style={[
              AppStyles.subView,
              {
                paddingHorizontal: moderateScale(24),
              },
            ]}>
            <Text
              p
              style={[
                AppStyles.text,
                {
                  fontSize: Typography.normalize(14),
                  textAlign:'center'
                },
              ]}>
              At Bee Trainer we are always looking for new customer just like
              You!
            </Text>
          </View>
        </View>

        {/**************** Link Text *******************/}
        <View
          style={[
            AppStyles.subView,
            {justifyContent: 'center', flex: 0.2, marginTop: moderateScale(32)},
          ]}>
          <Text
            h6
            style={[
              AppStyles.contactText,
              {
                fontSize: Typography.normalize(14),
                color: Colors.primary,
              },
            ]}>
            Please share the link below with your friend{' '}
          </Text>
        </View>

        {/****************   Invitation  Link  *******************/}
        <View
          style={[
            AppStyles.subView,
            {flex: 0.2, marginTop: moderateScale(32)},
          ]}>
          <Text p style={AppStyles.contactText}>
            Tap on invitation link to copy
          </Text>
        </View>
        <InvitationLink />

        {/**************** Invitation  Friend Button  *******************/}
        <View
          style={{
            justifyContent: 'center',
            marginVertical: moderateScale(48),
            paddingHorizontal: moderateScale(8),
            flex: 1,
          }}>
          <Button onPress={() => inviteSend()} title={'Invite Friend'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferFriend;

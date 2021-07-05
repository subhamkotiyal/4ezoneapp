import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button, Header, Card, SmallIcon } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin } = Mixins

export default  InvitaionLink = ({}) => {
    return <View style={[{ flex: 1, paddingHorizontal: moderateScale(24) }]}>
        <Card cardStyle={[padding(12, 16, 8, 16),
        margin(4, 0, 4, 0),
        boxShadow('black', { height: 1, width: 0 }, 0.2, 0.05),
        {
            justifyContent: 'center', 
            borderRadius: moderateScale(4),
            flex: 0.1,
            backgroundColor: '#F3EFEE',
        }]}>
            <Text p style={{
                color: Colors.lightBlue,
                fontSize: Typography.normalize(14)
            }}>Bee Trainer: Use my referral link</Text>
            <Text p style={{
                color: Colors.lightBlue,
                fontSize: Typography.normalize(14)
            }}>Sign up: https://play.google.com/store/apps/details?id=com.beetrainer.pro
            </Text>
        </Card>
    </View>
}
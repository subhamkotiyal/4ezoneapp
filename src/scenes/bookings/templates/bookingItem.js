// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import moment from 'moment'
import { Images ,Methods} from '_utils'
const {capitalize} = Methods
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const BookingItem = ({ item = {}, onPress, customeStyle, isCart, onPressSelect }) => {
    let address 
    if(item.additionalInfo){
     let infoAddress=   item.additionalInfo.split(',')
     address=infoAddress.length >1 ? infoAddress[2] :''
    }
    return <Card cardStyle={[padding(0),
    margin(16, 16, 8, 16),
    boxShadow('black', { height: 2, width: 0 }, 2, 0.4), { borderRadius: 8 }]}>

    {/*******************  Request Profile View  ******************/}
        <TouchableOpacity
        onPress={()=> onPress && onPress()}
        style={[AppStyles.row,{paddingBottom:8}]}>
            <View style={[styles.leftSection]}>
                <Text h6 style={[styles.profileText, {
                    fontSize: Typography.normalize(20),
                    textTransform:'capitalize'
                }]}>{item && item.gymId ? item.gymId.name :''}
                {item.trainerId ? item.trainerId.name :''}</Text>
                <View style={[AppStyles.row,{paddingTop:2}]}>
                    <SmallIcon source={Images.address2}
                        style={styles.imageStyle} />
                    <Text p style={[styles.profileText, { paddingLeft: 8 }]}>{address}</Text>
                </View>
                <View style={[AppStyles.row,{paddingTop:2}]}>
                    <SmallIcon source={Images.calender}
                        style={styles.imageStyle} />
                    <Text p style={[styles.profileText, { paddingLeft: 8 }]}>{`${moment(item.serviceDate).format('L')} | ${item.serviceTime}`}</Text>
                </View>
            </View>
            {/******* Accept/Complted Status  **********/}
            <View style={styles.rightStatus}>
                <Text h6 style={[styles.profileText, {
                }]}>{item.bookingStatus}</Text>
            </View>
        </TouchableOpacity>
    </Card>
}
export default BookingItem;

const styles = StyleSheet.create({
    datetime: { color: Colors.white, alignSelf: 'center' },
    profileText: {
        color: Colors.lightblack,
        fontSize: Typography.normalize(12),
        // lineHeight: 20,
    },
    imageStyle: { height: moderateScale(12), width: moderateScale(12) },
    leftSection: {
        paddingHorizontal: moderateScale(16),
        flex: 1,
        paddingTop: moderateScale(8),
        justifyContent: 'center'
    },
    rightStatus: {
        height: moderateScale(24), backgroundColor: Colors.primary2,
        borderTopEndRadius: 8,
        borderBottomLeftRadius: 8,
        paddingTop: moderateScale(2),
        paddingHorizontal: 8, justifyContent: 'center'
    }
})

// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const Invoice = ({ item = {},setOpenTaxModal }) => (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(4) }}>
   
        <View style={AppStyles.invoiceContainer}>
            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                <Text p style={AppStyles.textSmall}>{'Amount'}</Text>
            </View>
            <View style={AppStyles.invoiceRightView}>
                <Text p style={AppStyles.textSmall}>{`$${item.account}`}</Text>
            </View>
        </View>
        <View style={AppStyles.invoiceContainer}>
            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                <Text p style={AppStyles.textSmall}>{'Trainer Fee'}</Text>
            </View>
            <View style={AppStyles.invoiceRightView}>
                <Text p style={AppStyles.textSmall}>{`$${item.trainerFee}`}</Text>
            </View>
        </View>

        <View style={AppStyles.invoiceContainer}>
            <View style={[AppStyles.row, {
                flex: 0.5,
            }]}>
                <Text p style={AppStyles.textSmall}>{'Tax'}</Text>
                <TouchableOpacity 
                onPress={()=> setOpenTaxModal && setOpenTaxModal(true)}
                style={{ paddingHorizontal: moderateScale(4) }}>
                    <Image source={Images.info} style={AppStyles.infoImage} />
                </TouchableOpacity>
            </View>
            <View style={AppStyles.invoiceRightView}>
                <Text p style={AppStyles.textSmall}>{`$${item.tax}`}</Text>
            </View>
        </View>
        {/*********** Promo Code  *************/}

        {item.promoCodeCost ? <View style={AppStyles.invoiceContainer}>
            <View style={[AppStyles.row, {
                flex: 0.5,
            }]}>
                <Text p style={AppStyles.textSmall}>{'Promo'}</Text>
            </View>
            <View style={AppStyles.invoiceRightView}>
                <Text p style={[AppStyles.textSmall,{
                    color:Colors.primary
                }]}>{`- $${item.promoCodeCost}`}</Text>
            </View>
        </View> : null}
        {/*********** Total Amount  *************/}

        <Line lineColor={'rgba(0,0,0,0.1)'} />
        <View style={{ height: verticalScale(4) }} />

        <View style={AppStyles.invoiceContainer}>
            <View style={{ flex: 0.5, justifyContent: 'center' }}>
                <Text h6 style={[AppStyles.textSmall, { color: Colors.black }]}>{'Total Amount'}</Text>
            </View>
            <View style={AppStyles.invoiceRightView}>
                <Text h6 style={[AppStyles.textSmall, { color: Colors.black }]}>{`$${item.totalAccount}`}</Text>
            </View>
        </View>
    </View>
);
export default Invoice;

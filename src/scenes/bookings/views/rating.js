import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Label, TextInput, Card, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Line, CustomeRating } from '_molecules'
import { Images } from '_utils'
import { useDispatch, useSelector } from "react-redux";
import { Validation, Methods } from '_utils'
import {
    ratingRequest
} from '../../../store/modules/dispute/actions'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin, windowHeight } = Mixins
import Config, { SUCCESS } from '_utils/constants/apiConstant';

// Component 
const Rating = ({ navigation, route }) => {
    const { itemDetail } = route.params
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(1)
    const dispatch = useDispatch()

    /****************************** Validation *************************************/
    const ValidationRules = () => {
        return [
            {
                field: comment,
                name: 'comment',
                rules: 'required|no_space',
                lang: 'en',
            },
        ];

    };
    /****************************** API Function *************************************/
    const pressButton = () => {
        let validation = Validation.validate(ValidationRules());
        let { showToast } = Methods
        if (validation.length != 0) {
            showToast(validation[0].message, 'danger')
        } else {
            let data = {}
            data['bookingId'] = itemDetail._id
            data['comment'] = comment
            let apiName 
            if(itemDetail.trainerId){
                apiName = Config.feedbackByCustomerToTrainer
                data['trainerRating'] = rating
            }else{
                apiName = Config.feedbackByCustomerToGym
                data['gymRating'] = rating
            }
            dispatch(ratingRequest(apiName,data, navigation))
        }
    }

    /****************************** Render Child Component  **************************/
    const RenderButton = ({ title, backgroundColor, color }) => {
        return <View style={{
            justifyContent: 'center',
            flex: 1,
            marginHorizontal: moderateScale(24),

        }}>
            <Button onPress={() => pressButton()}
                buttonStyle={{
                    borderRadius: moderateScale(42 / 2),
                    height: moderateScale(42),
                    backgroundColor: backgroundColor ? backgroundColor : Colors.primary2
                }}
                buttonTextStyle={[{ fontWeight: 'bold', color: color ? color : Colors.white }]}
                title={title} />
        </View>
    }
    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
        <Header
            leftText
            image={Images.back}
            onPressLeft={() => navigation.goBack()}
            style={[boxShadow('trasparent', {}, 0), padding(0)]}
            textStyle={{ textAlign: 'center' }}
        />
        <ScrollView contentContainerStyle={[padding(16, 24, 8, 24),]}
            keyboardShouldPersistTaps={'never'}
            style={{ backgroundColor: Colors.white }}>
            <View style={{ height: verticalScale(48) }} />

            {/************************* Rating Card  ***************************/}
            <Card cardStyle={[padding(16, 0),
            margin(8, 0, 8, 0),
            boxShadow('black', { height: 1, width: 0 }, 6, 0.1),
            {
                borderRadius: moderateScale(8),
                backgroundColor: 'white'
            }]}>
                <View style={AppStyles.thankyouRating}>
                    <Text p style={[AppStyles.text18]}>Thank you for rating</Text>
                </View>
                <Line lineColor={'rgba(0,0,0,0.1)'} />
                <View style={{ height: verticalScale(16) }} />


                <View style={{ flex: 0.5, paddingTop: moderateScale(16) }}>

                    {/*************** Total Amount*******************/}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Label title={'Total'}
                            labelStyle={{
                                color: Colors.black,
                                fontSize: Typography.normalize(20)
                            }}
                        />
                        <View style={{ height: verticalScale(8) }} />
                        <Label title={`$${itemDetail.totalAccount}`} labelStyle={{
                            color: Colors.primary2,
                            fontSize: Typography.normalize(24)
                        }} />

                        <View style={{ height: verticalScale(12) }} />
                        <CustomeRating
                            imageSize={28}
                            defaultRating={rating}
                            onRatingPress={rating => setRating(rating)}
                        />
                    </View>

                    <View style={{ height: verticalScale(24) }} />

                    {/*************** Comment Input *******************/}
                    <TextInput
                        label={''}
                        placeholder={'Additional commet'}
                        placeholderTextColor="rgba(62,62,62,0.2)"
                        returnKeyType="next"
                        keyboardType="default"
                        autoCorrect={false}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        multiline
                        value={comment}
                        textInputStyle={{
                            height: windowHeight / 10,
                            paddingTop:16

                        }}
                        viewTextStyle={AppStyles.viewRatingTextStyle}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => setComment(text)}
                    />
                </View>
                <View style={{ height: verticalScale(32) }} />
                <RenderButton title={'Submit'} />
                <View style={{ height: verticalScale(16) }} />

            </Card>

        </ScrollView>

    </View>
}

export default Rating;
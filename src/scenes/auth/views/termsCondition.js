import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Line} from '_molecules';

import {Text, Button, Header, Label, Card, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {WebView} from 'react-native-webview';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin, windowHeight} = Mixins;

// Component
const TermsCondition = ({navigation}) => {
  const [isToggle, setToggle] = useState(false);
  const [data, setData] = useState('');
  const [isTerms, onSelectTerm] = useState(false);

  useEffect(() => {
    getTermsAndCondtions();
  }, []);
  /****************************** API Function *************************************/

  const getTermsAndCondtions = async () => {
    let apiName;
    apiName = `${Config.termsandconditions}`;
    const response = await Request.get(apiName);
    debugger;
    if (response) {
      setData(response);
    }
  };
  {
    /************************** Main View  ******************************************************/
  }

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0), padding(0)]}
        title={'Terms And Condtion'}
        textStyle={{textAlign: 'center'}}
      />
      {/**************************************** FAQ View  ***********************************************************/}
        <View style={styles.gridViewBackground}>
          <View
            style={{
              width: '100%',
              flex: 1,
              overflow: 'hidden',
              marginBottom: 100,
              backgroundColor: 'white',
            }}>
            {data ? (
              <WebView
                originWhitelist={['*']}
                source={{html: `${data}`}}
                startInLoadingState={true}
                containerStyle={{paddingHorizontal: 24}}
                renderLoading={() => (
                  <ActivityIndicator size={'large'} color={Colors.primary} />
                )}
                style={{width: '100%', height: '100%'}}
              />
            ) : null}
          </View>
        </View>
      {/**************************************** Bottom View  ***********************************************************/}

      <View style={styles.arrowTile}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingTop:12
          }}>
          <TouchableOpacity
            onPress={() => onSelectTerm(!isTerms)}
            style={{paddingRight: 8}}>
            <Ionicons
              name={isTerms ? 'ios-checkbox' : 'ios-checkbox-outline'}
              size={18}
              color={Colors.black}
            />
          </TouchableOpacity>
          <Text p style={styles.text}>
            You have completed your registration successfully.Waiting for
            Admin`s Approval Once it will be approved you can login
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SupportMessage')}
          style={{
            width: '80%',
            height: 45,
            marginTop: moderateScale(16),
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
            borderRadius: 27,
            backgroundColor: Colors.primary2,
          }}>
          <Text style={styles.title}> {'Register Now'} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsCondition;
const styles = StyleSheet.create({
  gridViewBackground: {
    flex: 1,
    marginTop: 20,
    marginBottom: 0,
    borderColor: 'white',
    borderWidth: 0.0,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
    paddingTop: 4,
    fontSize: Typography.normalize(18),
  },
  text: {
    fontSize: Typography.normalize(12),
    // color: '#A8A8A8',
  },
  arrowTile: {
    flex: 0.22,
    left: 0,
    bottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderColor: Colors.borderColor,
  },
});

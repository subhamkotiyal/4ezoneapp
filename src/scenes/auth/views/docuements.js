import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Platform,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import ImageChooser from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logoutRequest} from '../../../store/modules/login/actions';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import Config, { SUCCESS } from '_utils/constants/apiConstant';

import {
  documentAddRequest,
  documentUpdateRequest
} from '../../../store/modules/documents/actions'
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {Text, Button, Header} from '_atoms';
import {moderateScale} from 'react-native-size-matters';
const {boxShadow} = Mixins;
export default Document = ({navigation, route}) => {
  console.log(route,"routerouteroute")
  const dispatch = useDispatch();
  const [state, setState] = useState({
    licenceNumber: '',
    expDate: '',
    dlImage: '',
    role: route.params?.role ?? '',
    driverDocs: [],
  });
  const [allDocs, setDocs] = useState([
    {
      name: 'Upload Document',
      type: 'document',
      labelName: 'Number*',
      labelExp: 'Exp Date*',
      _id: '1',
    },
    {
      name: 'Upload License',
      type: 'licenceDetails',
      labelName: 'License Number',
      labelExp: 'License Exp Date*',
      _id: '2',
    },
  ]);
  useEffect(() => {}, []);

  /****************************** Api function *************************************/
  const pressButton = () => {
    let result = allDocs.every(function(e) {
      return e.status === true;
    });
    if (result) {
      let fromatArray = allDocs.map((doc,i)=>{
          return addDoc(doc.data,i+1)
      })
    }
  };
  const addDoc = ({number,date,type,image},i) =>{
      let formData = new FormData()
      formData.append('number',number)
      formData.append('date',date)
      formData.append('type',type)
      formData.append('image',image)
      let {role} = state
      let apiName
      debugger
      if(role == 'gym'){ 
        apiName = Config.addGymdoc
      }else if(role == 'trainer'){
        apiName = Config.addTrainerdoc
      }
    dispatch(documentAddRequest(apiName,formData,navigation,(cb)=>{
      if(allDocs.length == i){
        navigation.navigate('Thankyou');
      }
    }))
  }
  /****************************** Main function *************************************/

  /***********************Upload license ****************/

  // updateData
  const updateData = (item, data) => {
    let docarray = [...allDocs];
    let newArray = docarray.map((x, i) => {
      if (x._id == item._id) {
        return {
          ...x,
          status: true,
          data: data,
        };
      } else {
        return {
          ...x,
        };
      }
    });
    setDocs(newArray);
  };

  const uploadDocuments = item => {
    navigation.navigate('AddDocument', {
      item: {...item, role: state.role, mode: 'add'},
      updateData: (item, source) => updateData(item, source),
    });
  };

  const updateDocument = (data, item) => {
    navigation.navigate('AddDocument', {
      item: {...item, mode: 'update', ...data, role: state.role},
      updateData: (item, source) => updateData(item, source),
    });
  };

  /****************************** Render function *************************************/
  const Item = item => {
    return item.status == true ? (
      <View style={styles.loadDetail}>
        <View style={styles.txtViewbg}>
          <View style={{width: '50%'}}>
            <Text h6 style={styles.txtHeading}>
              {item.labelName}
            </Text>
            <Text style={styles.txtValue}>{item.data.number}</Text>
            <TouchableOpacity
              onPress={() => updateDocument(item.data, item)}
              style={styles.listItem}>
              <Text style={styles.updateBtn}>{'Update'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%'}}>
            <Text style={styles.txtHeading}>{'Exp Date'}</Text>
            <Text style={styles.txtValue}>{item.data.date}</Text>
          </View>
        </View>
        <View style={styles.imageBG}>
          {item.data.image == '' ||
          item.data.image == null ||
          item.data.image == 'null' ? (
            <Image
              resizeMode="cover"
              style={styles.docImage}
              source={Images.noImage}
            />
          ) : (
            <Image
              resizeMode="cover"
              style={styles.docImage}
              source={{uri: item.data.image.uri}}
            />
          )}
        </View>
      </View>
    ) : (
      <View style={styles.loadDetail}>
        <View style={styles.txtViewbgNew}>
          <View style={{width: '30%'}}>
            <TouchableOpacity
              onPress={() => uploadDocuments(item)}
              style={styles.addBtn}>
              <Image
                resizeMode="contain"
                style={styles.renderItemUploadImage}
                source={Images.addOption}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '70%'}}>
            <Text h5 style={styles.txtHeadingNew}>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={styles.imageBG}>
          <Image
            resizeMode="cover"
            style={styles.docImage}
            source={Images.noImage}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
      leftText
        style={[boxShadow('trasparent', {}, 0), {paddingHorizontal: 0}]}
        title={'Upload Document'}
        textStyle={{textAlign: 'center'}}
      />
      <View style={styles.gridViewBackground}>
        <FlatList
          data={allDocs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => Item(item)}
          keyExtractor={item => item._id}
        />
      </View>
      <BottomAbsoluteButton image={Images.next} onPress={() => pressButton()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    borderRadius: wp('3.33%'),
    width: '80%',
    height: wp('6.66%'),
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBtn: {
    color: 'white',
    paddingTop: 4,
    fontSize: wp('4%'),
  },
  addBtn: {
    backgroundColor: 'white',
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp('5.33%'),
    color: 'white',
  },
  renderItemUploadImage: {
    width: '65%',
    height: '65%',
    backgroundColor: 'transparent',
  },
  gridViewBackground: {
    flex: 1,
    marginTop: 0,
    marginBottom: Platform.OS === 'ios' ? 20 : 40,
    borderColor: 'black',
    borderWidth: 0.0,
    paddingHorizontal: moderateScale(12),
    backgroundColor: 'white',
  },

  loadDetail: {
    width: 'auto',
    height:wp('35%'),
    paddingVertical:2,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    elevation: 1,
    marginVertical: 2,
    // marginHorizontal: 15,
    marginTop: 0,
    flexDirection: 'row',
  },

  txtHeading: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: Typography.normalize(12),
    color: 'black',
  },
  txtHeadingNew: {
    // marginLeft: 10,
    // marginTop: 10,
    fontSize: Typography.normalize(16),
    color: 'black',
  },
  txtValue: {
    marginLeft: 10,
    fontSize: wp('4%'),
    color: 'gray',
  },

  txtViewbg: {
    height: '100%',
    width: '70%',
    justifyContent: 'space-between',
    // paddingVertical: 10,
    flexDirection: 'row',
  },
  txtViewbgNew: {
    height: '100%',
    width: '70%',
    justifyContent: 'space-between',
    // paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBG: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  docImage: {
    width: '90%',
    height: '70%',
  },
});

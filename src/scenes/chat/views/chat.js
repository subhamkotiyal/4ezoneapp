import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";

import KeyboardManager from 'react-native-keyboard-manager';
import {useDispatch, useSelector} from 'react-redux';
import {Request} from '_services';
import {WSService} from '_utils'
import {
  showToast,
} from '_utils/methods';
import {GiftedChat} from 'react-native-gifted-chat';
import {Text, Header} from '_atoms';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {Images} from '_utils';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from '../templates/inputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from '../templates/messageContainer';
let {padding, boxShadow, margin} = Mixins;

const Chats = ({navigation,route}) => {
/****************************** State/Hooks Function *************************************/
const netInfo = useNetInfo()
 
const {user} = useSelector(state => ({
    user: state.loginReducer.loginData,
  }));
  useEffect(() => {
   // setMessages(initialMessages.reverse());
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(false);
      KeyboardManager.setEnableAutoToolbar(false);
    }
    getAllMessagesFromChatRoom()
  }, []);
  useEffect(() => {
      messageReceiveFromServer()
      return () => {
        WSService.removeListener('newMessage')
      }
  }, []);
/****************************** State Function *************************************/
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [item, setItemDetail] = useState({...route.params.itemDetail});

  /****************************** Socket Api Function *************************************/
    const onSend = (messages = []) => {
      if (!messages[0].text || /^\s+$/.test(messages[0].text)) {
        return false;
      }
      if(netInfo.isConnected){
      try {
      let d = new Date();
      let messageId = Math.floor(Math.random() * d.getTime()) + 1;
      messages[0]["_id"] = messageId;
      messages[0]["messageType"] = 'TEXT';
      emitMessageOnSubmit(messages);
      let receiveMessage = {};
      receiveMessage._id = messages[0]._id;
      receiveMessage.createdAt = messages[0].createdAt;
      receiveMessage.text = messages[0].text,
      receiveMessage.user = messages[0].user;
      setMessages(prevMessages => GiftedChat.append(prevMessages, receiveMessage));
    } catch (send_msg_err) {
      console.log("error sending message: ", send_msg_err);
    }
  }else{
      showToast('Please check your internet connection','danger')
    }
    
    
  };
//Emit Message on submit
 const emitMessageOnSubmit = async messages => {
      let data = {};
      let eventName
    data["_id"] = messages[0]._id;
    data["msg"] = messages[0].text;
    if(user.role =='trainer'){
      data["trainerId"] = user._id;
      data["customerId"] =item.customerId._id;
      data["byCustomer"] = false
      data["byTrainer"] =true
      eventName ='sendMessageTrainer'
    }
    if(user.role =='gym'){
      data["gymId"] = user._id;
      data["customerId"] =item.customerId._id;
      data["byCustomer"] = false
      data["byGym"] =true
      eventName ='sendMessageGym'
    }
    WSService.sendMessage(eventName, data, (res) => {
      console.log('Message send successsfuuly',res)
    })
  };
  // Message recive from server
 const  messageReceiveFromServer = () => {
  WSService.messageFromServer('newMessage', response => {
   debugger
    console.log(response,"newmessage response")
    if (response.byCustomer ){
      let receiveMessage = {};
      receiveMessage._id = response._id;
      receiveMessage.createdAt = response.createdAt;
      receiveMessage.user = {
        _id:response.customerId,
      };
      receiveMessage.text = response.msg;
      if (response.messageType == 'IMAGE') {
        receiveMessage.image = response.imageUrl.thumbnail;
      }
      setMessages(prevMessages =>
        GiftedChat.append(prevMessages, receiveMessage),
      );
    }
  })
}
  // Get chat message in format
  const getChatDataInFormat = (messages) => {
    return messages.map((message, index) => {
      return getMessage(message)
    }).reverse()
  }
 const getMessage =  (message) => {
    const msg_data = {
      _id: message._id,
      createdAt: message.createdAt,
      text: message.msg,
      user: {
        _id: message.byCustomer
          ? message.customerId ?message.customerId._id :'' 
          : message.trainerId? message.trainerId._id
          : message.gymId ? message.gymId._id :'',
        avatar:
          message.byCustomer? message.customerId && message.customerId.profileImage && message.customerId.profileImage != 'null'  ? message.customerId.profileImage :Images.dummyuser
          : message.trainerId
          ? message.trainerId && message.trainerId.profileImage && message.trainerId.profileImage != 'null'  ?  message.trainerId.profileImage :Images.dummyuser
          : message.gymId && message.gymId.profileImage && message.gymId.profileImage != 'null' ?  message.gymId.profileImage :Images.dummyuser,
          name:
          message.byCustomer? message.customerId && message.customerId.name ?  message.customerId.name :''
          : message.trainerId
          ?message.trainerId && message.trainerId.name  ?  message.trainerId.name :'No Name'
          : message.gymId && message.gymId.name ?  message.gymId.name :'No Name'
      },
    
    };
    if (message && message.messageType == 'VIDEO') {
      Object.assign(msg_data, { video: message.videoUrl.thumbnail });
    }
    if (message && message.messageType == 'IMAGE') {
       Object.assign(msg_data, { image: message.imageUrl.thumbnail });
    }
    console.log(msg_data,"msg_data")
    return msg_data
  }
  // Get All MEssage From Chat Room
  const getAllMessagesFromChatRoom = async () => {
    debugger
      //payload
      if(route.params && route.params.itemDetail){
        let {itemDetail}  = route.params
        let data;
        let apiName;
        if (user && user.role == 'trainer') {
          data = {
            customerId: itemDetail.customerId,
          };
          apiName = Config.trainerChatHistory;
        } else {
          data = {
            customerId: itemDetail.customerId,
          };
          apiName = Config.gymChatHistory;
        }
        try {
          let chatHistory = await Request.post(apiName, data);
          if (chatHistory.status === SUCCESS) {
            if(chatHistory.data.length>0){
              let newMessages = getChatDataInFormat(chatHistory.data);
              setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
            }
          }
        } catch (err) {
          console.log(err.message, 'Error in get chat history');
        }
      }else{
        console.log( 'route error');
      }
      
  };
  /****************************** Render Chat Function *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: '#FCFCFC'}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[
          boxShadow('trasparent', {}, 0),
          padding(0),
          {backgroundColor: '#FCFCFC'},
        ]}
        title={'Chat'}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{flex: 1}}
        accessible
        accessibilityLabel="main"
        testID="main">
        <GiftedChat
          messages={messages}
          text={text}
          maxComposerHeight={44}
          onInputTextChanged={setText}
          onSend={onSend}
          user={{
            _id: user._id,
            name: user.name,
            avatar:
              user && user.profileImage != 'null'
                ? user.profileImage
                : Images.dummyuser
          }}
          alignTop
          isKeyboardInternallyHandled={false}
          alwaysShowSend
          scrollToBottom
          renderAvatarOnTop
          showUserAvatar
          renderUsernameOnMessage
          bottomOffset={0}
          maxComposerHeight={44}
          onPressAvatar={console.log}
          renderInputToolbar={renderInputToolbar}
          // renderActions={renderActions}
          renderComposer={renderComposer}
          renderSend={renderSend}
          renderAvatar={renderAvatar}
          renderBubble={renderBubble}
          // renderSystemMessage={renderSystemMessage}
          renderMessage={renderMessage}
          renderMessageText={renderMessageText}
          // renderMessageImage
          // renderCustomView={renderCustomView}
          isCustomViewBottom
          // messagesContainerStyle={{ backgroundColor: 'indigo' }}
          parsePatterns={linkStyle => [
            {
              pattern: /#(\w+)/,
              style: linkStyle,
              onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
            },
          ]}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={110}
          enabled={Platform.OS === 'ios' ? true : false}
        />
      </View>
    </View>
  );
};

export default Chats;

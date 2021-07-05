/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
// import notifee from '@notifee/react-native';

import 'react-native-gesture-handler';
// import messaging from '@react-native-firebase/messaging';

// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   const channelId = await notifee.createChannel({
//     id: "default",
//     name: "Default Channel"
//     });
//   notifee.displayNotification({
//     title: remoteMessage.notification.title,
//     body: remoteMessage.notification.body,
//     android: {
//       channelId: channelId,
//     },
//   });
//  });
AppRegistry.registerComponent(appName, () => App);


import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';
import * as Permissions from 'expo-permissions';

export default function useTakePhoto() {
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "You've denied camera access please go to settings to allow it!",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      // aspect: [1, 1],
      // base64: true,
    });

    if (!result.cancelled) {
      return result.uri;
    }
  };
  return {takePhoto};
}

import * as ImagePicker from 'expo-image-picker';

export default function usePickImage() {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.cancelled) {
      return result.uri;
    }
  };
  return {pickImage};
}

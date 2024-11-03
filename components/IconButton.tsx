import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};
const IconButton = ({ icon, label, onPress }: Props) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <MaterialIcons name={icon} size={24} color="#fff" />
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

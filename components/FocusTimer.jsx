import { View, Text } from "react-native";
import React from "react";

const FocusTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState();
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {});
  return (
    <View>
      <Text>FocusTimer</Text>
    </View>
  );
};

export default FocusTimer;

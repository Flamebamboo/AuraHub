import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CustomSvg } from '../../components/CustomSvg';
const CreateSession = () => {
  return (
    <View style={styles.container}>
      <BottomSheet
        index={1}
        snapPoints={['90%']}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Pressable>
            <CustomSvg height={32} width={32} variant="profileIcon" />
          </Pressable>

          <Text className="font-ReadexPro font-medium text-2xl text-white flex-1 mt-3">
            Start <Text className="font-bold">Focus Session</Text>
          </Text>
          <View>
            <Text style={styles.textContent}>Hello</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheetBackground: {
    backgroundColor: '#141414',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContent: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default CreateSession;

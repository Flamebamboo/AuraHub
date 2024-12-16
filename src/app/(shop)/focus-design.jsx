import { View, Text, FlatList, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFocusItems } from '@/lib/focusItem';

import { designItems } from '@/store/timerVariantStore';
/*
  The plan is to store all the design data in the appwrite database and then fetch it from focusItem.js
  and then display it here. The design data will be stored in the database as an array of objects

  For now im going to hard code the design data in the timerVariantStore and then later on
  I will fetch it from the database (focusItem.js) and display it here
  

  1) focus on the UX and UI of the shop
*/

const focusDesigns = () => {
  const { width } = Dimensions.get('window');
  const itemWidth = width / 2 - 20;

  const renderDesigns = ({ item }) => (
    <TouchableOpacity>
      <View className="flex items-center justify-center" style={{ width: itemWidth }}>
        <Image
          className="rounded-xl"
          source={item.image}
          style={{ width: itemWidth - 20, height: itemWidth - 20, resizeMode: 'contain' }}
        />
        <Text className={'text-2xl font- text-white'}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-custom-black h-full items-center justify-center">
      <FlatList
        data={designItems}
        renderItem={renderDesigns}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          padding: 10,
        }}
      />
    </SafeAreaView>
  );
};

export default focusDesigns;

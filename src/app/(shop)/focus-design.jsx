import { View, Text, FlatList, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFocusItems } from '@/lib/focusItem';
import { faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import useTimerVariant from '@/store/timerVariantStore';
import { designItems } from '@/store/timerVariantStore';
/*
  The plan is to store all the design data in the appwrite database and then fetch it from focusItem.js
  and then display it here. The design data will be stored in the database as an array of objects

  For now im going to hard code the design data in the timerVariantStore and then later on
  I will fetch it from the database (focusItem.js) and display it here
  

  1) focus on the UX and UI of the shop 
  2) each design should show the name of the design and the image of the design
  3) the design should also have status of the design (if it is locked or unlocked)
  4) the design should have a price tag
*/

const focusDesigns = () => {
  const { width } = Dimensions.get('window');
  const itemWidth = width / 2 - 20;
  const { ownedItems, equippedItem, purchaseItem, setVariant } = useTimerVariant();

  const renderDesigns = ({ item }) => {
    const isOwned = ownedItems.includes(item.id); //"includes" check if the item is in the ownedItems array
    const isEquipped = equippedItem === item.id;
    return (
      <TouchableOpacity onPress={() => (isOwned ? setVariant(item.id) : purchaseItem(item.id))} className="m-2">
        <View className="flex items-center justify-center relative" style={{ width: itemWidth }}>
          <Image
            className="rounded-xl"
            source={item.image}
            style={{ width: itemWidth - 20, height: itemWidth - 20, resizeMode: 'contain' }}
          />
          <View className="absolute top-1 right-3 m-2">
            {isOwned ? (
              <View>
                <FontAwesomeIcon icon={faUnlock} size={24} color="white" />
              </View>
            ) : (
              <View>
                <FontAwesomeIcon icon={faLock} size={24} color="white" />
              </View>
            )}
          </View>

          <Text className={'text-xl font- text-white'}>{item.name}</Text>
          <Text className={'text-xl font- text-white'}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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

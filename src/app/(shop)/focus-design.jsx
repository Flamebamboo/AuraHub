import { View, Text, FlatList, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { faUnlock, faLock, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import useTimerVariant from '@/store/timerVariantStore';

import { fetchDesigns } from '@/lib/focusItem';
import { router } from 'expo-router';
/*
  The plan is to store all the design data in the appwrite database and then fetch it from focusItem.js
  and then display it here. The design data will be stored in the database as an array of objects

  For now im going to hard code the design data in the timerVariantStore and then later on
  I will fetch it from the database (focusItem.js) and display it here
  

  1) focus on the UX and UI of the shop 
  2) each design should show the name of the design and the image of the design
  3) the design should also have status of the design (if it is locked or unlocked)
  4) the design should have a price tag
  5) intergrate with db
*/

const focusDesigns = () => {
  const { width } = Dimensions.get('window');
  const itemWidth = width / 2 - 20;
  const { ownedItems, variant, purchaseItem, loadItems, setVariant } = useTimerVariant();
  const [designItems, setDesignItems] = useState([]);

  useEffect(() => {
    const loadDesigns = async () => {
      const designs = await fetchDesigns();
      setDesignItems(designs);
    };
    loadDesigns();
  }, []);
  const renderDesigns = ({ item }) => {
    const isOwned = ownedItems.includes(item.id); //"includes" check if the item is in the ownedItems array
    const isSelected = variant === item.variant;
    return (
      <TouchableOpacity onPress={() => (isOwned ? setVariant(item.variant) : purchaseItem(item.id))} className="m-2">
        <View className="flex items-center justify-center relative" style={{ width: itemWidth }}>
          {isSelected ? (
            <Image
              className="rounded-xl border-red-500 border-4"
              source={item.image}
              style={{ width: itemWidth - 20, height: itemWidth - 20, resizeMode: 'contain' }}
            />
          ) : (
            <Image
              className="rounded-xl"
              source={{ uri: item.image }} //needed to migrate to appwrite Storage will comabck later
              style={{ width: itemWidth - 20, height: itemWidth - 20, resizeMode: 'contain' }}
            />
          )}
          <View className="absolute top-1 right-3 m-2">
            {isOwned ? (
              isSelected ? (
                <FontAwesomeIcon icon={faCheck} size={16} color="white" />
              ) : (
                <FontAwesomeIcon icon={faUnlock} size={16} color="white" />
              )
            ) : (
              <View>
                <FontAwesomeIcon icon={faLock} size={16} color="white" />
              </View>
            )}
          </View>
          <Text className={'text-xl text-white'}>{item.name}</Text>

          {!isOwned && (
            <View>
              <Text className={'text-md font-semibold text-white'}>{item.price}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-custom-black relative">
      <View className="flex-row items-center px-4 py-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-bold text-white text-center mr-8">Focus Designs</Text>
      </View>

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

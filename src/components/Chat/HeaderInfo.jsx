import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

const HeaderInfo = () => {
  return (
    <View className="bg-secondary-custom-black h-[12%]">
      <View className=" flex flex-row items-center justify-center px-4 pt-16">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <FontAwesomeIcon icon={faChevronLeft} size={24} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-md font-bold text-white text-center mr-8">Aura AI</Text>
      </View>
    </View>
  );
};

export default HeaderInfo;

import { View, Text, FlatList } from 'react-native';
import React from 'react';
import {designItems} from '@/store/timerVariantStore';
import { SafeAreaView } from 'react-native-safe-area-context';
const focusDesigns = () => {



  const renderDesigns = ({item}) => (
    <View>
      <Text>{item.id}</Text>
      <Text className={"text-5xl text-black"}>{item.name}</Text>
    </View>
    );



  return (
    <SafeAreaView className='flex-1 items-center justify-center flex-col'>
    <FlatList data={designItems} renderItem={renderDesigns} keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
};

export default focusDesigns;

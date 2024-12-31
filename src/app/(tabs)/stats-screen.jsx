import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { getByDay } from '@/lib/focusStats';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stats = () => {
  const [statsData, setStatsData] = useState({
    pieData: {}, //contains the total time spent on each task
  });

  // Convert seconds to hours and minutes format
  const formatDuration = (second) => {
    const hours = Math.floor(second / 3600);
    const mins = second * 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getByDay();
        const formattedData = data.groupTask.map((task) => ({
          value: task.value,
          color: task.frontColor,
          text: `10%`,
        }));
        setStatsData({
          pieData: formattedData,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { value: 54, color: '#177AD5', text: '54%' },
    { value: 40, color: '#79D2DE', text: '30%' },
    { value: 20, color: '#ED6665', text: '26%' },
  ];
  return (
    <SafeAreaView className="flex-1 p-8 bg-primary-custom-black">
      <PieChart
        showText
        textColor="black"
        radius={150}
        textSize={20}
        showTextBackground
        textBackgroundRadius={26}
        data={data}
      />
    </SafeAreaView>
  );
};

export default Stats;

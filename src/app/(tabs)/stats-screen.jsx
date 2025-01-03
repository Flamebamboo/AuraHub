import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { getByDay } from '@/lib/focusStats';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';

//Notes:

/*
the getByDay returns the total focus time and the groupTask

group task is an array of objects that contains the value, label, and frontColor
sample: 
[
{
  value: 1000,
  label: 'task',
  frontColor: 'red'
}
  ]



*/

const Stats = () => {
  const [statsData, setStatsData] = useState({ pieData: [], taskList: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useGlobalContext();

  const calculatePercentage = (value, total) => {
    return (value / total) * 100;
  };

  console.log(`statsData ${statsData.pieData}`);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loading && user) {
          const data = await getByDay(user);
          const totalFocus = data.totalFocusTime;
          const pieChartData = data.groupTask.map((task) => ({
            value: task.value,
            color: task.color,
          }));

          const taskList = data.groupTask.map((task) => ({
            label: task.label,
            value: calculatePercentage(task.value, totalFocus),
            color: task.color,
          }));
          setStatsData({ pieData: pieChartData, taskList: taskList });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, loading]);

  if (isLoading || loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-primary-custom-black">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!statsData.pieData.length) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-primary-custom-black">
        <Text className="text-white text-2xl font-PixelifySans text-center px-4">
          No stats available yet. Start a focus session to see your statistics!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-8 items-center justify-start bg-primary-custom-black">
      <Text className="text-white text-4xl font-bold font-PixelifySans">Stats</Text>
      <View className="mt-9">
        <PieChart
          textColor="black"
          radius={150}
          textSize={20}
          data={statsData.pieData}
          donut
          innerRadius={80}
          innerCircleColor={'#141414'}
        />
      </View>

      <View className="mt-9">
        {statsData.taskList.map((task) => (
          <View className="flex-row justify-between items-center mt-5 gap-10" key={task.label}>
            <View className=" flex-row gap-4">
              <View className="w-10 h-10 " style={{ backgroundColor: task.color }}></View>
              <Text className="text-white text-2xl font-PixelifySans">{task.label}</Text>
            </View>
            <Text className="text-white font-bold font-PixelifySans text-2xl">{task.value.toFixed(2)}%</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Stats;

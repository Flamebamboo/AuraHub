import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { getByDay } from '@/lib/focusStats';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stats = () => {
  const testData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: '#177AD5' },
    { value: 745, label: 'W', frontColor: '#177AD5' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: '#177AD5' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
  ];

  const [statsData, setStatsData] = useState({
    totalTime: 0, //the whole time spent on focused
    barData: {}, //contains the total time spent on each task
  });
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  // Convert seconds to hours and minutes format
  const formatDuration = (second) => {
    const hours = Math.floor(second / 3600);
    const mins = second * 60;
    return `${hours}h ${mins}m`;
  };

  const transformStatsToBarData = () => {};

  /*
  Hello rubber duck 
  (I am using a libary  for the bar chart), getByDay will return groupTask 
  which consist of an object with properties like groupTask: {"Select Task": {"#fff": 9}}

  I will use the groupTask to create the barData for the BarChart component.

  
  // Using for...of loop
const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// Using array methods
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});

Object.entries, what it returns is array of an array, so we can destructure it in the forEach method


Sample:

output from getByDay() is { totalFocusTime: 42, groupTask: { "Coding": { "#000": 9 } } }
const groupTask = { "Code": { "#fff": 9 } };
barData: Object.entries(groupTask).forEach(([key, value]) 
console.log(`${key}: ${value}`);
it will log
"value: coding"
"duration: 42" 
"color: #000"

  */

  const fetchStatsData = async () => {
    try {
      const { totalFocusTime, groupTask } = await getByDay();
      /*
    output from groupTask is
    {
    "Coding": {
        "blue": 30   // duration for Coding task with blue color
    },
    "Reading": {
        "green": 45  // duration for Reading task with green color
    }
    }
*/
      const transformedData = Object.entries(groupTask).forEach(([key, value]) => {
        //this return like this
        console.log(`${key}: ${value}`);
      });

      setStatsData({
        totalTime: totalFocusTime,
        barData: transformedData,
      });
    } catch (error) {
      console.error('Error fetching stats from stats-screen:', error);
    }
  };

  // Date range selector function
  const updateDateRange = async (startDate, endDate) => {
    setDateRange({ start: startDate, end: endDate });
    // Implement date range based fetching here
  };

  useEffect(() => {
    fetchStatsData();
  }, [dateRange]); // Refetch when date range changes

  return (
    <SafeAreaView className="flex-1 p-8">
      <BarChart
        data={testData}
        barWidth={22}
        spacing={24}
        noOfSections={4}
        barBorderRadius={4}
        frontColor="lightgray"
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </SafeAreaView>
  );
};

export default Stats;

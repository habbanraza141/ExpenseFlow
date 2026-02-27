import React from 'react';
import {View, StyleSheet} from 'react-native';

const StackedBar = ({data, height = 14, borderRadius = 7}) => {
  const total = data.reduce((sum, d) => sum + d.percentage, 0);
  if (total === 0) {
    return <View style={[styles.empty, {height, borderRadius}]} />;
  }

  return (
    <View style={[styles.container, {height, borderRadius}]}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            flex: item.percentage,
            height,
            backgroundColor: item.color,
            borderTopLeftRadius: index === 0 ? borderRadius : 0,
            borderBottomLeftRadius: index === 0 ? borderRadius : 0,
            borderTopRightRadius: index === data.length - 1 ? borderRadius : 0,
            borderBottomRightRadius: index === data.length - 1 ? borderRadius : 0,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', overflow: 'hidden'},
  empty: {backgroundColor: '#E5E7EB'},
});

export default StackedBar;

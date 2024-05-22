import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BluetoothDataProps {
  data: string;
}

const BluetoothData: React.FC<BluetoothDataProps> = ({ data }) => {
  return (
    <View style={styles.dataContainer}>
      <Text>Dados Recebidos:</Text>
      <Text>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
});

export default BluetoothData;

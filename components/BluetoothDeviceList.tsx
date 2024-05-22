import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

interface BluetoothDeviceListProps {
  devices: BluetoothDevice[];
  onConnect: (device: BluetoothDevice) => void;
}

const BluetoothDeviceList: React.FC<BluetoothDeviceListProps> = ({ devices, onConnect }) => {
  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.deviceContainer}>
          <Text>{item.name}</Text>
          <Button title="Conectar" onPress={() => onConnect(item)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  deviceContainer: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
});

export default BluetoothDeviceList;

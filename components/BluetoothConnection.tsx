import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

interface BluetoothConnectionProps {
  device: BluetoothDevice | null;
  onDisconnect: () => void;
}

const BluetoothConnection: React.FC<BluetoothConnectionProps> = ({ device, onDisconnect }) => {
  return (
    device ? (
      <View style={styles.connectionContainer}>
        <Text>Conectado a: {device.name}</Text>
        <Button title="Desconectar" onPress={onDisconnect} />
      </View>
    ) : null
  );
};

const styles = StyleSheet.create({
  connectionContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
});

export default BluetoothConnection;

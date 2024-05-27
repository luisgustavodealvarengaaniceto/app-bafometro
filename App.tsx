import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import BluetoothData from './components/BluetoothData';
import EnableBluetooth from './components/EnableBluetooth';
import CheckPermissions from './components/CheckPermissions';
import ConnectBondedDevices from './components/ConnectBondedDevices';

const BluetoothComponent = () => {
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [receivedData, setReceivedData] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const handleDeviceConnected = (device: BluetoothDevice) => {
      console.log('Dispositivo conectado:', device);
      setConnectedDevice(device);
    };

    const subscription = DeviceEventEmitter.addListener('BluetoothDeviceConnected', handleDeviceConnected);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <EnableBluetooth />
      <CheckPermissions />
      <ConnectBondedDevices
        connectedDevice={connectedDevice}
        isConnecting={isConnecting}
        setIsConnecting={setIsConnecting}
        setConnectedDevice={setConnectedDevice}
        setReceivedData={setReceivedData}
      />
      {connectedDevice ? (
        <Text>Conectado ao dispositivo: {connectedDevice.name}</Text>
      ) : (
        <Text>Nenhum dispositivo conectado</Text>
      )}
      <BluetoothData data={receivedData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default BluetoothComponent;

import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice, BluetoothEventSubscription } from 'react-native-bluetooth-classic';
import BluetoothDeviceList from './components/BluetoothDeviceList';
import BluetoothConnection from './components/BluetoothConnection';
import BluetoothData from './components/BluetoothData';

const BluetoothComponent = () => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [receivedData, setReceivedData] = useState<string>('');
  const [subscription, setSubscription] = useState<BluetoothEventSubscription | null>(null);

  useEffect(() => {
    const enableBluetooth = async () => {
      try {
        const enabled = await RNBluetoothClassic.isBluetoothEnabled();
        if (!enabled) {
          await RNBluetoothClassic.requestBluetoothEnabled();
        }
      } catch (error) {
        console.error(error);
      }
    };

    enableBluetooth();
  }, []);

  const listPairedDevices = async () => {
    try {
      const pairedDevices = await RNBluetoothClassic.getBondedDevices();
      setDevices(pairedDevices);
    } catch (error) {
      console.error(error);
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      const connection = await RNBluetoothClassic.connectToDevice(device.id);
      setConnectedDevice(connection);
      const readSubscription = connection.onDataReceived((event) => {
        setReceivedData((prevData) => prevData + event.data);
      });
      setSubscription(readSubscription);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectFromDevice = async () => {
    if (connectedDevice) {
      try {
        await connectedDevice.disconnect();
        setConnectedDevice(null);
        if (subscription) {
          subscription.remove();
          setSubscription(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Listar Dispositivos Pareados" onPress={listPairedDevices} />
      <BluetoothDeviceList devices={devices} onConnect={connectToDevice} />
      <BluetoothConnection device={connectedDevice} onDisconnect={disconnectFromDevice} />
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

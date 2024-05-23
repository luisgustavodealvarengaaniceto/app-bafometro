import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice, BluetoothEventSubscription } from 'react-native-bluetooth-classic';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import BluetoothData from './components/BluetoothData';

const BluetoothComponent = () => {
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [receivedData, setReceivedData] = useState<string>('');
  const [subscription, setSubscription] = useState<BluetoothEventSubscription | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const enableBluetooth = async () => {
      try {
        const enabled = await RNBluetoothClassic.isBluetoothEnabled();
        if (!enabled) {
          await RNBluetoothClassic.requestBluetoothEnabled();
        }
      } catch (error) {
        console.error('Erro ao habilitar Bluetooth:', error);
      }
    };

    const checkPermissions = async () => {
      try {
        const permission = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        if (permission !== RESULTS.GRANTED) {
          await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        }
      } catch (error) {
        console.error('Erro ao verificar permissões:', error);
      }
    };

    const getBondedDevicesAndConnect = async () => {
      if (isConnecting || connectedDevice) return;
      setIsConnecting(true);

      try {
        console.log('Tentando conectar ao dispotivo emparelhado');
        const bondedDevices = await RNBluetoothClassic.getBondedDevices();
        for (const device of bondedDevices) {
          try {
            const connection = await RNBluetoothClassic.connectToDevice(device.id);
            if (connection) {
              setConnectedDevice(device);
              startDataSubscription(device);
              break;
            }
          } catch (error) {
            console.log(`Erro ao conectar ao dispositivo ${device.name}:`, error);
          }
        }
      } catch (error) {
        console.error('Erro ao obter dispositivos emparelhados:', error);
      } finally {
        setIsConnecting(false);
      }
    };

    const startDataSubscription = (device: BluetoothDevice) => {
      const subscription = device.onDataReceived((event) => {
        setReceivedData((prevData) => prevData + event.data);
      });
      setSubscription(subscription);
    };

    const handleDeviceConnected = (device: BluetoothDevice) => {
      console.log('Dispositivo conectado:', device);
      setConnectedDevice(device);
      startDataSubscription(device);
    };

    enableBluetooth();
    checkPermissions();
    getBondedDevicesAndConnect();

    const subscription = DeviceEventEmitter.addListener('BluetoothDeviceConnected', handleDeviceConnected);

    return () => {
      subscription.remove();
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
    };
  }, [connectedDevice, isConnecting]);

  return (
    <View style={styles.container}>
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

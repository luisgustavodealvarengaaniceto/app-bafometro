import React, { useEffect } from 'react';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

interface ConnectBondedDevicesProps {
  connectedDevice: BluetoothDevice | null;
  isConnecting: boolean;
  setIsConnecting: (connecting: boolean) => void;
  setConnectedDevice: (device: BluetoothDevice | null) => void;
  setReceivedData: (data: string) => void;
}

const ConnectBondedDevices: React.FC<ConnectBondedDevicesProps> = ({
  connectedDevice,
  isConnecting,
  setIsConnecting,
  setConnectedDevice,
  setReceivedData,
}) => {
  useEffect(() => {
    const getBondedDevicesAndConnect = async () => {
      if (isConnecting || connectedDevice) return;
      setIsConnecting(true);

      try {
        console.log('Tentando conectar ao dispositivo emparelhado');
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
        setReceivedData(event.data);
      });
      return subscription;
    };

    getBondedDevicesAndConnect();
  }, [isConnecting, connectedDevice]);

  return null;
};

export default ConnectBondedDevices;

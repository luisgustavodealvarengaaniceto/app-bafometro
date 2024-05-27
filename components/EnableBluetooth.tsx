import { useEffect } from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const EnableBluetooth = () => {
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

    enableBluetooth();
  }, []);

  return null;
};

export default EnableBluetooth;

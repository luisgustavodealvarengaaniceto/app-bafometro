import React, { useEffect, useState } from 'react';
import { View, Button, Text, FlatList, StyleSheet  } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice, BluetoothEventSubscription  } from 'react-native-bluetooth-classic';

const BluetoothComponent = () => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [receivedData, setReceivedData] = useState<string>('');
  const [subscription, setSubscription] = useState<BluetoothEventSubscription | null>(null);


  useEffect(() => {
    // Ativar Bluetooth ao inicializar o componente
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

  // Função para listar dispositivos pareados
  const listPairedDevices = async () => {
    try {
      const pairedDevices = await RNBluetoothClassic.getBondedDevices();
      setDevices(pairedDevices);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para conectar a um dispositivo
  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      const connection = await RNBluetoothClassic.connectToDevice(device.id);
      setConnectedDevice(connection);
      // Iniciar a leitura dos dados recebidos
      const readSubscription = connection.onDataReceived((event) => {
        setReceivedData((prevData) => prevData + event.data);
      });
      setSubscription(readSubscription);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Listar Dispositivos Pareados" onPress={listPairedDevices} />
      {devices.length > 0 && (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Button title="Conectar" onPress={() => connectToDevice(item)} />
            </View>
          )}
        />
      )}
      {connectedDevice && (
        <Text>Conectado a: {connectedDevice.name}</Text>
      )}

      <View style={styles.dataContainer}>
        <Text>Dados Recebidos:</Text>
        <Text>{receivedData}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  deviceContainer: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
  connectionContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
  dataContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
});

export default BluetoothComponent;

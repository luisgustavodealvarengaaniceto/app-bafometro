import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface BluetoothDataProps {
  data: string;
}

const BluetoothData: React.FC<BluetoothDataProps> = ({ data }) => {
  useEffect(() => {
    const enviarDados = async () => {
      try {
        const response = await axios.post('https://9adb-2804-431-c7dd-884f-613a-130b-f3d2-a2e3.ngrok-free.app/dados', data, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
        console.log('Sucesso', 'Dados enviados com sucesso!');
        console.log('Resposta da API:', response.data);
      } catch (error) {
        console.log('Erro', 'Falha ao enviar dados');
        console.error('Erro ao enviar dados:', error);
      }
    };

    enviarDados();
  }, [data]); // Chama o efeito sempre que 'data' mudar

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

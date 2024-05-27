import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface BluetoothDataProps {
  data: string | null;
}

const BluetoothData: React.FC<BluetoothDataProps> = ({ data }) => {
  const lastSentData = useRef<string | null>(null);

  useEffect(() => {
    const enviarDados = async () => {
      if (data) {
        try {
          console.log('Enviando dados:', data);
          const response = await axios.post('https://bcc0-2804-431-c7dc-81e6-f139-5130-19f2-53eb.ngrok-free.app/dados', data, {
            headers: {
              'Content-Type': 'text/plain',
            },
          });
          console.log('Sucesso', 'Dados enviados com sucesso!');
          console.log('Resposta da API:', response.data);
          lastSentData.current = data;
        } catch (error) {
          console.log('Erro', 'Falha ao enviar dados');
          console.error('Erro ao enviar dados:', error);
        }
      }
    };

    enviarDados();
  }, [data]);

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

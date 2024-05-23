import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface BluetoothDataProps {
  data: string | null;  // Permitir que data seja null inicialmente
}

const BluetoothData: React.FC<BluetoothDataProps> = ({ data }) => {
  useEffect(() => {
    const enviarDados = async () => {
      if (data) {  // Verificar se data não é vazio
        try {
          const response = await axios.post('https://af82-2804-431-c7dd-884f-dd4f-c74e-dccc-ce77.ngrok-free.app/dados', data, {
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

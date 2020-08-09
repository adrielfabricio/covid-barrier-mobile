import React, { useState, useEffect } from 'react';
import { Text, Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';

import ibge from '../../services/ibge';
import { Container, FormView, Input } from './styles';

const Vehicle = () => {
  const [submit, setSubmit] = useState(false);
  const [cities, setCities] = useState([]);
  const [license_plate, setLicensePlate] = useState('');
  const [amount_people, setAmountPeople] = useState('');
  const [estimed_time, setEstimedTime] = useState('');
  const [reason_visit, setReasonVisit] = useState('');
  const [city_origin, setCityOrigin] = useState('');

  useEffect(() => {
    const loadCities = async () => {
      try {
        const allCities = await ibge();
        setCities(allCities);
      } catch (error) {
        console.log(error);
      }
    };

    loadCities();
  }, []);

  return (
    <Container>
      <Text
        h4
        style={{
          color: '#404040',
          marginBottom: 10,
          marginLeft: 20,
          marginTop: 25,
        }}>
        Formulário do veículo
      </Text>

      <FormView>
        <Input
          placeholder="Placa"
          autoCapitalize="none"
          autoCorrect={false}
          value={license_plate}
          onChangeText={(value) => {
            setLicensePlate(value);
          }}
        />
        <Input
          placeholder="Quantidade de pessoas"
          textContentType="telephoneNumber"
          value={amount_people}
          onChangeText={(value) => {
            setAmountPeople(value);
          }}
        />
        <Input
          placeholder="Tempo estimado de permanência"
          autoCapitalize="none"
          autoCorrect={false}
          value={estimed_time}
          onChangeText={(value) => {
            setEstimedTime(value);
          }}
        />
        <Input
          placeholder="Razão da visita"
          autoCapitalize="none"
          autoCorrect={false}
          value={reason_visit}
          onChangeText={(value) => {
            setReasonVisit(value);
          }}
        />
        <Text style={{ alignSelf: 'flex-start', marginLeft: '5%' }}>
          Cidade de Origem
        </Text>
        <Picker
          selectedValue={city_origin}
          style={{ height: 60, width: '90%' }}
          onValueChange={(itemValue) => setCityOrigin(itemValue)}>
          {cities.map((city) => (
            <Picker.Item key={city.id} label={city.nome} value={city.nome} />
          ))}
        </Picker>

        <Button
          title="Verificar"
          onPress={() => console.log(cities)}
          containerStyle={{ width: '90%' }}
          buttonStyle={{ backgroundColor: '#b31b23ff' }}
          loadingProps={{ size: 10 }}
        />
      </FormView>
    </Container>
  );
};

export default Vehicle;

import React, { useState, useEffect, useRef } from 'react';
import { Text, Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';

import { Container, FormView, Input } from './styles';

import { dateLess10 } from '../../helpers';
import ibge from '../../services/ibge';

const Vehicle = ({ navigation }) => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [license_plate, setLicensePlate] = useState('cffgqnw');
  const [amount_people, setAmountPeople] = useState('2');
  const [estimed_time, setEstimedTime] = useState('');
  const [reason_visit, setReasonVisit] = useState('lorem');
  const [city_origin, setCityOrigin] = useState('Itabuna');

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const refDatePicker = useRef(null);

  const dispatch = useDispatch();

  // datepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    let day = dateLess10(currentDate.getDate());
    let month = dateLess10(currentDate.getMonth() + 1);
    let year = currentDate.getFullYear();
    let newDate = `${day}/${month}/${year}`;

    setDate(currentDate);
    setEstimedTime(newDate);
    refDatePicker.current.blur();
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const setVehicle = (
    license_plate,
    amount_people,
    estimed_time,
    reason_visit,
    city_origin,
    uf_state_origin = 'BA',
    state_origin = 'Bahia',
  ) => {
    dispatch({
      type: 'SET_VEHICLE',
      vehicle: {
        license_plate,
        amount_people,
        estimed_time,
        reason_visit,
        origin_visit: {
          city_origin,
          uf_state_origin,
          state_origin,
        },
      },
    });
  };

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

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        setLoading(true);

        setVehicle(
          license_plate,
          amount_people,
          estimed_time,
          reason_visit,
          city_origin,
        );
        setSubmit(false);
        setLoading(false);

        navigation.navigate('VehicleHistoric');
      } catch (err) {
        console.log(err);
        alert('Ops! Verifique o formulário, algo não esta certo.');
        setSubmit(false);
        setLoading(false);
      }
    };

    if (submit === true) {
      handleSubmit();
    }
  }, [submit]);

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
          placeholder={'Tempo estimado de permanência'}
          keyboard={true}
          value={`${estimed_time}`}
          onFocus={showDatepicker}
          ref={refDatePicker}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
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
          onPress={() => setSubmit(true)}
          containerStyle={{ width: '90%' }}
          buttonStyle={{ backgroundColor: '#b31b23ff' }}
          loading={loading}
          loadingProps={{ size: 10 }}
        />
      </FormView>
    </Container>
  );
};

export default Vehicle;

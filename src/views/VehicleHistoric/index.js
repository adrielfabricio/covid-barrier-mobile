import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { Container, CenteredView, ModalView } from './styles';
import ListVehicleHistoric from './ListVehicleHistoric';

import checkpoint from '../../services/checkpoint';
import getVehicleHistoric from '../../services/getVehicleHistoric';

const VehicleHistoric = ({ navigation }) => {
  const geolocation = useSelector((state) => state.geolocation);
  const vehicle = useSelector((state) => state.vehicle);

  const [submit, setSubmit] = useState(false);
  const [vehicleHistoric, setVehicleHistoric] = useState([]);
  const [aproved, setAproved] = useState(false);
  const [justification, setJustification] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPage = async () => {
    try {
      setLoading(true);

      let response = await getVehicleHistoric(vehicle.license_plate);
      setVehicleHistoric(response);

      setLoading(false);
    } catch (err) {
      alert('Conexão não estabelecida');
      setLoading(false);
    }
  };
  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        setLoading(true);

        let response = await checkpoint(
          geolocation.latitude,
          geolocation.longitude,
          vehicle.license_plate,
          vehicle.amount_people,
          vehicle.estimed_time,
          vehicle.reason_visit,
          vehicle.origin_visit.city_origin,
          vehicle.origin_visit.uf_state_origin,
          vehicle.origin_visit.state_origin,
          aproved,
          justification,
        );

        alert('Ponto de controle registrado!');

        navigation.navigate('Vehicle');

        setSubmit(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        alert('Ops! Algo deu errado!');
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <CenteredView>
          <ModalView>
            <Text h5>Justifativa para o carro ser recusado:</Text>
            <Input
              inputContainerStyle={{ width: '90%' }}
              placeholder=""
              value={justification}
              onChangeText={(value) => {
                setJustification(value);
              }}
              required
            />
            <Button
              title="Enviar"
              onPress={() => {
                setAproved(false);
                setSubmit(true);
              }}
              buttonStyle={{ backgroundColor: '#a4bf3f' }}></Button>
          </ModalView>
        </CenteredView>
      </Modal>
      <Text
        h4
        style={{
          color: '#404040',
          marginBottom: 10,
          marginLeft: 20,
          marginTop: 25,
        }}>
        Histórico do Veículo
      </Text>
      <ListVehicleHistoric data={vehicleHistoric} />
      <Button
        title="Permitir"
        onPress={() => {
          setAproved(true);
          setSubmit(true);
        }}
        containerStyle={{ paddingBottom: '.5%' }}
        buttonStyle={{ backgroundColor: '#a4bf3f' }}
        loading={loading}
        loadingProps={{ size: 20 }}
      />
      <Button
        title="Recusar"
        onPress={() => setModalVisible(true)}
        containerStyle={{ paddingBottom: '2.5%' }}
        buttonStyle={{ backgroundColor: '#b31b23ff' }}
      />
    </Container>
  );
};

export default VehicleHistoric;

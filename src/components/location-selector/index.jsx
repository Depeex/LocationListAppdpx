import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import React, { useState } from 'react';
import { View, Alert, Text, Button } from 'react-native';

import { styles } from './styles';
import { MapsPreview } from '../../components';
import { colors } from '../../utils/color';

const LocationSelector = ({ onLocation }) => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso Denegado', 'Necesitamos permisos para usar la ubicación', [
        { text: 'Ok' },
      ]);
      return false;
    }
    return true;
  };

  const onHandlerGetLocation = async () => {
    const isLocationAvailable = await verifyPermissions();

    if (!isLocationAvailable) return;
    const location = await getCurrentPositionAsync({
      timeout: 5000,
    });

    const { latitude, longitude } = location.coords;

    setPickedLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });
  };
  return (
    <View style={styles.container}>
      <MapsPreview location={pickedLocation} style={styles.Preview}>
        <Text>No hay ubicacion seleccionada</Text>
      </MapsPreview>

      <Button title="Obtener ubicacion" color={colors.tertiary} onPress={onHandlerGetLocation} />
    </View>
  );
};
export default LocationSelector;

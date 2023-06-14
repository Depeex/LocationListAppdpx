import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { styles } from './styles';
import { PlaceItem } from '../../components';

const PlaceList = ({ navigation }) => {
  const places = useSelector((state) => state.place.places);
  const onHandlerSelect = (id) => {
    navigation.navigate('PlaceDetail', { placeId: id });
  };

  console.warn(places);
  const renderItem = ({ item }) => <PlaceItem {...item} onSelect={onHandlerSelect} />;
  const keyExtractor = (item) => item.id;
  return (
    <FlatList
      style={styles.container}
      data={places}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default PlaceList;

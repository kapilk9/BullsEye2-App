import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import Favorites from './Favorites';
import MyList from './MyList';
import { COLORS } from '../../constants';
const Tab = createMaterialTopTabNavigator();

 const TopTab = () => {
  const navigation = useNavigation();
  const handleTabPress = (route) => {
    // You can customize the navigation logic here
    navigation.navigate(route);
  };

  const screenOptions = {
    tabBarOptions: {
      style: { backgroundColor: "#4C79BD" },
      labelStyle: { fontSize: 14, fontWeight: 'bold', color: COLORS.white },
      indicatorStyle: { backgroundColor: "#A74CAB" },
      swipeEnabled: true, // Enable screen swiping
      onPress: (e) => {
        const route = e.route.name;
        handleTabPress(route);
      },
    },
  };
  
  return (
    <Tab.Navigator
    screenOptions={screenOptions}
    >
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="My List" component={MyList} />
      <Tab.Screen name="Must Watch" component={Favorites} />
    </Tab.Navigator>
  );
};

export default TopTab;
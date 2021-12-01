import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ShowTacosComponent from '../components/ShowTacosComponent';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShowTacosComponent">
        <Stack.Screen name="Home" component={ShowTacosComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
// export default createAppContainer(AppNavigator)

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import RotaMenu from './RotaMenu';


const Stack = createStackNavigator();

export default function RotasAcesso() {
    return(
        <Stack.Navigator screenOptions={({headerShown: false})}>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="RotaMenu" component={RotaMenu}/>
        </Stack.Navigator>
    );
}
import {
    createStackNavigator,
    createAppContainer, navigationOptions
  } from 'react-navigation';
import Login from './Login';
import EmployeeData from './EmployeeData';

const RootStack = createStackNavigator({
    Login: {
    screen: Login, 
    navigationOptions:{
        title:'Login'
    },
},
    EmployeeData: {
        screen:EmployeeData,
        navigationOptions:{
            title:'Employees'
        }
    },
},
{
    initialRouteName: 'Login',
  });

const App = createAppContainer(RootStack);

export default App;

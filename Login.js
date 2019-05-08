/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {
    Component
} from 'react';
import {
    View,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,Button, ToastAndroid, AsyncStorage
} from 'react-native';
const authentication=require('./authentication.json')
import RNAppShortcuts from 'react-native-app-shortcuts';
//import {Button} from './components/Button';
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        } 
    }
   
      async  componentDidMount() {
            const emailidget =  await AsyncStorage.getItem("emailid");
            const password = await AsyncStorage.getItem("password");
            let userdetails = {
              email: emailidget,
              password: password
            };
            if (emailidget !== null && password !== null) {
              // this.props.login(userdetails)
              this.setState({username: userdetails.email,
                             password:userdetails.password
                            })
                            this.goToEmployeedata()
            } else {
              setTimeout(() => {
                this.props.navigation.navigate('Login')
              }, 3000);
            }
            RNAppShortcuts.handleShortcut((id) => {
              if (id === '1') {
                // go to login page
               AsyncStorage.clear();
                this.props.navigation.navigate('Login')
              }
            })
            RNAppShortcuts.handleShortcut((id) => {
                if (id === '2') {
            
                  // go to employee page
                  if (emailidget !== null && password !== null) {
                  const { dispatch } = this.props.navigation;
                  dispatch({ type: 'Navigation/RESET', actions: [{ type: 'Navigate', routeName: 'EmployeeData' }], index: 0 })
                  ToastAndroid.show(authentication.loginSucsess, ToastAndroid.SHORT);
                }
            }
            else {
                this.props.navigation.navigate('Login')
            }
              })
          }
    
   async goToEmployeedata(){
      if((this.state.username.trim()!='')){
        if((this.state.username== authentication.username) && (this.state.password == authentication.password)){
            await AsyncStorage.setItem("emailid", this.state.username);
            //console.log(AsyncStorage.getItem("emailid"))
     await AsyncStorage.setItem("password", this.state.password);
            const { dispatch } = this.props.navigation;
            dispatch({ type: 'Navigation/RESET', actions: [{ type: 'Navigate', routeName: 'EmployeeData' }], index: 0 })
            ToastAndroid.show(authentication.loginSucsess, ToastAndroid.SHORT);
        } 
        else {
            ToastAndroid.show(authentication.loginfailed, ToastAndroid.SHORT);
        }
    }
    else{
        ToastAndroid.show('Username cannot start with space', ToastAndroid.SHORT);

    }
    }
    render() {
        RNAppShortcuts.addShortcut({
            id: '1',
            shortLabel: 'Login',
            longLabel: 'User Login',
            iconFolderName: 'drawable',
            iconName: 'icon'
          })
        return ( 
            <View style = {
                styles.container
            }>
            <TextInput style={styles.input}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next"
            placeholder='Username'
            placeholderTextColor='#000'
            value={this.state.username}
            onChangeText={username=>this.setState({username: username})} />

        <TextInput style={styles.input}
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='#000'
            secureTextEntry
            value={this.state.password}
            onChangeText={password=>this.setState({password: password})}  />
            <Button
            title="Login"
            onPress={() =>
              this.goToEmployeedata()
            }
          />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        top: '50%',
        flex:1,
        bottom:0,
        
    },
    input: {
        height: 40,
        backgroundColor: '#ccc',
        marginBottom: 10,
        padding: 10,
        color: '#000'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
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
    StyleSheet,Button, ToastAndroid
} from 'react-native';
const authentication=require('./authentication.json')
//import {Button} from './components/Button';
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        } 
    }
    goToEmployeedata(){
      if((this.state.username.trim()!='')){
        if((this.state.username== authentication.username) && (this.state.password == authentication.password)){
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
import React, { Component } from "react";
import {
  
  View,
 
  ToastAndroid,
  Dimensions,
 
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

// Styles
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const employeedata = require('./Employeedata.json');
export default class EmployeeData extends Component {
  constructor(props) {
    var totalPages;
    //StatusBarIOS.setHidden(true);
    super(props);
    this.state = {
      MyEmployees:[],
      dataSource: [],
    };
  }
  componentWillMount() {
    this.MyEmployees();
  }
  MyEmployees() {
        let self = this;
        if(employeedata.user.length>0){
         var TotalEmployees= employeedata.user.length
          for(let i = 0; i<TotalEmployees;i++){
            var userData= {
              key: employeedata.user[i].id,
              data:{
                name:employeedata.user[i].name,
                age: employeedata.user[i].age,
                gender:employeedata.user[i].gender,
                email:employeedata.user[i].email,
                phone:employeedata.user[i].phoneNo,
              }
              
            };
            self.state.MyEmployees.push(userData)
            console.log(self.state.MyEmployees)
              this.setState({
                dataSource:self.setState.MyEmployees
              });
              console.log(this.state.dataSource)
          }
        }
  }
  render() {
    return (
      <View style={{flex:1}}>
      
        <FlatList
          data={this.state.MyEmployees}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={({ item }) => (
            <View>
              <View style={{borderRadius:10, margin:5, backgroundColor:'#32a1f1'}}>
                <Text style={{color:'#fff', justifyContent:'center', alignSelf: 'center',fontSize: 20,}}>{item.data.name}</Text>
                <View>
                <Text style={{color:'#fff'}}>{item.data.email}</Text>
                <Text style={{color:'#fff'}}>{item.data.age}</Text>
                <Text style={{color:'#fff'}}>{item.data.gender}</Text></View>
               
              </View>
            </View>
          )}
          style={{flex:1, }}
        />
        
      </View>
    );
  }
}


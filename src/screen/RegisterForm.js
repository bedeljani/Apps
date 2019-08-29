import React, {Component } from 'react'
import {View} from 'react-native'
import { Container, Label, Content, Header, Left, Body, Right, Button, Icon, Title, Text, Footer, Form, Item, Input, FooterTab, H1 } from 'native-base'
import axios from 'axios'
import apiUrl from '../utils/apiUrl'
import AsyncStorage from '@react-native-community/async-storage';
const qs = require('querystring')

const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

export default class RegisterForm extends Component {
constructor(props){
    super(props)
    
    this.state = {
        data : {
        name : '',
        email : '',
        password : '',
        confirm_password : ''
    },
    
}
}


// onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value }, () => console.log(this.state))
//   }

handleChange = (text, state) =>{
    let convertedText = text
    this.setState({
        data :{
            ...this.state.data,
            [state] : convertedText
        }
        
    })
} 

_submitHandler = async () => {
    let dataUser = this.state.data
     await axios.post(`${apiUrl()}register`, qs.stringify(dataUser), config)
      .then(async (res) => {
          console.log(res)
            await AsyncStorage.setItem('token', res.data.token)
          this.props.navigation.navigate('Auth')
    })
      .catch(function (error) {
        console.log(dataUser)
        // Error saving data
        alert('Gagal register, mohon pastikan semua format terisi dengan benar')
      })
    
  }

//   async (res) => {
//     // handle success
//     await AsyncStorage.setItem('token', JSON.stringify(res.data.data.token))
//     alert('Register Berhasil')
//     this.props.navigation.navigate('Auth')

     render(){
    
        return(
            <Container>
                <Header style={{
                    backgroundColor : 'white'
                }}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{color : 'green'}}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color : 'green'}}>Register</Title>
                </Body>
                <Right />
                </Header>
                <Content>
                  
                        <H1 style={{padding : 20, alignSelf :'center'}} >Register</H1>
                        <Form  style={{paddingBottom : 10, paddingRight : 13}}>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input value={this.state.data.name}
                                    onChangeText={(text) =>this.handleChange(text, 'name')}
                                       />
                            </Item>
                            <Item floatingLabel>
                                <Label>Email </Label>
                                <Input value={this.state.data.email}
                                    onChangeText={(text) =>this.handleChange(text, 'email')}
                                       />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input 
                                    secureTextEntry = {true}
                                    value={this.state.data.password}
                                    onChangeText={(text) =>this.handleChange(text, 'password')}
                                       />
                            </Item>
                            <Item floatingLabel>
                                <Label>Confirm Password</Label>
                                <Input 
                                       secureTextEntry = {true}
                                       value={this.state.data.password2}
                                       onChangeText={(text) =>this.handleChange(text, 'confirm_password')}
                                          
                                       />
                            </Item>
                            
                            
                            
                        </Form>
                        <Button onPress = {this._submitHandler} 
                        block success style={{margin :10, borderRadius : 10, backgroundColor : '#43A047'}}>
                                <Text>Register</Text>
                                
                        </Button>
                        <View  style={{alignSelf:'center', padding: 20, flexDirection : 'row'}}>
                            <Text>Sudah Punya Akun ? </Text>
                            <Text style={{color : '#43A047'}} onPress={() => this.props.navigation.navigate('LoginForm')}>Login</Text>

                        </View>
                    
                </Content>
            </Container>
        )
    }

}
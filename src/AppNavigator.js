import React, { Component } from 'react';
import { createAppContainer,createStackNavigator, createSwitchNavigator,  } from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Explore from './screen/Explore';
import Wishlist from './screen/Wishlist';
import Profil from './screen/Profil';
import List from './screen/List';
import ListDetail from './screen/ListDetail';
import LoginForm from './screen/LoginForm';
import RegisterForm from './screen/RegisterForm';
import Login from './screen/Login';
import PasangIklan from './screen/PasangIklan';
import BookingKost from './screen/BookingKost';


export const AppNavigator = createSwitchNavigator({
    Guest: {
      screen: createStackNavigator({
        Menu: {
          screen: createMaterialBottomTabNavigator({
            Explore: {
              screen: Explore,
              navigationOptions: {
                tabBarIcon: ({
                  tintColor
                }) => < Icon name = 'md-search'
                size = {
                  20
                }
                color = {
                  tintColor
                }
                />,


              }
            },
            // Wishlist: {
            //   screen: Wishlist,
            //   navigationOptions: {
            //     tabBarIcon: ({
            //       tintColor
            //     }) => < Icon name = 'md-heart'
            //     size = {
            //       20
            //     }
            //     color = {
            //       tintColor
            //     }
            //     />,


            //   }

            // },
            Login: {
              screen: Login,
              navigationOptions: {
                tabBarIcon: ({
                  tintColor
                }) => < Icon name = 'md-person'
                size = {
                  20
                }
                color = {
                  tintColor
                }
                />,


              }
            }
          }, {

            shifting: false,
            initialRouteName: 'Explore',
            activeColor: '#43A047',
            inactiveColor: 'black',
            barStyle: {
              backgroundColor: 'white'
            }
          })
        },
        List: {
          screen: List
        },
        ListDetail: {
          screen: ListDetail
        },
        LoginForm: {
          screen: LoginForm
        },
        RegisterForm: {
          screen: RegisterForm
        },

      }, {
        defaultNavigationOptions: {
          header: null
        }
      })
    },
    Auth: {
      screen: createStackNavigator({
        Menu: {
          screen: createMaterialBottomTabNavigator({
            Explore: {
              screen: Explore,
              navigationOptions: {
                tabBarIcon: ({
                  tintColor
                }) => < Icon name = 'md-home'
                size = {
                  20
                }
                color = {
                  tintColor
                }
                />,


              }
            },
            // Wishlist: {
            //   screen: Wishlist,
            //   navigationOptions: {
            //     tabBarIcon: ({
            //       tintColor
            //     }) => < Icon name = 'md-heart'
            //     size = {
            //       20
            //     }
            //     color = {
            //       tintColor
            //     }
            //     />,


            //   }

            // },
            Profil: {
              screen: Profil,
              navigationOptions: {
                tabBarIcon: ({
                  tintColor
                }) => < Icon name = 'md-person'
                size = {
                  20
                }
                color = {
                  tintColor
                }
                />,


              }
            }
          }, {
            shifting: false,
            initialRouteName: 'Explore',
            activeColor: '#43A047',
            inactiveColor: 'black',
            barStyle: {
              backgroundColor: 'white'
            }
          })
        },
        List: {
          screen: List
        },
        ListDetail: {
          screen: ListDetail
        },
        PasangIklan: {
          screen: PasangIklan
        },
        BookingKost: {
          screen: BookingKost
        },

      }, {
        defaultNavigationOptions: {
          header: null
        }
      })
    },




  }, {
    
    navigationOptions: {
      header: null
    }
  }

)

export default createAppContainer(AppNavigator)
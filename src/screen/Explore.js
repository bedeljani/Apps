import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import {
  Text,
} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

import ExploreHeader from '../components/ExploreHeader'
import { Card, CardItem, Icon, Item, Input } from 'native-base'

const data = [
  { img: require('../../asset/bandung.jpg'), title: 'Bandung' },
  { img: require('../../asset/jakarta.jpg'), title: 'Jakarta' },
  { img: require('../../asset/surabaya.jpg'), title: 'Surabaya' },
  { img: require('../../asset/malang.jpg'), title: 'Malang' },
  { img: require('../../asset/yogyakarta.jpg'), title: 'Yogyakarta' }
]

class Explore extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      selectedTab: 0,
      navigationLink: 'LoginForm',
      pasangIklanText: 'Login',
      position: 0,
      dataSource: [
        {

          url: require('../../asset/promo.jpg'),
        }, {

          url: require('../../asset/promo1.jpg'),
        }, {

          url: require('../../asset/promo2.jpg'),
        },
        {

          url: require('../../asset/promo3.jpg'),
        },
        {

          url: require('../../asset/promo4.jpg'),
        },
      ],
      data: data
    }
  }


  checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        this.props.navigation.navigate('Auth')
        this.setState({
          navigationLink: 'PasangIklan',
          pasangIklanText: 'Pasang Iklan'
        })
      } else {
        // alert('Harap Login Untuk Menikmati')
        this.props.navigation.navigate('Guest')
      }
    } catch (err) {
      this.props.navigation.navigate('Guest')
    }
  }
  componentDidMount() {
    this.checkLogin()


  }

  render() {

    return (
      <ScrollView  >
        <View>

          <ExploreHeader />
          <View style={{backgroundColor : 'white', paddingHorizontal : 15, paddingVertical : 5}}>
            <Item style={{borderWidth : 1, borderRadius : 10, borderLeftWidth : 1, borderRightWidth: 1, borderTopWidth : 1, backgroundColor : 'silver', paddingLeft: 10}} >
              <Icon name="md-search" style={{color : 'green', fontStyle: 'bold'}}/>
              <Input placeholderTextColor={'green'} placeholder="Cari Kost" style={{color : 'green'}} />
            </Item>
          </View>

          <View style={styles.container}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.text}> Promo </Text>
            </View>

            <View style={styles.Row1}>
              <View
                style={{ paddingRight: 10 }}>
                <Carousel
                  data={this.state.dataSource}
                  loop={true}
                  autoplay={true}
                  onSnapToItem={async (slideIndex) => {
                    await this.setState({
                      position: slideIndex
                    })
                  }}
                  renderItem={({ item, index }) => (
                    <Card key={index}>
                      <Image source={item.url}
                        style={{ height: 150, width: null }}

                      />
                    </Card>
                  )}
                  sliderWidth={Dimensions.get('window').width - 20}
                  itemWidth={Dimensions.get('window').width - 40}
                />
                <Pagination
                  dotsLength={this.state.dataSource.length}
                  activeDotIndex={this.state.position}
                  dotColor={'silver'}
                  inactiveDotColor={'silver'}
                  dotContainerStyle={{
                    height: 0,
                    paddingHorizontal: 1,
                    marginHorizontal: 1,
                  }}
                  containerStyle={{
                    justifyContent: 'center',
                    marginVertical: 0,
                    paddingVertical: 6


                  }}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 1,
                    paddingHorizontal: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                  }}
                  inactiveDotStyle={{
                    // Define styles for inactive dots here
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </View>

            </View>

            <View style={styles.Row2}>
              <View style={styles.View1}>
                <Text style={{ color: '#fff' }}> Punya kost? Pasang iklan di sini</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.modalTab]
                }

                onPress={() => { this.props.navigation.navigate(this.state.navigationLink, {}) }}

              >
                <Text style={{ color: '#fff' }}>
                  {this.state.pasangIklanText}
                </Text>
              </TouchableOpacity>
            </View>

            <View >
              <Text style={styles.text}> Kota Populer </Text>
            </View>

            <View style={styles.Row3} >
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.title}
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                  return (
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('List') }}>
                      <View style={styles.content}>
                        <View style={{ flex: 2 }}>
                          <Image source={rowData.img} style={styles.img}/>
                        </View>
                        <View style={styles.timage}>
                          <Text style={{ color: '#fff' }}>{rowData.title}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                  )
                }} />

            </View>
          </View>
        </View>
      </ScrollView>


    )
  }

}
export default Explore

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontSize: 17,
    color: 'black'
  },
  container: {
    padding: 10,
    flexDirection: 'column'


  },
  modalTab: {
    height: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#fff',


  },

  Row1: {
    flex: 1,
    alignItems: "flex-start"
  },
  Row2: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 50,
    flex: 1,
    alignItems: "center",
    backgroundColor: '#43A047',
    flexDirection: 'row',
    borderRadius: 10
  },
  Row3: {
    flex: 1,
    alignItems: "flex-end"

  },
  View1: {
    flex: 2,
    justifyContent: "flex-start"
  },
  View2: {
    width: 80,
    height: 40,
    marginLeft: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: "flex-end"
  },
  c: {
    height: 200,
    marginTop: 20,
    marginHorizontal: 10
  },
  content: {
    marginTop: 10,
    marginRight: 20,
    height: 150,
    width: 100,
    borderColor: '#fff'

  },
  img: {
    flex: 1,
    width: 100, height: 150,
    borderRadius: 20,

  },

  timage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: '#ffffff'
  },
  shadow: {
    flex: 1,
    marginHorizontal: 20,
    width: 150,
    height: 100,

  },
})
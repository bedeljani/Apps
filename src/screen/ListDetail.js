import React, {Component} from 'react'
import {View, Dimensions, Image, StyleSheet, TouchableOpacity, Share} from 'react-native'
import MapView from 'react-native-maps'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon,  Text } from 'native-base'

import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import Fasilitas from '../components/Fasilitas'
import RekomendasiKostItem from '../components/RekomendasiKostItem'

import {data, formatRupiah} from '../../data'
 class ListDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
          mapDisplay : 'none',
          imageDisplay : 'flex',  
          imageTabColor : '#43A047',
          mapsTabColor : 'silver',  
          deskrpsiLineNumber : 2,
          readMoreText : 'Tampilkan',
          navigationTarget : 'LoginForm',
          dataSource: [
            {
              
              url: require('../../asset/bandung.jpg'),
            }, {
             
              url: require('../../asset/jakarta.jpg'),
            }, {
              
              url: require('../../asset/surabaya.jpg'),
            }
          ],
          position: 0,
          isMapReady: false,
            region: {
                latitude: -6.90389, 
                longitude: 107.61861,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            data : data
        
        }
    }
    

    onMapLayout = () => {
        this.setState({ isMapReady: true })
      }

    handleOnPressMap = () => {
        this.setState({
            mapDisplay : 'flex',
            imageDisplay : 'none',
            imageTabColor : 'silver',
            mapsTabColor : '#43A047',  
        })
      }
      handleOnPressImage = () => {
        this.setState({
            mapDisplay : 'none',
            imageDisplay : 'flex',
            imageTabColor : '#43A047',
            mapsTabColor : 'silver',  
        })
      }
      handleReadMore = () => {
        if  (this.state.readMoreText === 'Tampilkan'){
        this.setState({
            deskrpsiLineNumber : null ,
            readMoreText : 'Sembunyikan'

        })
        }else{
            this.setState({
                deskrpsiLineNumber : 2 ,
                readMoreText : 'Tampilkan'

            })
        }
      }

      handleShare = async () => {
        try{
            const result = await Share.share({
                message : 'Share'
            })
        }catch(ex){
            alert(ex.message)
        }
      }
    checkLogin = async () => {
        const isLoggedin = await AsyncStorage.getItem('isLogin')
       
        if(isLoggedin == 1){
          this.setState({
            navigationTarget : 'BookingKost',
            
          })
        }else{
          
        }
    }
    componentWillMount(){
        this.checkLogin()
    }
    render(){
        const { navigation } = this.props
        const item = navigation.getParam('item')
        // const img = item.image.map((item)=>(
            
        // ))
        const region = {
            longitude : navigation.getParam('item').region.longitude,
            latitude : navigation.getParam('item').region.latitude,
            longitudeDelta : this.state.region.longitudeDelta,
            latitudeDelta : this.state.region.latitudeDelta
        }
        return(
            <Container>
             <Header style={{
                    backgroundColor : 'white'
                }}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{color : '#43A047'}}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color : '#43A047'}}></Title>
                </Body>
                <Right>
                <Button transparent onPress={this.handleShare}>
                        <Icon name='share' style={{color : '#43A047'}}/>
                    </Button>
                </Right>
            </Header>
            <Content>
                <View 
                        style={{
                            height: 200,
                            display : this.state.imageDisplay} }> 
                            <FlatList 
                                data={item.image}
                                pagingEnabled={true}
                                horizontal={true}
                                renderItem={({item}) =>(
                                    <Image style={{height: 200, width : Dimensions.get('window').width}} source={{uri : item}} />
                                )}
                            />
                    </View>
                    <View 
                        style={{
                        //...StyleSheet.absoluteFillObject,
                            height: 200,
                            display : this.state.mapDisplay
                        
                    }}
                        > 
                        <MapView
                            provider='google'
                            mapType='standard'
                            style={[styles.map]}
                            region={region}
                            onLayout={this.onMapLayout}
                            
                        >
                            {this.state.isMapReady && (
                            <MapView.Marker
                                title='lokasi'
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude
                                }}
                            />
                            )}
                        </MapView>
                    </View>
                    <View style={styles.tabBar}>
                        
                        <TouchableOpacity
                            style={[
                                styles.modalTab ,
                            
                            ]}
                            onPress={this.handleOnPressImage
                            }
                        >
                            <Ionicon name={'md-image'} color={this.state.imageTabColor} size = {16} />
                            <Text
                                style={[{ color : this.state.imageTabColor
                                },
                                styles.tabText]}
                            >
                                Gambar

                            </Text>
                        
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.modalTab ,
                            ]}
                            onPress={this.handleOnPressMap
                            }
                        >
                            <Ionicon name={'md-pin'} color={this.state.mapsTabColor} size = {16} />
                            <Text
                                style={[{ color : this.state.mapsTabColor
                                },
                                styles.tabText]}
                            >
                                Lokasi

                            </Text>
                        
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal : 5}}>
                    <View 
                        style={[{
                            flexDirection : 'row',
                    
                    }, styles.detailContent]}>
                            <Text
                                style={{color : '#43A047'}}
                            >{item.roomType}    </Text>
                            <Text
                                style={{color : '#43A047'}}
                            >Tersedia {item.roomNumber} Kamar</    Text>
                            
                    </View>

                    <View style={[{
                        
                        
                    }, styles.detailContent]}>
                        <Text style={{fontSize : 20,
                            color : 'black'
                        }}>
                            {item.name} {item.address} 
                        </Text>

                    </View>
                    <View style={[{

                    }, styles.detailContent]}>
                        <Text style={{
                            color : 'black'
                        }}>
                            {item.city}
                        </Text>

                    </View>
                        
                    {/* Luas Kamar */}
                    <View
                        style={
                            styles.detailContent
                        }
                    >
                        <Text style={styles.detailContentTitle}>
                            Luas Kamar
                        </Text>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <MaterialIcon name={'zoom-out-map'} color='#43A047' size = {30} style={{margin : 5}} />
                            <Text>
                                {item.roomSize.width} x {item.roomSize.length}  meter
                            </Text>

                        </View>
                    </View>
                        {/* Fasilitas */}
                    <View
                        style={
                            styles.detailContent
                        }
                    >
                        <Text style={styles.detailContentTitle}>
                            Fasilitas kost dan kamar
                        </Text>
                        <View style={styles.fasilitasContainer}>
                                 <FlatList
                                    horizontal={true} 
                                    data={item.facilities}
                                    renderItem={({item}) =>(
                                        <Fasilitas name={item}/>
                                    )}    
                                />
                        
                           
                        </View>
                    </View>
                    
                    {/* Detail */}
                    <View style={styles.detailContent}>
                        <Text style={styles.detailContentTitle}>
                            Deskripsi Kost
                        </Text>
                        
                        <Text style={{textAlign: 'justify'}} numberOfLines={this.state.deskrpsiLineNumber} >
                        {item.description}
                        </Text>
                        <TouchableOpacity onPress={this.handleReadMore}>
                            <Text style={{color : '#43A047'}}>
                                {this.state.readMoreText}
                            </Text>
                        </TouchableOpacity>
                        

                    </View>

                    {/* Kost Menarik Lain */}
                    <View style={styles.detailContent}>
                        <Text style={styles.detailContentTitle}>
                            Kost Menarik Lainnya
                        </Text>
                         <FlatList 
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) =>  item.title }
                            data = {this.state.data}
                            renderItem = {({item}) => {
                                return(
                                    
                                    <RekomendasiKostItem item = {item} navigation={this.props.navigation} />
                                )
                            }}
                        />    
                    </View>
                    </View>
            </Content>
            <Footer>
                <FooterTab style={{backgroundColor:'white', borderTopWidth : 1}}>
                    <View style={{flex : 1, alignItems:'center',padding : 20}}>
                        <Text style={{alignSelf : 'center', color : '#43A047', fontWeight : 'bold'}}>
                        {formatRupiah(item.price, 'Rp. ')} /Bulan
                        </Text>
                    </View>
                    <View style={{flexDirection : 'row', flex : 1 }}>
                        <Button style={styles.bottomBarButton}
                            onPress={()=>this.props.navigation.navigate(this.state.navigationTarget, {item : item})}
                        >
                            <Text style={{ color : 'white'}}>Booking</Text>
                        </Button>
                    </View>
                </FooterTab>
            </Footer>
          </Container>
       
        )
    }

}
export default  ListDetail

const styles = StyleSheet.create({
    tabBar:{
        backgroundColor : 'black',
        flexDirection : 'row',
        height :40
    },
        modalTab:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection : 'row',
            // borderRadius: 4,
            
        },
        tabText:{
            paddingHorizontal: 10
        },
        map: {
            height : 200
          },
        detailContent:{
            margin :10,
            marginVertical : 5
        },
        detailContentTitle:{
            fontWeight : '500',
            fontSize : 17,
            color : 'black'
        },
        fasilitasContainer:{
            paddingVertical: 2, 
            flexDirection: 'row', 
            alignItems:'flex-start'
        },fasiltas :{
            alignItems:'center',
            marginHorizontal : 15,
        }, bottomBarButton : {
            backgroundColor : '#43A047',
            borderRadius : 10,
            height : 40,
            marginHorizontal : 5,
        }
})

import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Label, Content, Header, Left, Body, Picker, Right, Button, Icon, Title, Text, Textarea, Form, Item, Input, H1 } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import apiUrl from '../utils/apiUrl'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'


import * as actionDorms from '../redux/actions/dorms'

class PasangIklan extends Component {
    constructor() {
        super()
        this.state = {
            images: [
            ],
            province: [],
            selectedProvince: '',
            selectedCity: '',
            cities: [],

            src: [],
            selected: 'Putra',
            region: {
                latitude: -6.90389,
                longitude: 107.61861,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,

            },
            markerRegion:
            {
                latitude: -6.90389,
                longitude: 107.61861,
            },
            modalVisible: false,

            data: {
                name: '',
                address: '',
                region: {
                    latitude: 0,
                    longitude: 0,
                },
                city: '',
                images: [

                ],
                description: '',
                roomNumber: 0,
                roomType: 'Putra',
                roomSize: {
                    width: '',
                    length: ''

                },
                facilities: [

                ],
                price: 0

            },

            fasilitas: [
                {
                    name: 'AC',
                    checked: false,
                },
                {
                    name: 'Wifi - Internet',
                    checked: false,

                },
                {
                    name: 'Kasur',
                    checked: false,

                },
                {
                    name: 'TV',
                    checked: false,

                },
                {
                    name: 'Kamar Mandi Dalam',
                    checked: false,

                },
                {
                    name: 'Dapur',
                    checked: false,

                },
                {
                    name: 'Dispenser',
                    checked: false,
                },

            ]

        }
    }


    onValueChange = (value) => {
        this.setState({
            selected: value,
            data: {
                ...this.state.data,
                roomType: value
            }
        })
    }
    onProvinceChange = async (value) => {

        await this.setState({
            selectedProvince: value
        })
        console.log(value)
        const cities = await Axios.get(`http://dev.farizdotid.com/api/daerahindonesia/provinsi/${this.state.selectedProvince}/kabupaten`)

        this.setState({
            cities: cities.data.kabupatens
        })
    }
    onCityChange = async (value) => {
        await this.setState({
            selectedCity: value
        })

        const selectedCityName = this.state.cities.filter((data) => (
            data.id === this.state.selectedCity
        ))
        this.setState({
            data: {
                ...this.state.data,
                city: selectedCityName[0].nama

            }
        })
    }



    handleImagePicker = () => {
        const options = {
            title: 'Pilih Gambar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
        }
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else {

                const source = { uri: response.uri }
                this.setState({
                    src: [...this.state.src, source],
                    data: {
                        ...this.state.data,
                        images: [
                            ...this.state.data.images,
                            response
                        ]
                    }
                })

            }
        })
    }
    handleRegionChange = (region) => {
        this.setState({
            region,
            data: {
                ...this.state.data,
                region: {
                    latitude: region.latitude,
                    longitude: region.longitude,
                }
            }
        })
        if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(region, 100)
        }

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    async handleCheck(checked, index) {
        fasilitas = this.state.fasilitas
        fasilitas[index].checked = !checked


        const selectedFasilitas = fasilitas.filter((data) => (
            data.checked === true
        ))
        const selectedFasilitasName = selectedFasilitas.map((data) => (data.name))

        await this.setState({
            fasilitas: fasilitas,
            data: {
                ...this.state.data,
                facilities: selectedFasilitasName,
            }
        })

    }
    handleChange = (text, state, type) => {
        let convertedText = text
        if (type === 'number') {
            if (convertedText === '') {
                convertedText = 0
            }
            convertedText = parseInt(convertedText, 10)
        }
        this.setState({
            data: {
                ...this.state.data,
                [state]: convertedText
            }

        })
    }
    handleSizeChange = (text, state) => {
        let convertedText = text
        if (convertedText === '') {
            convertedText = 0
        }
        convertedText = parseInt(convertedText, 10)
        this.setState({
            data: {
                ...this.state.data,
                roomSize: {
                    ...this.state.data.roomSize,
                    [state]: convertedText
                }
            }
        })
    }

    sendData = async () => {
        const {
            name,
            address,
            region,
            city,
            images,
            description,
            facilities,
            price,
            roomNumber,
            roomSize,
            roomType
        } = this.state.data
        const {latitude, longitude} = region
        const {width, length} = roomSize
        let facilitiesString
        facilities.forEach((item,index) => {
            if(index === 0){
                facilitiesString = item
            }else{
                facilitiesString +=  ', ' +item
            }
        })
        let data = new FormData()
        data.append('name', name)
        data.append('address', address)
        data.append('lat', latitude)
        data.append('long', longitude)
        data.append('width', width)
        data.append('length', length)
        data.append('city', city)
       
        images.map((item, index)=>{
            data.append('files', {
                uri: item.uri,
                name: `${index}.jpg`,
                type: item.type
            })
        })

        data.append('desc', description)
       data.append('facilities', facilitiesString)
        data.append('price', price)
        data.append('roomNumber', roomNumber)
        data.append('roomType', roomType)
        const token = await AsyncStorage.getItem('token')
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        //this.props.addDorm(data, token)
        Axios.post(`${apiUrl()}/dorms/`, data, {
           headers: { 'authorization': "Bearer " + token }
        }).then((res)=>{
                alert('Data Berhasil disimpan'),
                this.props.navigation.navigate('Explore')
            
        }).catch((err)=>{
            alert('Mohon isi semua format yang tersedia')
        })
        
    }
    async componentDidMount() {
        const prov = await Axios.get('http://dev.farizdotid.com/api/daerahindonesia/provinsi')
        await this.setState({
            province: prov.data.semuaprovinsi
        })

    }
    render() {

        return (
            <Container>
                <Header style={{
                    backgroundColor: 'white'
                }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: '#43A047' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#43A047' }}>Pasang Iklan</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <View style={styles.body}>
                        <Form style={{ paddingBottom: 10, paddingRight: 20 }}>
                            <Item floatingLabel>
                                <Label>Nama Kost</Label>
                                <Input
                                    value={this.state.data.name}
                                    onChangeText={(text) => this.handleChange(text, 'name')}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Alamat Kost</Label>
                                <Input
                                    value={this.state.data.address}
                                    onChangeText={(text) => this.handleChange(text, 'address')}
                                />
                            </Item>
                            <View style={{ padding: 10 }}>
                                <Label>Cari Alamat Kost Anda Di Map dan Pin Alamat Anda</Label>
                            </View>
                            <View style={styles.container}>
                                <MapView style={styles.map}
                                    region={this.state.region}
                                    onRegionChangeComplete={this.handleRegionChange}


                                >
                                    <Marker.Animated
                                        ref={marker => {
                                            this.marker = marker
                                        }}
                                        coordinate={this.state.markerRegion}
                                    />
                                </MapView>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Item floatingLabel style={{ flex: 1 }}>
                                    <Label>Latitude</Label>
                                    <Input editable={false} value={this.state.region.latitude.toString()} />

                                </Item>
                                <Item floatingLabel style={{ flex: 1 }}>
                                    <Label>Longitude</Label>
                                    <Input editable={false} value={this.state.region.longitude.toString()} />
                                </Item>
                            </View>


                            <Item>
                                <Label>Provinsi</Label>
                                <Picker
                                    note
                                    mode='dropdown'
                                    style={{ width: 120, color: 'black', }}
                                    selectedValue={this.state.selectedProvince}
                                    onValueChange={this.onProvinceChange}

                                >

                                    {this.state.province.map((data, index) => (
                                        <Picker.Item key={index} label={data.nama} value={data.id} />
                                    ))}
                                </Picker>
                            </Item>
                            <Item>
                                <Label>Kota/Kabupaten</Label>
                                <Picker
                                    note
                                    mode='dropdown'
                                    style={{ width: 120, color: 'black', }}
                                    selectedValue={this.state.selectedCity}
                                    onValueChange={this.onCityChange}
                                >

                                    {this.state.cities && (this.state.cities.map((data, index) => (
                                        <Picker.Item key={index} label={data.nama} value={data.id} />
                                    )))}
                                </Picker>
                            </Item>


                            <View style={{ paddingLeft: 17, marginTop: 15 }}>
                                <Text>Gambar Kost</Text>

                                {this.state.src && (
                                    <View style={{ paddingVertical: 10 }}>
                                        <FlatList
                                            horizontal={true}
                                            data={this.state.data.images}
                                            extraData={this.state}
                                            renderItem={({ item }) => {
                                                return (
                                                    <Image source={{ uri: item.uri }}

                                                        style={{ height: 100, width: 100, marginRight: 10 }}
                                                        resizeMode={'cover'}
                                                    />)
                                            }} />
                                    </View>
                                )
                                }

                                <Button onPress={this.handleImagePicker} style={{ borderRadius: 10, backgroundColor: '#43A047', width: 200, justifyContent : 'center' }}>
                                    <Text>Upload Gambar</Text>
                                </Button>
                            </View>
                            <Item floatingLabel>
                                <Label>Jumlah Kamar</Label>
                                <Input
                                    keyboardType='number-pad'
                                    value={this.state.data.roomNumber.toString()}
                                    onChangeText={(text) => this.handleChange(text, 'roomNumber', 'number')}
                                />
                            </Item>
                            <View style={{ paddingLeft: 17, marginTop: 15 }}>
                                <Label style={{ color: 'black' }}>Deskripsi</Label>
                                <Textarea
                                    value={this.state.data.description}
                                    onChangeText={(text) => this.handleChange(text, 'description')}
                                    rowSpan={5} bordered placeholder='Desrkipsi' />
                            </View>
                            <View style={{ paddingLeft: 15, marginTop: 15 }}>
                                <Label style={{ color: 'black' }}>Jenis Kost</Label>
                                <Picker
                                    note
                                    mode='dropdown'
                                    style={{ width: 120, color: 'black', }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}

                                >
                                    <Picker.Item label='Putra' value='Putra' />
                                    <Picker.Item label='Putri' value='Putri' />
                                    <Picker.Item label='Campur' value='Campur' />
                                </Picker>
                            </View>
                            <Item floatingLabel>
                                <Label>Harga</Label>
                                <Input
                                    keyboardType='number-pad'
                                    value={this.state.data.price.toString()}
                                    onChangeText={(text) => this.handleChange(text, 'price', 'number')}

                                />
                            </Item>

                            <Label style={{ color: 'black', paddingLeft: 17, marginTop: 15 }}>Luas Kamar</Label>
                            <View style={{ flexDirection: 'row' }}>
                                <Item floatingLabel style={{ flex: 1 }}>
                                    <Label>Panjang (m)</Label>
                                    <Input
                                        keyboardType='number-pad'
                                        value={this.state.data.roomSize.length.toString()}
                                        onChangeText={(text) => this.handleSizeChange(text, 'length')}
                                    />

                                </Item>
                                <Item floatingLabel style={{ flex: 1 }}>
                                    <Label>Lebar (m)</Label>
                                    <Input
                                        keyboardType='number-pad'
                                        value={this.state.data.roomSize.width.toString()}
                                        onChangeText={(text) => this.handleSizeChange(text, 'width')}
                                    />
                                </Item>

                            </View>
                            <View style={{ paddingLeft: 17, marginTop: 15 }}>
                                <Label style={{ color: 'black', paddingBottom: 10 }}>Fasitas</Label>
                                <FlatList
                                    data={this.state.fasilitas}
                                    extraData={this.state}
                                    numColumns={2}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => this.handleCheck(item.checked, index)}
                                            style={{
                                                flex: 1, borderWidth: 0.5, borderColor: 'silver',
                                                backgroundColor: item.checked ? '#43A047' : 'white',
                                                height: 50
                                            }}
                                        >
                                            <Text style={{
                                                textAlign: 'center', textAlignVertical: 'center',
                                                color: item.checked ? 'white' : '#43A047', flex: 1
                                            }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>



                        </Form>
                        <Button block success style={{ margin: 10, borderRadius: 10, backgroundColor: '#43A047' }}
                            onPress={this.sendData}
                        >
                            <Text>Simpan</Text>

                        </Button>

                    </View>
                </Content>


            </Container>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        padding: 20,
        height: 250,
        width: Dimensions.get('window').width,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        marginLeft: 10,
        marginRight: 25


    },
    body: {
        flex: 1,
        justifyContent: 'center'
    },
})

const mapStateToProps = state => {
    return {
        dorms: state.dorms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDorm: (value, token) => dispatch(actionDorms.addDorm(value, token)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PasangIklan)
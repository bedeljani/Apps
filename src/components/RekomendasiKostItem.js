import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Card } from 'react-native-paper';
import { formatRupiah } from '../../data'

export default class RekomendasiKostItem extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.push('ListDetail', { item: this.props.item })}
            >

                <View style={{
                    width: 200,
                    borderColor: 'transparent',
                    borderWidth: 2,
                    borderRadius: 10,
                    marginRight: 10,
                    marginTop: 5,
                    elevation: 2,

                }}>

                    <Text style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        textAlign: 'center',
                        color: '#43A047'

                    }}>Tinggal {this.props.item.roomNumber} Kamar</Text>
                    <Image
                        style={{
                            width: 196,
                            height: 150,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}
                        source={{uri :this.props.item.image[0]}} />
                    <View style={{
                        position: 'absolute',
                        //top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'black',
                        borderRadius: 10

                    }
                    }>
                        <View style={{ flexDirection: 'row' }}>
                            <Text numberOfLines={1} style={{ flex: 1, fontSize: 20 }}>{formatRupiah(this.props.item.price, 'Rp. ')} /Bulan</Text>
                            <Text style={{ flexShrink: 1, fontSize: 20, paddingHorizontal: 5 }}>{this.props.item.roomType}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text numberOfLines={1} style={{ flex: 1, }}>{this.props.item.name} {this.props.item.address}</Text>
                            <Text style={{ flexShrink: 1, paddingHorizontal: 5 }}>{this.props.item.city}</Text>
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    img: {
        width: 350,
        //flex : 1,
        height: 200,
        marginHorizontal: 10
    },
    listContainer: {
        margin: 10,
        height: 300,
        //width : width,
        paddingBottom: 20
    },
    detailContainer: {
        paddingVertical: 5,
        //width : width,
        flexDirection: 'row'
    },
    textHarga: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    textJudul: {
        fontWeight: '100',
        fontSize: 15,
        color: 'black'
    }

})




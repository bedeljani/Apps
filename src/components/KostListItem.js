import React from 'react'
import { View, StyleSheet, Image, TouchableNativeFeedback, } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'
import { formatRupiah } from '../../data'

export default class KostListItem extends React.Component {

    render() {
        return (

            <TouchableNativeFeedback key={this.props.item.id}
                onPress={() => this.props.navigation.navigate('ListDetail', { item: this.props.item })}
            >
                <Card style={{ borderRadius: 10 }}>
                    <CardItem cardBody style={{ borderRadius: 10 }}>
                        <Image source={{uri : this.props.item.image[0]}} style={{ height: 200, width: null, flex: 1, borderRadius: 10 }} />
                    </CardItem>
                    <Text
                        style={{
                            margin: 5,
                            marginLeft: 10,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}
                    >{this.props.item.name} {this.props.item.address}</Text>

                    <View style={{
                        margin: 5,
                        marginLeft: 10,
                        flexDirection: 'row'
                    }}>
                        <Text style={[styles.badge, {backgroundColor:"#43A047", color:'white'}]}
                        >{this.props.item.roomType}</Text>
                        <Text style={[styles.badge, {backgroundColor:"#43A047", color:'white'}]}
                        >Tersedia {this.props.item.roomNumber} Kamar</Text>
                        <Text style={[styles.badge, {backgroundColor:"#43A047", color:'white'}]}
                        >{this.props.item.city}</Text>
                    </View>
                    <Text
                        style={{
                            margin: 5,
                            marginLeft: 10,
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: '#43A047',
                            marginBottom : 10
                        }}
                    >{formatRupiah(this.props.item.price, 'Rp. ')} /Bulan</Text>


                </Card>
            </TouchableNativeFeedback>
        );
    }
}
const styles = StyleSheet.create({
    badge : {
        borderRadius:10,
        height : 20,
        paddingHorizontal : 7,
        marginRight : 5
    }

})


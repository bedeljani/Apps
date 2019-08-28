import React, {
  Component
} from 'react'
import {
  Container,
  Header,
  Content,
  DatePicker,
  Text,
  View,
  Picker,
  Button,
  Radio,
  Form,
  Item,
  Label
} from "native-base"
import Modal from 'react-native-modal'
import GoBackHeader from '../components/GoBackHeader'
import {
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import {
  Divider,
  Input
} from 'react-native-elements'


import FasilitasMini from '../components/FasilitasMini'
import {
  formatRupiah
} from '../../data'
import {
  TextInput
} from 'react-native-paper'


export default class BookingKost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenDate: new Date(),
      month: '',
      isModalVisible: false,
      selectedGender: 'Pria',
      selectedStatus: 'Pelajar',
      name: '',
      phone: 0,
    }
  }



  setDate = (newDate) => {
    this.setState({ chosenDate: newDate })
  }
  onMonthChange = (month) => {
    this.setState({ month: month })
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  handleRadioPress = (state, value) => {
    this.setState({
      [state]: value
    })
  }

  handeTextChange = (text, state, type) => {
    let value = text
    if (type === 'number') {
      parseInt(value, 10)
    }
    this.setState({
      [state]: value
    })
  }

  render() {
    const now = new Date()
    let bulan = []
    for (let i = 0; i < 12; i++) {
      bulan.push(i + 1)

    }
    const { navigation } = this.props
    const item = navigation.getParam('item')
    console.log(item)
    return (
      <Container>
        <GoBackHeader navigation={this.props.navigation} />
        <Content >
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Text style={{ paddingLeft: 2 }}>Tanggal Mulai</Text>
              <View style={{ width: 100, height: 50, alignContent: 'center', alignItems: "center", }}>
                <DatePicker

                  defaultDate={now}
                  minimumDate={now}
                  maximumDate={new Date(now.getTime() + 10368000000)}
                  locale={"id"}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"calendar"}
                  placeHolderText="Pilih Tanggal Masuk"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={(date) => this.setDate(date)}
                  disabled={false}
                />
              </View>
            </View >
            <View style={styles.dateItem}>
              <Text>Lama tinggal</Text>
              <Picker
                note
                mode="dropdown"
                style={styles.monthPicker}
                selectedValue={this.state.month}
                onValueChange={(value) => this.onMonthChange(value)}

              >
                <Picker.Item label={``} value={0} />
                {bulan.map((data, index) => (
                  <Picker.Item key={index} label={`${data} Bulan`} value={data} />
                ))}

              </Picker>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.kostDataContainer}>
            <Image source={{uri :item.image[0]}} style={styles.kostImage} />
            <View style={styles.kostData}>
              <Text style={{ fontSize: 17 }}>{item.name} {item.address}</Text>
              <View style={{ borderWidth: 0 }}>
                <FlatList
                  horizontal={true}
                  data={item.facilities}
                  renderItem={({ item }) => (
                    <FasilitasMini name={item} />
                  )}
                />
              </View>
              <Text style={{ color: '#43A047' }}>{formatRupiah(item.price, 'Rp. ')} /Bulan</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.personDataContainer}>
            <View style={styles.personDataHeader}>
              <Text style={styles.titleText}>Data Penghuni</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <Text style={{ color: '#43A047' }}>Edit</Text></TouchableOpacity>
            </View>
            <View style={styles.personDataRow}>
              <Text>Nama</Text>
              <Text>{this.state.name}</Text>
            </View>
            <View style={styles.personDataRow}>
              <Text>no. Hp</Text>
              <Text>{this.state.phone}</Text>
            </View>
            <View style={styles.personDataRow}>
              <Text>Jenis Kelamin</Text>
              <Text>{this.state.selectedGender}</Text>
            </View>
            <View style={styles.personDataRow}>
              <Text>Status</Text>
              <Text>{this.state.selectedStatus}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <Button block
            style={styles.button}
          //onPress={this.handleLogin}
          >
            <Text>Pesan</Text>

          </Button>
        </Content>
        <Modal
          onBackButtonPress={this.toggleModal}
          style={styles.modal}
          isVisible={this.state.isModalVisible}>

          <View style={styles.modalContainer}>
            <View style={{ height: 50, borderBottomWidth: 0.5, borderBottomColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#43A047', fontSize: 20, fontWeight: '100' }}>Ubah Data Penghuni</Text>

            </View>
            <View>
              <Input
                labelStyle={styles.editDataLabel}
                label={'Nama'}
                value={this.state.name}
                onChangeText={(text) => this.handeTextChange(text, 'name')}


              />
              <Input
                keyboardType={'numeric'}
                labelStyle={styles.editDataLabel}
                label={'No. Hp'}
                value={this.state.phone}
                onChangeText={(text) => this.handeTextChange(text, 'phone')}


              />
              <View
                style={styles.optionContainer}
              >
                <Text
                  style={styles.editDataLabel}
                >Jenis Kelamin</Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    onPress={() => this.handleRadioPress('selectedGender', 'Pria')}
                  >
                    <View style={styles.radioUnit}>
                      <Radio selected={this.state.selectedGender === 'Pria'}
                        onPress={() => this.handleRadioPress('selectedGender', 'Pria')}
                        selectedColor={'#43A047'}
                      />
                      <Text>  Pria</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleRadioPress('selectedGender', 'Wanita')}
                  >
                    <View style={styles.radioUnit}>
                      <Radio selected={this.state.selectedGender === 'Wanita'}
                        onPress={() => this.handleRadioPress('selectedGender', 'Wanita')}
                        selectedColor={'#43A047'}
                      />
                      <Text>  Wanita</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
              <View
                style={styles.optionContainer}
              >
                <Text
                  style={styles.editDataLabel}
                >
                  Status
                    </Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    onPress={() => this.handleRadioPress('selectedStatus', 'Pelajar')}
                  >
                    <View style={styles.radioUnit}>
                      <Radio selected={this.state.selectedStatus === 'Pelajar'}
                        onPress={() => this.handleRadioPress('selectedStatus', 'Pelajar')}
                        selectedColor={'#43A047'}
                      />
                      <Text>  Pelajar</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.handleRadioPress('selectedStatus', 'Pegawai')}
                  >
                    <View style={styles.radioUnit}>
                      <Radio selected={this.state.selectedStatus === 'Pegawai'}
                        onPress={() => this.handleRadioPress('selectedStatus', 'Pegawai')}
                        selectedColor={'#43A047'}
                      />
                      <Text>  Pegawai</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.handleRadioPress('selectedStatus', 'Lainnya')}
                  >
                    <View style={styles.radioUnit}>
                      <Radio selected={this.state.selectedStatus === 'Lainnya'}
                        onPress={() => this.handleRadioPress('selectedStatus', 'Lainnya')}
                        selectedColor={'#43A047'}
                      />
                      <Text>  Lainnya</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Button block
                  style={styles.button}
                  //onPress={this.handleLogin}
                  onPress={this.toggleModal}
                >
                  <Text>Simpan</Text>
                </Button>
              </View>


            </View>
          </View>
        </Modal>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  dateContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  monthPicker: {
    width: 150,
    color: 'black',
  },
  dateItem: {
    alignItems: 'center'
  },
  divider: {
    margin: 10
  },
  kostDataContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  kostData: {
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  kostImage: {
    width: 80,
    height: 80
  },
  personDataContainer: {
    paddingHorizontal: 10
  },
  personDataRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 5
  },
  personDataHeader: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#43A047'
  },
  modal: {
    padding: 0,
    margin: 0
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start'
  },
  editDataLabel: {
    fontWeight: '100',
    fontSize: 15,
    color: 'black'
  },
  optionContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,

  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  radioUnit: {
    flexDirection: 'row',
  }


})
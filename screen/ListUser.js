
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Modal, Keyboard, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { windowHeight, windowWidth } from '../utils/Dimention';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            name: "",
            users: [],
            text: "",
            modal: '',
            view: false,
            modalid: ''
        }
        this.autoGetUser()
        this.myTextInput = React.createRef();
    }


    // Read Data
    autoGetUser = () => {
        firestore()
            .collection("users")
            .onSnapshot(docs => {
                let users = []
                docs.forEach(doc => {
                    users.push(doc)
                })
                this.setState({
                    users
                })
            })
    }

    handleChange = (n) => {
        let text = n;
        this.setState({
            text: text
        })
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    //Add Data
    addUser = () => {
        firestore().collection("users").add({
            name: this.state.text
        })
        Keyboard.dismiss()
        this.myTextInput.current.clear();

    }

    //Delete Data
    deleteUser = (x) => {
        console.log('dihapus', x)
        firestore()
            .collection('users')
            .doc(x)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
    }

    //Update Data
    updateUser = () => {
        firestore()
            .collection('users')
            .doc(this.state.modalid)
            .update({
                name: this.state.modal,
            })
            .then(() => {
                Keyboard.dismiss()
                this.setState({
                    view: false
                })
            })
    }

    showModal = (name) => {
        console.log(name)
        return (
            <Modal
                animationType="slide"
                visible={this.state.view}>
                <View style={{
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'center',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View>
                        <TextInput
                            ref={this.myTextInput}
                            style={{ height: 40, width: 200, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                            value={this.state.modal}
                            onChangeText={(val) => this.updateInputVal(val, 'modal')}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.updateUser()}
                            style={{
                                backgroundColor: '#2e64e5',
                                width: 80,
                                height: 35,
                                marginLeft: 10,
                                borderRadius: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.setState({ view: false })}
                        style={{ backgroundColor: 'red', padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textStyle}>List of Users</Text>
                </View>
                <View style={{ height: 400, padding: 10 }}>
                    {this.showModal()}
                    <ScrollView>
                        {this.state.users.map((user, index) =>
                            <View key={index} style={{ padding: 10, borderWidth: 1, margin: 5, borderColor: '#999999', borderRadius: 10, display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{user._data.name}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ view: true, modal: user._data.name, modalid: user.id })}
                                        style={{ backgroundColor: 'green', marginRight: 5, width: 50, height: 40, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white' }}>Edit</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.deleteUser(user.id)}
                                        style={{ backgroundColor: 'red', width: 40, height: 40, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white' }}>X</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
                <View style={{
                    display: 'flex', flexDirection: "row", alignItems: 'center', bottom: 50, position: "absolute", width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View>
                        <TextInput
                            ref={this.myTextInput}
                            style={{ height: 40, width: 200, borderBottomWidth: 1, borderBottomColor: 'lightskyblue' }}
                            placeholder="Enter name"
                            onChangeText={(val) => this.updateInputVal(val, 'text')}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={this.addUser}
                            style={{
                                backgroundColor: '#2e64e5',
                                width: 80,
                                height: 35,
                                marginLeft: 10,
                                borderRadius: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add User</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: '#fff',
        height: '100%'
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    },
    header: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 20,
    },
    textStyle: {
        fontSize: 30,
        fontFamily: 'Poppins-Regular'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        borderColor: '#ccc',
        height: windowHeight / 15,
        fontSize: 16,
        borderWidth: 1,
    },
});
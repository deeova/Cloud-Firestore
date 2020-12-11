import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimention';
import auth from '@react-native-firebase/auth';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            uid: '',
        }
    }
    signOut = () => {
        auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        this.state = {
            displayName: auth().currentUser.displayName,
            uid: auth().currentUser.uid
        }
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Hello {this.state.displayName}</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('ListUser')}>
                    <Text style={styles.buttonText}>Add User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.signOut()}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonStyle: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
    },
    textStyle: {
        fontSize: 30,
        fontFamily: 'Poppins-Regular'
    },
})

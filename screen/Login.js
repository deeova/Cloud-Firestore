import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimention';
import auth from '@react-native-firebase/auth'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    userLogin = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signin!')
        } else {
            this.setState({
                isLoading: true
            })
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res)
                    console.log('User logged-in successfully!')
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Home')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                    <Text style={styles.textPreloader}>Loginning...</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Welcome to Sign In</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                />
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.userLogin()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={styles.navButtonText}>
                        Don't have an acount? Create here
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2e64e5',
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
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    textPreloader: {
        fontFamily: 'Poppins-Regular',
    }
})

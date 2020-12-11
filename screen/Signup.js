import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimention';
import auth from '@react-native-firebase/auth';


class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false
        }
    };

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            this.setState({
                isLoading: true,
            })

            auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName
                    })
                    console.log('User registered successfully!')
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                    <Text style={styles.textPreloader}>Succes creating account</Text>
                    <Text style={styles.textPreloader}>Returning you to login screen..</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Welcome to Signup</Text>
                <TextInput
                    placeholder="Name"
                    style={styles.inputStyle}
                    onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                />
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
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.registerUser()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        By registering, you confirm that you accept our{' '}
                    </Text>
                    <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                        <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                            Terms of service
                </Text>
                    </TouchableOpacity>
                    <Text style={styles.color_textPrivate}> and </Text>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Privacy Policy
                </Text>
                </View>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.navButtonText}>Have an account? Sign In</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Signup

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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
    navButton: {
        marginTop: 15,
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

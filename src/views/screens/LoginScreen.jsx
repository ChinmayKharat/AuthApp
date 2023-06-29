/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../const/colors';
import Input from '../components/input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const LoginScreen = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const validate = () => {
        Keyboard.dismiss();

        let isValid = true;

        if (!inputs.email) {
            handleError('Please input email', 'email');
            let isValid = false;
        }
        else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }
       


        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Minimum password length of 5', 'password');
            isValid = false;
        }

        if (isValid) {
            login();
        }
    };
    const login = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            let userData = await AsyncStorage.getItem('userData');
            console.log('====================================');
            console.log(userData);
            console.log('====================================');
            if (userData) {
                userData = JSON.parse(userData);
                if (
                    inputs.email == userData.email &&
                    inputs.password == userData.password
                ) {
                    navigation.navigate('HomeScreen');
                    AsyncStorage.setItem(
                        'userData',
                        JSON.stringify({ ...userData, loggedIn: true }),
                    );
                } else {
                    Alert.alert('Error', 'Invalid Details');
                }
            } else {
                Alert.alert('Error', 'User does not exist');
            }
        }, 2000);
    };
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
            }}>
                <Text style={{ color: Colors.black, fontSize: 40, fontWeight: 'bold' }}>Login</Text>
                <Text style={{ color: Colors.black, fontSize: 18, margin: 10, marginRight: 10 }}>Enter your Details to Login</Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        placeholder="Enter your email address"
                        image="data:image/png;base64,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"
                        label="Email"
                        onFocus={() => handleError(null, 'email')}
                        onChangeText={(text) => handleOnChange(text, 'email')}
                        error={errors.email}
                    />                    
                    <Input
                        placeholder="Enter your password"
                        image="data:image/png;base64,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"
                        label="Password"
                        password
                        onChangeText={(text) => handleOnChange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        error={errors.password} />
                    <Button title="Login" onPress={validate} />
                    <Text
                        onPress={() => navigation.navigate('RegistrationScreen')}
                        style={{
                            textAlign: 'center',
                            color: Colors.black,
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                        Don't have an account ?Register
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;

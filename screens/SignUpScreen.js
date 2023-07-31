import React from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

const SignUpScreen = props => {

    return (
        <View style={styles.screen}>
            <TextInput
                placeholder={'Username'}
                style={styles.input}
            />
            <TextInput
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
            />

            <Button
                title={'Sign Up test'}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input: {
        width: '80%',
        height: 44,
        padding: 10,
        marginBottom: 10,
    },
});

export default SignUpScreen;
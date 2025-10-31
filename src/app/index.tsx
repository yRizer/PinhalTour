import * as NavigationBar from 'expo-navigation-bar';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/buttons';
import { rootColors, rootTexts } from '../styles/styles';

export default function App() {

    const goToHome = () => {
        router.push(`/screens/home`);
    }

    NavigationBar.setVisibilityAsync('hidden')
    // NavigationBar.setBehaviorAsync('overlay-swipe')

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoConatiner}>
                {/* Logo vai aqui */}
                <Image source={require('Images/logo/logo.png')} style={{ width: 'auto', height: 75, aspectRatio: 1, marginBottom: 20 }} resizeMode='cover' />
                <Text style={[rootTexts.title, { marginBottom: 20 }]}>Bem Vindo</Text>
                <Text style={[rootTexts.text, { textAlign: 'center' }]}>Explore os encantos de Espirito Santo do Pinhal</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Button text="Fazer Login" leftIcon='person-circle' rightIcon='arrow-forward' />
                <Button text="Escanear QR Code" backgroundColor={rootColors.branco} textColor={rootColors.marrom} outLine={{ borderWidth: 3, borderColor: rootColors.marrom }} leftIcon='qr-code' rightIcon='arrow-forward' />
                <Button text="Explorar sem conta" backgroundColor={rootColors.branco} textColor={rootColors.marrom} outLine={{ borderWidth: 1, borderColor: rootColors.marrom }} rightIcon='arrow-forward' onPress={goToHome} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: rootColors.background,
    },
    logoConatiner: {
        flex: 2,
        marginTop: 60,
        maxWidth: '60%',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    bottomContainer: {
        gap: 40,
        flex: 3,
        borderRadius: 24,
        paddingInline: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: rootColors.branco,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    }
});
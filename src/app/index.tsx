import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/buttons';
import { rootColors, rootTexts } from '../styles/styles';

export default function App() {
  return (
    <View style={styles.mainContainer}>
        <View style={styles.logoConatiner}>
            {/* Logo vai aqui */}
            <Text style={[rootTexts.title, {marginBottom: 20}]}>Bem Vindo</Text>
            <Text style={[rootTexts.text, {textAlign: 'center'}]}>Explore os encantos de Espirito Santo do Pinhal</Text>
        </View>
        <View style={styles.bottomContainer}>
            <Button text="Escanear QR Code"/>
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
        flex: 1,
        marginTop: 60,
        maxWidth: '60%',
        alignSelf: 'center',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 3,
        width: '100%',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: rootColors.branco,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    }
});
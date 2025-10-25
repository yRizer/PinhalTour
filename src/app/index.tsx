import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { rootColors, rootTexts } from '../styles/styles';

export default function App() {
  return (
    <View style={styles.mainContainer}>
        <View style={styles.logoConatiner}>
            {/* Logo vai aqui */}
            <Text style={rootTexts.title}>Bem Vindo</Text>
        </View>
        <View style={styles.bottomContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: rootColors.background,
        position: 'relative'
    },
    logoConatiner: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    bottomContainer: {
        bottom: 0,
        borderRadius: 24,
        height: '60%',
        width: '100%',
        position: 'absolute',
        backgroundColor: rootColors.branco,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    }
});
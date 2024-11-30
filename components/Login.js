import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, ScrollView } from "react-native";
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../firebase";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [user, setUser] = useState(null);

    function logar() {
        signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                navigation.navigate('RotaMenu', { email });
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                navigation.navigate('RotaMenu', { email: user.email });
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={estilo.container}>
            <ImageBackground
                style={estilo.fundo}
                resizeMode="cover"
                source={require('../assets/bmusic.png')}
            />
            <ScrollView contentContainerStyle={estilo.overlay}>
                <Text style={estilo.titulo}>BirdMusic</Text>
                <Text style={estilo.subtitulo}>Login</Text>
                <TextInput
                    style={estilo.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Digite o email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#ccc"
                />
                <TextInput
                    style={estilo.input}
                    secureTextEntry={true}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Digite a senha"
                    placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={estilo.botaoLogar} onPress={logar}>
                    <Text style={estilo.textoBotaoLogar}>Logar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
    },
    fundo: {
        position: 'absolute', 
        width: '100%',
        height: '100%',
    },
    overlay: {
        flexGrow: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        padding: 20,
    },
    titulo: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
    },
    subtitulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
    },
    input: {
        width: 300,
        height: 45,
        backgroundColor: '#000',
        marginVertical: 12,
        borderRadius: 30,
        paddingHorizontal: 20,
        fontSize: 18,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
    },
    botaoLogar: {
        width: 300,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
    },
    textoBotaoLogar: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
});

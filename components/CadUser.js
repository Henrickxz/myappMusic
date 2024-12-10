import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { auth, createUserWithEmailAndPassword } from "../firebase";

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    function cadastrar() {
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                alert("Usuário cadastrado com sucesso!");
                navigation.navigate('Login');
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <View style={estilo.container}>
            <ImageBackground
                style={estilo.fundo}
                resizeMode="cover"
                source={require('../assets/bmusic.png')}
            />
            <ScrollView contentContainerStyle={estilo.overlay}>
                <Text style={estilo.titulo}>BirdMusic</Text>
                <Text style={estilo.subtitulo}>Cadastro</Text>
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
                <TextInput
                    style={estilo.input}
                    secureTextEntry={true}
                    onChangeText={setConfirmarSenha}
                    value={confirmarSenha}
                    placeholder="Confirme a senha"
                    placeholderTextColor="#ccc"
                />
                <TouchableOpacity style={estilo.botaoCadastrar} onPress={cadastrar}>
                    <Text style={estilo.textoBotaoCadastrar}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={estilo.voltarLogin}>Já possui conta? Faça login</Text>
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
    botaoCadastrar: {
        width: 300,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
    },
    textoBotaoCadastrar: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    voltarLogin: {
        marginTop: 20,
        fontSize: 16,
        color: '#fff',
        textDecorationLine: 'underline',
    },
});

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firestore } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarMusica({ navigation }) {
    const [nomeMusica, setNomeMusica] = useState(null);
    const [nomeCantor, setNomeCantor] = useState(null);
    const [duracaoMusica, setDuracaoMusica] = useState(null);
    const [curtidas, setCurtidas] = useState(null);

    async function addMusica() {
        try {
            const docMusic = await addDoc(collection(firestore, 'tbMusic'), {
                nomeMusica: nomeMusica,
                nomeCantor: nomeCantor,
                duracaoMusica: duracaoMusica,
                curtidas: curtidas,
            });
            console.log("Cadastrado com Id:", docMusic.id);
            Alert.alert("Cadastro", "Música cadastrada com sucesso");
            navigation.navigate("Home");

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            Alert.alert("Erro", "Erro ao cadastrar a música, por favor, tente novamente.");
        }
    }

    return (
        <View style={estilo.container}>
            <TouchableOpacity
                style={estilo.btnVoltar}
                onPress={() => navigation.navigate("Home")}>
                <Text style={estilo.btnTxtVoltar}>Back</Text>
            </TouchableOpacity>

            <View>
                <Text style={estilo.titulo}> Cadastre uma nova Música</Text>
            </View>
            <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite o nome da Música" onChangeText={setNomeMusica} value={nomeMusica} />
            <TextInput style={estilo.input} placeholder="Digite o nome do Cantor" onChangeText={setNomeCantor} value={nomeCantor} />
            <TextInput style={estilo.input} placeholder="Digite a duração da música" onChangeText={setDuracaoMusica} value={duracaoMusica} />
            <TextInput style={estilo.input} placeholder="Digite o número de curtidas" onChangeText={setCurtidas} value={curtidas} keyboardType="numeric" />

            <TouchableOpacity
                style={estilo.btnEnviar}
                onPress={() => addMusica()}>
                <Text style={estilo.btnTxtEnviar}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    btnVoltar: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#000',
        borderColor: '#fff',
        borderWidth: 0.6,
        borderRadius: 10,
        padding: 10,
    },
    btnTxtVoltar: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: 'black',
        fontWeight: '700',
        padding: 12,
        width: '80%',
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    btnEnviar: {
        marginTop: 20,
        backgroundColor: '#000',
        borderColor: '#fff',
        borderWidth: 0.6,
        borderRadius: 10,
        padding: 12,
    },
    btnTxtEnviar: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    titulo: {
        color: 'white',
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center',
    },
});

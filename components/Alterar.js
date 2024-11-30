import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from '../firebase';
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarMusica({navigation, route}) {

    const id = route.params.id;

    const [nomeMusica, setNomeMusica] = useState(route.params.nomeMusica);
    const [nomeCantor, setNomeCantor] = useState(route.params.nomeCantor);
    const [duracaoMusica, setDuracaoMusica] = useState(route.params.duracaoMusica);
    const [curtidas, setCurtidas] = useState(route.params.curtidas);

    async function AlterarMusica(id, nomeMusica, nomeCantor, duracaoMusica, curtidas) {
        try {
            await updateDoc(doc(collection(firestore, "tbMusic"), id), {
                nomeMusica: nomeMusica,
                nomeCantor: nomeCantor,
                duracaoMusica: duracaoMusica,
                curtidas: curtidas,
            });
            Alert.alert("Aviso", "Música alterada com sucesso.");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar a música. Por favor, tente novamente.");
        }
    }

    return (
        <View style={estilo.container}>
            <Text style={estilo.titulo}>Alterar Informações da Música</Text>
            <View style={estilo.inputView}>
                <TextInput
                    autoCapitalize='words'
                    style={estilo.input}
                    placeholder="Digite o nome da música"
                    onChangeText={setNomeMusica}
                    value={nomeMusica}
                />
                <TextInput
                    style={estilo.input}
                    placeholder="Digite o nome do cantor"
                    onChangeText={setNomeCantor}
                    value={nomeCantor}
                />
                <TextInput
                    style={estilo.input}
                    placeholder="Digite a duração da música"
                    onChangeText={setDuracaoMusica}
                    value={duracaoMusica}
                />
                <TextInput
                    style={estilo.input}
                    placeholder="Digite o número de curtidas"
                    onChangeText={setCurtidas}
                    value={curtidas}
                />
                <TouchableOpacity
                    style={estilo.btnenviar}
                    onPress={() => AlterarMusica(id, nomeMusica, nomeCantor, duracaoMusica, curtidas)}
                >
                    <Text style={estilo.btntxtenviar}>Alterar</Text>
                </TouchableOpacity>
            </View>
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
    input: {
        marginVertical: 10,
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
    inputView: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnenviar: {
        marginTop: 20,
        backgroundColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        width: 150,
    },
    btntxtenviar: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    titulo: {
        color: 'white',
        marginVertical: 40,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
    },
});

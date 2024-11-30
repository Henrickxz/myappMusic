import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {
    const [musica, setMusica] = useState([]);

    async function deleteMusica(id) {
        try {
            await deleteDoc(doc(firestore, 'tbMusic', id));
            Alert.alert("Música deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar música.", error);
            Alert.alert("Erro", "Não foi possível deletar a música.");
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'tbMusic'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setMusica(lista);
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={estilo.container}>
            <View style={estilo.header}>
                <Text style={estilo.titulo}>Lista de Músicas</Text>
            </View>

            <FlatList
                data={musica}
                renderItem={({ item }) => (
                    <View style={estilo.musicCard}>
                        <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                            id: item.id,
                            nomeMusica: item.nomeMusica,
                            nomeCantor: item.nomeCantor,
                            duracao: item.duracaoMusica,
                            curtidas: item.curtidas
                        })}>
                            <View style={estilo.musicDetails}>
                                <Text style={estilo.musicName}>{item.nomeMusica}</Text>
                                <Text style={estilo.musicArtist}>{item.nomeCantor}</Text>
                                <Text style={estilo.musicDuration}>{item.duracaoMusica}</Text>
                                <Text style={estilo.musicLikes}>{item.curtidas} curtidas</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deleteMusica(item.id)} style={estilo.deleteButton}>
                            <Text style={estilo.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                style={estilo.list}
            />

            <TouchableOpacity style={estilo.BtnCadastrar} onPress={() => navigation.navigate("Cadastrar")}>
                <Text style={estilo.cadastrar}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', 
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
    },
    musicCard: {
        backgroundColor: '#333', 
        borderRadius: 10,
        marginVertical: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    musicDetails: {
        flex: 1,
    },
    musicName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    musicArtist: {
        fontSize: 16,
        color: '#aaa', 
    },
    musicDuration: {
        fontSize: 14,
        color: '#aaa', 
    },
    musicLikes: {
        fontSize: 14,
        color: '#aaa',
    },
    deleteButton: {
        backgroundColor: '#FF5050',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    BtnCadastrar: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        backgroundColor: '#000',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
    },
    cadastrar: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
    },
});

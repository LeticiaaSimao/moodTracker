import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native"
import { addMood, initDB } from "../database/database";
import EmojiPicker from "../components/EmojiPicker";
import { Button } from "react-native";

export default function HomeScreen({ navigation }) {
    const [ note, setNote] = useState(null);
    const [ emoji, setEmoji] = useState('');

    useEffect(() => {
        initDB();
    },[])

    async function handleSave() {
        if(!emoji){
            Alert.alert('Escolha um sentimento!');
            return;
        }
        const date = new Date().toISOString().split('T')[0];
        await addMood(emoji, note ,date);
        Alert.alert('Humor Salvo');
        setEmoji(null);
        setNote('');
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Como você está se sentindo hoje?
            </Text>
            <EmojiPicker selected={emoji} onSelect={setEmoji}/>
            <TextInput style={styles.input} placeholder="Quer anotar o motivo" value={note} onChangeText={setNote}/>
            <Button title="Salvar Humor" color="#384ac6" onPress={handleSave}/>
            <Button title="Ver Histórico" color="#4358e3" onPress={() => navigation.navigate('History')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#023047',
    },
    input: {
        backgroundColor: '#afff',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        fontSize: 16,
    },
});
import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { updateMoods } from "../database/database";
import EmojiPicker from "../components/EmojiPicker";

export default function EditMoodScreen({ route, navigation }) {
    const { mood, reload } = route.params;

    const [emoji, setEmoji] = useState(mood.emoji);
    const [note, setNote] = useState(mood.note);

    async function handleSave() {
        await updateMoods(mood.id, emoji, note);
        reload();
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Escolha um Emoji:</Text>

            <EmojiPicker selected={emoji} onSelect={setEmoji} />

            <Text style={styles.label}>Anotação</Text>
            <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
                multiline
            />

            <Button title="Salvar" color="#003B85" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    label: { 
        fontSize: 16,
        marginBottom: 5 
    },
    input: {
        backgroundColor: '#003A88',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        fontSize: 16,
    },
});
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, FlatList } from "react-native";
import { deleteMood, getAllMoods } from "../database/database";
import MoodCard from "../components/MoodCard";
import { useNavigation } from "@react-navigation/native";

export default function HistoryScreen() {
    const [moods, setMoods] = useState([]);
    const navigation = useNavigation();

    async function loadMoods() {
        const data = await getAllMoods();
        setMoods(data);
    }

    async function handleDelete(id) {
        await deleteMood(id);
        Alert.alert("Registro excluído!");
        loadMoods();
    }

    useEffect(() => {
        loadMoods();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Humor</Text>

            <FlatList
                data={moods}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MoodCard
                        mood={item}
                        OnDelete={() => handleDelete(item.id)}
                        onEdit={() => navigation.navigate("EditMood", { mood: item, reload: loadMoods })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F2F2F2",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        backgroundColor: "#023047",
        color: '#f2f2f2',
        padding: 10,
        borderRadius: 7
    },
});
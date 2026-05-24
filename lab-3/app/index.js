import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search
      );

      const data = await response.json();
      setRecipes((data.meals || []).slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cook Book</Text>

      <TextInput
        placeholder="Search recipe..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <Pressable style={styles.searchButton} onPress={fetchRecipes}>
        <Text style={styles.buttonText}>SEARCH</Text>
      </Pressable>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/personal")}
      >
        <Text style={styles.buttonText}>ADD RECIPE</Text>
      </Pressable>

      <Pressable
        style={styles.savedButton}
        onPress={() => router.push("/personal")}
      >
        <Text style={styles.buttonText}>SAVED RECIPES</Text>
      </Pressable>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/recipes",
                params: { id: item.idMeal },
              })
            }
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.recipeName}>{item.strMeal}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  searchButton: {
    backgroundColor: "#2196f3",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  savedButton: {
    backgroundColor: "orange",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    marginBottom: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 200,
  },

  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
});
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import {
  initDatabase,
  insertRecipe,
  getAllRecipes,
  deleteRecipe,
} from "../db";

export default function PersonalRecipesScreen() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    initDatabase();
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    const data = getAllRecipes();
    setRecipes(data);
  };

  const saveRecipe = () => {
    if (!name || !ingredients || !instructions) {
      Alert.alert("Error", "Completează numele, ingredientele și instrucțiunile.");
      return;
    }

    insertRecipe(name, ingredients, instructions, image);

    setName("");
    setIngredients("");
    setInstructions("");
    setImage("");

    loadRecipes();

    Alert.alert("Success", "Rețeta a fost salvată.");
  };

  const removeRecipe = (id) => {
    deleteRecipe(id);
    setSelectedRecipe(null);
    loadRecipes();
  };

  if (selectedRecipe) {
    return (
      <ScrollView style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => setSelectedRecipe(null)}>
          <Text style={styles.buttonText}>BACK</Text>
        </Pressable>

        {selectedRecipe.image ? (
          <Image source={{ uri: selectedRecipe.image }} style={styles.image} />
        ) : null}

        <Text style={styles.title}>{selectedRecipe.name}</Text>

        <Text style={styles.subtitle}>Ingredients</Text>
        <Text style={styles.text}>{selectedRecipe.ingredients}</Text>

        <Text style={styles.subtitle}>Instructions</Text>
        <Text style={styles.text}>{selectedRecipe.instructions}</Text>

        <Pressable
          style={styles.deleteButton}
          onPress={() => removeRecipe(selectedRecipe.id)}
        >
          <Text style={styles.buttonText}>DELETE</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Recipes</Text>

      <TextInput
        style={styles.input}
        placeholder="Recipe name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />

      <Pressable style={styles.saveButton} onPress={saveRecipe}>
        <Text style={styles.buttonText}>SAVE RECIPE</Text>
      </Pressable>

      <Text style={styles.subtitle}>Saved Recipes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => setSelectedRecipe(item)}>
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text numberOfLines={1}>{item.ingredients}</Text>
          </Pressable>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#777",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});
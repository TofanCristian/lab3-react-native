import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

export default function RecipesScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
      );

      const data = await response.json();
      setRecipe(data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getIngredients = () => {
    const list = [];

    if (!recipe) return list;

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        list.push(`${ingredient} - ${measure}`);
      }
    }

    return list;
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>BACK</Text>
      </Pressable>

      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />

      <Text style={styles.title}>{recipe.strMeal}</Text>

      <Text style={styles.subtitle}>Ingredients</Text>

      {getIngredients().map((item, index) => (
        <Text key={index} style={styles.text}>
          • {item}
        </Text>
      ))}

      <Text style={styles.subtitle}>Instructions</Text>
      <Text style={styles.text}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  backButton: {
    backgroundColor: "#777",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
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

  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
});
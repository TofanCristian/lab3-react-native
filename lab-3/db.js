import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("recipes.db");

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      image TEXT
    );
  `);
};

export const insertRecipe = (name, ingredients, instructions, image) => {
  db.runSync(
    "INSERT INTO recipes (name, ingredients, instructions, image) VALUES (?, ?, ?, ?)",
    [name, ingredients, instructions, image]
  );
};

export const getAllRecipes = () => {
  return db.getAllSync("SELECT * FROM recipes ORDER BY id DESC");
};

export const getRecipeById = (id) => {
  return db.getFirstSync("SELECT * FROM recipes WHERE id = ?", [id]);
};

export const deleteRecipe = (id) => {
  db.runSync("DELETE FROM recipes WHERE id = ?", [id]);
};

export default db;
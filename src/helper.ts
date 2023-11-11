import { Recipe } from "./types";

export function getAllIngredientNames(recipes: Record<string, Recipe>): string[] {
    const ingredientSet = new Set<string>();

    function extractIngredients(recipe: Recipe) {
        Object.keys(recipe).forEach((ingredient) => {
            // Add ingredient to the Set
            ingredientSet.add(ingredient);

            // If this ingredient is also a recipe, recursively extract its ingredients
            if (recipes[ingredient]) {
                extractIngredients(recipes[ingredient]);
            }
        });
    }

    // Start extracting ingredients from all top-level recipes
    Object.values(recipes).forEach(extractIngredients);

    return Array.from(ingredientSet);
}
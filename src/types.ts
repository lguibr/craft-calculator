export interface Recipe {
    [ingredientName: string]: number;
}

export interface Inventory {
    [materialName: string]: number;
}

export interface RecipeFormData {
    name: string;
    ingredients: { name: string; quantity: number }[];
}
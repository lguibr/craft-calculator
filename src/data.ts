import { Recipe } from "./types";

const metalRecipes: Record<string, Recipe> = {
    'Iron Ingot': {
        'Iron Ore': 4,
        'Charcoal': 1
    },
    'Steel Ingot': {
        'Iron Ingot': 1,
        'Charcoal': 2,
        'Obsidian Flux': 1
    },
    'Mythril Ingot': {
        'Mythril Ore': 12,
        'Orichalcum Ingot': 2,
        'Charcoal': 2,
        'Obsidian Flux': 1
    },
    'Orichalcum Ingot': {
        'Orichalcum Ore': 8,
        'Starmetal Ingot': 2,
        'Charcoal': 2,
        'Obsidian Flux': 1
    },
    'Starmetal Ingot': {
        'Starmetal Ore': 6,
        'Steel Ingot': 2,
        'Charcoal': 2,
        'Obsidian Flux': 1
    },
    'Prismatic Ingot': {
        'Asmodeum': 1,
        'Mythril Ingot': 10,
        'Charcoal': 4,
        'Obsidian Flux': 4
    },
    'Asmodeum': {
        'Orichalcum Ingot': 5,
        'Tolvium': 1,
        'Cinnabar': 1,
        'Obsidian Flux': 1,
        'Charcoal': 2
    }
}



const initialRecipes: Record<string, Recipe> = {
    ...metalRecipes
};

export default initialRecipes
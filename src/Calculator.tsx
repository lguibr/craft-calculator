import React, { Dispatch, SetStateAction } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Inventory, Recipe } from './types';
import Collapse from './components/Collapse';
import { Form, Row } from './components/Shared';

interface CraftingFormData {
    craftItems: { recipeName: string; quantity: number }[];
}

interface CalculatorProps {
    allRecipes: Record<string, Recipe>;
    inventory: Inventory;
    setMaterialsNeeded: Dispatch<SetStateAction<Inventory>>;
    materialsNeeded: Inventory;
}

const Calculator: React.FC<CalculatorProps> = ({ allRecipes, inventory, setMaterialsNeeded, materialsNeeded }) => {
    const { register, control, handleSubmit } = useForm<CraftingFormData>({
        defaultValues: {
            craftItems: [{ recipeName: '', quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'craftItems',
    });

    const allRecipeNames = Object.keys(allRecipes);

    const calculateMaterialsForAll = (craftItems: { recipeName: string; quantity: number }[]) => {
        return craftItems.reduce<Inventory>((totalMaterials, { recipeName, quantity }) => {
            const recipeMaterials = calculateRequiredMaterials(recipeName, allRecipes, inventory, quantity);
            Object.keys(recipeMaterials).forEach(material => {
                totalMaterials[material] = (totalMaterials[material] || 0) + recipeMaterials[material];
            });
            return totalMaterials;
        }, {});
    };


    const onSubmit = (data: CraftingFormData) => {
        const requiredMaterials = calculateMaterialsForAll(data.craftItems);
        setMaterialsNeeded(requiredMaterials);
    };

    return (
        <Collapse title="Crafting Materials">

            <Form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <Row key={field.id}>
                        <select {...register(`craftItems.${index}.recipeName`)}>
                            <option value="">Select Recipe</option>
                            {allRecipeNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        <input type="number" {...register(`craftItems.${index}.quantity`)} placeholder="Quantity" />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                    </Row>
                ))}
                <button type="button" onClick={() => append({ recipeName: '', quantity: 1 })}>Add Another Recipe</button>
                <button type="submit">Calculate Materials</button>
                <h3>
                    <pre>{JSON.stringify(materialsNeeded, null, 2)}</pre>
                </h3>
            </Form>

        </Collapse >
    );
};

export default Calculator;

function calculateRequiredMaterials(recipeName: string, allRecipes: Record<string, Recipe>, currentInventory: Inventory, quantityNeeded: number): Inventory {
    // Check if the desired quantity of the final product is already available
    const existingQuantity = currentInventory[recipeName] || 0;
    if (existingQuantity >= quantityNeeded) return {};

    // Calculate the quantity needed considering what's already in the inventory
    const adjustedQuantityNeeded = quantityNeeded - existingQuantity;
    let requiredMaterials: Inventory = {};

    const recipe = allRecipes[recipeName];
    if (!recipe) {
        console.error(`Recipe not found: ${recipeName}`);
        return {};
    }

    Object.entries(recipe).forEach(([ingredient, qtyRequiredPerUnit]) => {
        // Total quantity of this ingredient needed
        const totalQtyRequired = qtyRequiredPerUnit * adjustedQuantityNeeded;
        const existingQty = currentInventory[ingredient] || 0;

        if (existingQty < totalQtyRequired) {
            if (ingredient in allRecipes) {
                // Ingredient is a sub-recipe, recursively calculate its required materials
                const subRecipeMaterials = calculateRequiredMaterials(ingredient, allRecipes, currentInventory, totalQtyRequired - existingQty);
                Object.entries(subRecipeMaterials).forEach(([mat, qty]) => {
                    requiredMaterials[mat] = (requiredMaterials[mat] || 0) + qty;
                });
            } else {
                // Regular ingredient, add to required materials
                requiredMaterials[ingredient] = (requiredMaterials[ingredient] || 0) + totalQtyRequired - existingQty;
            }
        }
    });

    return requiredMaterials;
}

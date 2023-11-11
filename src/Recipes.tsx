import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Recipe, RecipeFormData } from './types';
import Collapse from './components/Collapse';
import { Form, Row } from './components/Shared';

interface RecipeProps {
    allRecipes: Record<string, Recipe>;
    setAllRecipes: Dispatch<SetStateAction<Record<string, Recipe>>>;
}

function Recipes({ allRecipes, setAllRecipes }: RecipeProps) {
    const { register, control, handleSubmit, reset, setValue, watch } = useForm<RecipeFormData>({
        defaultValues: {
            name: '',
            ingredients: [{ name: '', quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const recipeName = watch('name');

    useEffect(() => {
        const debouce = setTimeout(() => {
            if (recipeName && allRecipes[recipeName]) {
                const ingredients = Object.entries(allRecipes[recipeName]).map(([name, quantity]) => ({ name, quantity }));
                setValue('ingredients', ingredients);
            } else {
                setValue('ingredients', [{ name: '', quantity: 1 }]);
            }
        }, 500)
        return () => clearTimeout(debouce)
    }, [recipeName, allRecipes, setValue]);

    const onSubmit = (data: RecipeFormData) => {
        const recipe: Recipe = data.ingredients.reduce((acc, ingredient) => {
            if (ingredient.name && ingredient.quantity > 0) {
                acc[ingredient.name] = ingredient.quantity;
            }
            return acc;
        }, {} as Recipe);

        setAllRecipes({ ...allRecipes, [data.name]: recipe });
        reset();
    };

    const allIngredients = Object.keys(allRecipes).reduce<string[]>((acc, recipe) => {
        Object.keys(allRecipes[recipe]).forEach((ingredient) => {
            if (!acc.includes(ingredient)) {
                acc.push(ingredient);
            }
        });
        return acc;
    }, []);

    return (
        <Collapse initialState={true} title="Recipes">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input
                    list="recipe-names"
                    {...register('name')}
                    placeholder="Recipe Name"
                />
                <datalist id="recipe-names">
                    {Object.keys(allRecipes).map(recipeName => (
                        <option key={recipeName} value={recipeName} />
                    ))}
                </datalist>

                {fields.map((field, index) => (
                    <Row key={field.id}>
                        <input
                            list="ingredients-list"
                            {...register(`ingredients.${index}.name`)}
                            placeholder="Ingredient Name"
                        />
                        <datalist id="ingredients-list">
                            {allIngredients.map(ingredient => (
                                <option key={ingredient} value={ingredient} />
                            ))}
                        </datalist>
                        <input
                            type="number"
                            {...register(`ingredients.${index}.quantity`)}
                            defaultValue={field.quantity}
                        />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                    </Row>
                ))}

                <button type="button" onClick={() => append({ name: '', quantity: 1 })}>Add Ingredient</button>
                <button type="submit">Save Recipe</button>
            </Form>
        </Collapse >
    );
}

export default Recipes;

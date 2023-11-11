import { useForm, useFieldArray } from 'react-hook-form';
import { Inventory } from './types';
import Collapse from './components/Collapse';
import { Form, Row } from './components/Shared';

interface InventoryFormData {
    items: { name: string; quantity: number }[];
}

function InventoryManager({ inventory, setInventory, existingInventoryItems }: { inventory: Inventory; setInventory: React.Dispatch<React.SetStateAction<Inventory>>, existingInventoryItems: string[] }) {
    const { register, control, handleSubmit } = useForm<InventoryFormData>({
        defaultValues: {
            items: Object.entries(inventory).map(([name, quantity]) => ({ name, quantity })),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    const onSubmit = (data: InventoryFormData) => {
        const newInventory: Inventory = {};

        data.items.forEach(item => {
            if (item.name && item.quantity > 0) { // Ensuring only items with a name and positive quantity are added
                newInventory[item.name] = item.quantity;
            }
        });

        setInventory(newInventory);
    };

    return (
        <Collapse title="Your Inventory" >


            <Form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <Row key={field.id}>
                        <input list="inventory-items" {...register(`items.${index}.name`)} placeholder="Item Name" />
                        <datalist id="inventory-items">
                            {existingInventoryItems.map(item => (
                                <option key={item} value={item} />
                            ))}
                        </datalist>
                        <input type="number" {...register(`items.${index}.quantity`)} placeholder="Quantity" />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                    </Row>
                ))}
                <button type="button" onClick={() => append({ name: '', quantity: 0 })}>Add Item</button>
                <button type="submit">Save Inventory</button>
            </Form>
        </Collapse>
    );
}

export default InventoryManager;

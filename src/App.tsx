import { Inventory, Recipe } from './types';
import Recipes from './Recipes';
import InventoryManager from './Inventory';
import Calculator from './Calculator';
import initialRecipes from './data';
import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyles';
import Logo from './components/Logo';
import useLocalStorageState from './components/useLocalStorageState';
import { getAllIngredientNames } from './helper';

function App() {

  const [inventory, setInventory] = useLocalStorageState<Inventory>("inventory", { 'Iron Ore': 2, 'Charcoal': 5 });
  const [allRecipes, setAllRecipes] = useLocalStorageState<Record<string, Recipe>>('recipes', initialRecipes);
  const [materialsNeeded, setMaterialsNeeded] = useLocalStorageState<Inventory>("materials_needed", {});





  return (
    <Container>
      <GlobalStyle />
      <Title>



        <Logo />
        <h2>
          Craft Material Calculator
        </h2>
      </Title>
      <Content>

        <Calculator allRecipes={allRecipes} inventory={inventory} setMaterialsNeeded={setMaterialsNeeded} materialsNeeded={materialsNeeded} />
        <InventoryManager inventory={inventory} setInventory={setInventory} existingInventoryItems={getAllIngredientNames(allRecipes)} />
        <Recipes allRecipes={allRecipes} setAllRecipes={setAllRecipes} />
      </Content>
    </Container>
  );
}

export default App;


const Title = styled.div`
  width: 350px;  
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  padding:1rem;
  color:#FFF;
`

const Container = styled.div`
background-color:#222;
padding:1rem;
width:100vw;
min-height:100vh;

`

const Content = styled.div` 
    color: #AAA;
    display:flex;
    flex-direction: column;
    gap:2rem;
    justify-content:center;
    align-items: center;
    flex:1;
  padding:1rem;


`



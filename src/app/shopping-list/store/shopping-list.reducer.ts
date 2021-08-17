import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface AppState {
    shoppingList : State
}
export interface State{
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}
const initialState : State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action : ShoppingListActions.ShoppingListActions){
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:{
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        }
        case ShoppingListActions.ADD_INGREDIENTS:{
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {
            const ingredient = state.ingredients[action.payload.index];
            
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            const updateIngredients = [...state.ingredients];
            updateIngredients[action.payload.index] = updateIngredient;
            return {
                ...state,
                ingredients: updateIngredients
            };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            
            return {
                ...state,
                ingredients: state.ingredients.filter( (ingre, ingreIndex) => {
                    return ingreIndex !== action.payload;
                })
            };
        }
        case ShoppingListActions.START_EDIT: {
            return {
                ...state,
                editedIngredientIndex:  action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        }
        case ShoppingListActions.STOP_EDIT: {
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        }
    
        default:
            return state;
    }
}
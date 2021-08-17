
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] =[
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    startedEditing = new Subject<number>();

    ingredientsChange = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index : number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    addIngredients(ingredients : Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient : Ingredient){
        // this.ingredients[index] = newIngredient;
        // this.ingredientsChange.next(this.ingredients.slice());
    }

    deleteIngredient(index : number) {
        // this.ingredients.splice(index, 1);
        // this.ingredientsChange.next(this.ingredients.slice());
    }
}
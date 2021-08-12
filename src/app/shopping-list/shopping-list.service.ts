import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] =[
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    ingredientsChange = new EventEmitter<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChange.emit(this.ingredients.slice());
    }
}
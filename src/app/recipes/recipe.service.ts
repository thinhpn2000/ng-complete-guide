import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from "./recipe.model";

export class RecipeService{
    recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', 
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Another Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', 
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 2)
        ]),
    ];

    recipeSelected = new EventEmitter<Recipe>();
    
    getRecipes(){
        // get a copy of recipes
        return this.recipes.slice();
    }
}
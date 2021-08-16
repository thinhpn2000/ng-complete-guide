import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    
    recipesChanged = new Subject<Recipe[]>();
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
    
    constructor(private shopppingListService : ShoppingListService){}
    getRecipes(){
        // get a copy of recipes
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients : Ingredient[]) {
        this.shopppingListService.addIngredients(ingredients);
    }
    
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.shopppingListService.addIngredients(recipe.ingredients);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());   
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromAppReducer from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients : Ingredient[] }>;
  private igChangeSub : Subscription

  constructor(private shoppingListService : ShoppingListService,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChange.
    //   subscribe( (ingredients : Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });
  }

  ngOnDestroy() : void {
    //this.igChangeSub.unsubscribe();
  }

  onEditItem(index:number){
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}

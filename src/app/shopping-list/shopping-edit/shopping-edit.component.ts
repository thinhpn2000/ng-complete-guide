import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as fromAppReducer from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.action';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm : NgForm;

  subscription : Subscription
  editMode = false;
  editItemIndex : number;
  editItem : Ingredient;
  constructor(private shoppingListService : ShoppingListService,
              private store : Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe( stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editItemIndex = stateData.editedIngredientIndex;
        this.editItem = stateData.editedIngredient ;
        this.shoppingListForm.setValue({
          name: this.editItem.name,
          amount : this.editItem.amount
        })
      } else {
        this.editMode = false;
      }
    } );
    // this.subscription = this.shoppingListService.startedEditing
    //     .subscribe(
    //       (index : number) => {
    //         this.editItemIndex = index;
    //         this.editMode = true;
    //         this.editItem = this.shoppingListService.getIngredient(index);
    //         this.shoppingListForm.setValue({
    //           name: this.editItem.name,
    //           amount : this.editItem.amount
    //         })
    //       }
    //     );
  }
  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editItemIndex,newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient));
    }
    else{
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    //this.shoppingListService.deleteIngredient(this.editItemIndex);
    console.log(this.editItemIndex);
    
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}

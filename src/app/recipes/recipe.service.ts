import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Potato Salad',
      'Classic Potato Salad with Mayonaise',
      'https://hips.hearstapps.com/hmg-prod/images/190411-potato-salad-horizontal-1-1555688422.png',
    [
       new Ingredient('Potatoes', 9),
       new Ingredient('Mayonaise', 1)
    ]),
    new Recipe(
      'Cheeseburger',
      'Burger with Cheese and Onions',
      'https://www.kuechengoetter.de/uploads/media/1800x1200/04/19254-big-bacon-cheeseburger.jpg',
    [
        new Ingredient('Meat', 1),
        new Ingredient('Cheese', 1)
    ])
];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }
  
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
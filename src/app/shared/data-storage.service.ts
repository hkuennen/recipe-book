import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  firebaseURL = 'https://recipe-book-14b8d.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.firebaseURL, recipes).subscribe(response => {
      console.log(response);  
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
       this.firebaseURL
        )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
             ...recipe, 
              ingredients: recipe.ingredients ? recipe.ingredients : []
           };
         })
     }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }
}

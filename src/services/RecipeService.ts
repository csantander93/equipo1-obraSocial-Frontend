import { httpServer } from "../clients/server";
import { TRecipe } from "../models/types/entities/TRecipe";
import { TRecipeRequest } from "../models/types/requests/TRecipeRequest";

export default class RecipeService {

  private static recipeController = "/recetas";

  static async getRecipe(idRecipe: number): Promise<TRecipe> {
    try {
      const response = await httpServer.get<TRecipe>(`${this.recipeController}/traerRecetaId/${idRecipe}`);
      return response.data;
    } catch (error) {
      throw error;
    }
    
  }

  static async createRecipe(dto : TRecipeRequest): Promise<void> {
    try {
      await httpServer.post<TRecipe>(`${this.recipeController}/crearReceta`, dto);
    } catch (error) {
      throw error;
    }
    
  }

}
import { httpServer } from "../clients/server";
import { TRecipe } from "../models/types/entities/TRecipe";

export default class RecipeService {

  private static recipeController = "/recetas";

  static async getRecipe(idRecipe: number): Promise<TRecipe> {

    console.log(idRecipe)

    try {
      const response = await httpServer.get<TRecipe>(`${this.recipeController}/traerRecetaId/${idRecipe}`);
      return response.data;
    } catch (error) {
      throw error;
    }
    
  }

}
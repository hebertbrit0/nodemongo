import { Schema, model } from 'mongoose';

export interface ProductRepositoryModel {
    name: string;
    price: Number;
    description: string;
}

//representação do schema no banco de dados
export const ProductSchema = new Schema<ProductRepositoryModel>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
})

//create a model
export const ProductModel = model<ProductRepositoryModel>('Product', ProductSchema);
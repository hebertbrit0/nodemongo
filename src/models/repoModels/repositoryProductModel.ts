
import { ProductRepositoryModel } from "../";
export interface ProductRepositoryInterface {
    createProduct(product: any): Promise<string | undefined>;
    getProducts(): Promise<ProductRepositoryModel[] | undefined>;
    getProductById(id: any): void;
    updateProduct(id: any, product: any): Promise<ProductRepositoryModel | undefined>;
    deleteProduct(id: any): Promise<void>;
}
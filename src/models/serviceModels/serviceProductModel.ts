import { ProductRepositoryModel } from "../";

export interface ServiceProductInterface {
    createProduct(product: any): Promise<string | undefined>;
    getProducts(): Promise<ProductRepositoryModel[]>;
    updateProduct(id: any, product: ProductRepositoryModel): Promise<ProductRepositoryModel | {}>;
    deleteProduct(id: any): Promise<void>;
    getProductByFilter(filter: any): Promise<ProductRepositoryModel[]>;
}
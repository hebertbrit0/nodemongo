import {productRepository} from '../repository/productRepository'
import {ProductRepositoryModel, ProductRepositoryInterface} from '../models'

export interface ServiceProductInterface {
    createProduct(product: any): Promise<string | undefined>;
    getProducts(): Promise<ProductRepositoryModel[]>;
    updateProduct(id: any, product: ProductRepositoryModel): Promise<ProductRepositoryModel | {}>;
    deleteProduct(id: any): Promise<void>;
    getProductByFilter(filter: any): Promise<ProductRepositoryModel[]>;
}

interface GreaterThanInterface {
    property: string;
    value: number;
}

export class ServiceProduct implements ServiceProductInterface {
    readonly productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async createProduct(product: any): Promise<string | undefined> {
        const idProduct = await this.productRepository.createProduct(product);
        return idProduct;
    }

    async getProducts(): Promise<ProductRepositoryModel[]> {
        const products = await this.productRepository.getProducts();
        if (products === undefined) {
            return [];
        }
        return products;
    }

    async updateProduct(id: any, product: ProductRepositoryModel): Promise<ProductRepositoryModel | {}> {
        const data = await this.productRepository.updateProduct(id, product);
        if (data === undefined) {
            return {}
        }else{
            return data;
        }
    }

    async deleteProduct(id: any): Promise<void> {
        await this.productRepository.deleteProduct(id);
    }

    async getProductByFilter(filter: any): Promise<ProductRepositoryModel[]> {
        const products = await this.productRepository.getProducts();
        if (products === undefined) {
            return [];
        }
        
        
        const productsFilter = products.filter((product) => {
            
            if (filter.name !== undefined && product.name.toLocaleLowerCase().includes((filter.name as string).toLocaleLowerCase()) === false) {
                return false;
            }
            if (filter.description !== undefined && product.description.toLocaleLowerCase().includes((filter.description as string).toLocaleLowerCase()) === false) {
                return false;
            }
            if (filter.price !== undefined && Number(filter.price) !== product.price) {
                return false;
            } 
            return true;
        });


        //order by price asc
        productsFilter.sort((a, b) => {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }
            return 0;
        });

        //******* */
        if (filter.gtValues === undefined) {
            return productsFilter;
        }

        const myGreaterThan: GreaterThanInterface[] = JSON.parse(filter.gtValues as string);

        if (myGreaterThan.length > 0) {
            const productsFilterByGreaterThan = productsFilter.filter((product) => {
                let isGreaterThan = true;
                myGreaterThan.forEach((greaterThan) => {
                    const property = greaterThan.property as keyof ProductRepositoryModel;
                    if (product[property] as number <= greaterThan.value) {
                        isGreaterThan = false;
                    }
                });
                return isGreaterThan;
            });
            return productsFilterByGreaterThan;
        }

        return productsFilter;
    }
}

export const serviceProduct = new ServiceProduct(productRepository);
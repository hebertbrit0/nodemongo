import { NoSqlRepositoryModel, noSqlRepository } from './noSql/index';
import {ProductModel, ProductRepositoryModel} from '../models/repoModels/productModel';
import {ProductRepositoryInterface} from '../models'

export class ProductRepository implements ProductRepositoryInterface{
    readonly clientDB: NoSqlRepositoryModel

    constructor(clientDB: NoSqlRepositoryModel) {
        this.clientDB = clientDB;
    }

    async createProduct(product: ProductRepositoryModel): Promise<string | undefined> {
        const connection = await this.clientDB.getconnection();
        if(connection) {
            const productCreated = await ProductModel.create(product);
            const responseCreated = await productCreated.save();
            if (responseCreated) {
                return responseCreated._id.toString();
            } else {
                return undefined;
            }
        } else {
            console.log('Erro ao conectar ao banco de dados');
        }
    }

    async getProducts(): Promise<ProductRepositoryModel[] | undefined> {
        const connection = await this.clientDB.getconnection();
        if(connection) {
            const products = await ProductModel.find<ProductRepositoryModel>();
            return products;
        } else {
            console.log('Erro ao conectar ao banco de dados');
        }
    }

    async getProductById(id: any) {
        const connection = await this.clientDB.getconnection();
        if(connection) {
            const product = await ProductModel.findById(id);
            return product;
        } else {
            console.log('Erro ao conectar ao banco de dados');
        }
    }

    async deleteProduct(id: any): Promise<void> {
        const connection = await this.clientDB.getconnection();
        if(connection) {
           const teste = await ProductModel.deleteOne({_id: id}).exec();
              if (teste.acknowledged) {
                console.log('Deletado com sucesso');
              } else {
                console.log('Erro ao deletar');
              }
        } else {
            console.log('Erro ao conectar ao banco de dados');
        }
    }

    async updateProduct(id: any, product: ProductRepositoryModel): Promise<ProductRepositoryModel | undefined> {
        const connection = await this.clientDB.getconnection();
        if (connection){
            const teste = await ProductModel.updateOne<ProductRepositoryModel>({_id: id}, product).exec();
            if (teste) {
                return product;
            } else {    
                return undefined;
            }
           
        }else{
            console.log('Erro ao conectar ao banco de dados');
        }
    }
}

//factory
export const productRepository = new ProductRepository(noSqlRepository);
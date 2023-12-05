import mongoose, {ConnectOptions} from 'mongoose';

export interface NoSqlRepositoryModel {
    getconnection(): Promise<mongoose.ConnectOptions | undefined>;
}

class NoSqlRepository implements NoSqlRepositoryModel {
  constructor() {
    // mongoose.connect('mongodb://localhost:27017/');
  }
    async getconnection(): Promise<mongoose.ConnectOptions | undefined> {
        const teste = await mongoose.connect('mongodb://root:example@127.0.0.1:27017/admin',
        {
          dbName: 'admin'
        });
        return teste as mongoose.ConnectOptions | undefined;
    }
}

export const noSqlRepository = new NoSqlRepository();
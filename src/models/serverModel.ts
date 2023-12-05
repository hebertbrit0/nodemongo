import { Express } from 'express';

export interface ServerModel {
    app: Express;
    configureRoutes(): void;
    configureCors(): void;
    start(port: any): void;
}
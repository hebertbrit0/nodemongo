import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {Server} from './src/server/';

dotenv.config();

const port = process.env.PORT || 8000;

const server = new Server();

server.start(port);
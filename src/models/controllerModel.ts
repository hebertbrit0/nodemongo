import { Request, Response, RequestHandler } from "express";

export interface ControllerModelInterface {
    path: string;
    Handler(req: Request, res: Response): Promise<void>;
}

export interface RequestController {
    request: RequestHandler<Request>
}

export interface ResponseController {
    response: RequestHandler<Response>
}
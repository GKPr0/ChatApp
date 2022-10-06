export interface ServerError {
    title: string;
    statusCode: number;
    message: string;
    errors?: string[];
}

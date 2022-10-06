export interface ValidationError {
    title: string;
    statusCode: number;
    message: string;
    errors?: string[];
}

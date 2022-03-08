export interface IAPIResponse<T> {
    statusCode: number;
    data?: T;
    message?: string;
}

export interface IAppPagination {
    page: number;
    total: number;
    limit: number;
}

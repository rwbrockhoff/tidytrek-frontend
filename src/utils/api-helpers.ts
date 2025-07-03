import { AxiosResponse } from 'axios';

// Extracts data from an Axios response - utility for SimpleMutation

export const extractData = <T>(response: AxiosResponse<T>): T => response.data;

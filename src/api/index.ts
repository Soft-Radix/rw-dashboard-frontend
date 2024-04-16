import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

const ApiHelperFunction =
    async ({ url, method, data, params }: AxiosRequestConfig<unknown>) => {
        try {
            Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
            const result = await Axios({
                url,
                method,
                data,
                params
            });
            return { data: result.data };
        } catch (axiosError) {
            const error = axiosError as AxiosError;
            return {
                error
            };
        }
    };
export default ApiHelperFunction
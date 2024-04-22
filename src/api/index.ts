import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

const ApiHelperFunction =
    async ({ url, method, data, params }: AxiosRequestConfig<unknown>) => {
        try {
            Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
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
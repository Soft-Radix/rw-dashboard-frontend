import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
interface ApiResponse {
    data?: any;
    error?: AxiosError;
}
const ApiHelperFunction =
    async ({ url, method, data, params }: AxiosRequestConfig<unknown>): Promise<ApiResponse> => {
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
            console.log(axiosError, 'error?.response');

            if (error?.response) {
                return { data: error?.response?.data }
            } else {
                throw error
            }
        }
    };
export default ApiHelperFunction
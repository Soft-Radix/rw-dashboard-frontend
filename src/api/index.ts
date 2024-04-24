import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
interface ApiResponse {
    data?: any;
    error?: AxiosError;
}

// Extend AxiosRequestConfig to include formData property
interface RequestConfig extends AxiosRequestConfig {
    formData?: boolean; // Optional property indicating if this request uses FormData
}

const ApiHelperFunction =
    async ({ url, method, data, params, formData }: RequestConfig): Promise<ApiResponse> => {
        try {
            Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
            let requestObj = { url, method, data, params }

            // check if payload type has formData then append headers key
            if (formData) requestObj['headers'] = { "Content-Type": "multipart/form-data" };

            const result = await Axios(requestObj);
            return { data: result.data };
        } catch (axiosError) {
            const error = axiosError as AxiosError;

            if (error?.response) {
                return { data: error?.response?.data }
            } else {
                throw error
            }
        }
    };
export default ApiHelperFunction
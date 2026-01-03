export const errorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('API Error:', error);
            return Promise.reject(error);
        }
    );
};

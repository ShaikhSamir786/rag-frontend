// Mock API implementation
export const chatApi = {
    query: async (params) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            answer: "This is a simulated response.",
            sources: []
        };
    }
};

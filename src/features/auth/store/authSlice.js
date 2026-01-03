import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadInitialState = () => {
    if (typeof window === 'undefined') {
        return {
            user: null,
            accessToken: null,
            refreshToken: null,
            sessions: [],
            isAuthenticated: false,
            isLoading: true,
        };
    }

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    return {
        user,
        accessToken,
        refreshToken,
        sessions: [],
        isAuthenticated: !!accessToken && !!user,
        isLoading: false,
    };
};

const initialState = loadInitialState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            state.isLoading = false;

            // Persist to localStorage
            if (typeof window !== 'undefined') {
                if (accessToken) localStorage.setItem('accessToken', accessToken);
                if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
                if (user) localStorage.setItem('user', JSON.stringify(user));
            }
        },
        updateTokens: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            if (refreshToken) state.refreshToken = refreshToken;

            if (typeof window !== 'undefined') {
                if (accessToken) localStorage.setItem('accessToken', accessToken);
                if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
            }
        },
        setSessions: (state, action) => {
            state.sessions = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.sessions = [];
            state.isAuthenticated = false;
            state.isLoading = false;

            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
    },
});

export const { setCredentials, updateTokens, setSessions, logout, setLoading, updateUser } = authSlice.actions;
export default authSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/features/auth/store/authSlice';
import documentsReducer from '@/features/documents/store/documentsSlice';
import chatReducer from '@/features/chat/store/chatSlice';

// Slices will be added here
const rootReducer = {
    auth: authReducer,
    documents: documentsReducer,
    chat: chatReducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

setupListeners(store.dispatch);

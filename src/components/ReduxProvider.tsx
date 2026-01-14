"use client";

import { Provider } from 'react-redux';
import { getStore } from '@/store';
import { ReactNode } from 'react';

interface ReduxProviderProps {
    children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    const store = getStore();
    return <Provider store={store}>{children}</Provider>;
}

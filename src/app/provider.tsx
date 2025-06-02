"use client";
import { Provider as StoreProvider } from "react-redux";
import { AppStore, makeStore } from "../store";
import { useRef } from "react";
const Provider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<AppStore>(undefined);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }
  return <StoreProvider store={storeRef.current}>{children}</StoreProvider>;
};


export default Provider;
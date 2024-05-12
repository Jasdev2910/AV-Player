"use client";

import { Provider } from "react-redux";
import { store } from "../utils/store/store"; // Adjust this path to where your Redux store is configured

function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;

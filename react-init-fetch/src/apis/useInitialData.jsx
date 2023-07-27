import { useContext } from "react";
import { InitialDataContext } from "./InitialDataProvider";

export const useInitialData = () => useContext(InitialDataContext);

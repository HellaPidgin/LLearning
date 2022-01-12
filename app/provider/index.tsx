import React, { useState, createContext } from "react";
import { View, Text } from "react-native";
import { AppStateDefaults} from "./types";

const appDefaults: AppStateDefaults = {
  score: 0,
  setScore: () => {},
};
export const AppProviderContext = createContext(appDefaults);
export const AppProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
}) => {
  const [score, setScore] = useState(0);
  return (
    <AppProviderContext.Provider
      value={{
        score,
        setScore
      }}
    >
      {props.children}
    </AppProviderContext.Provider>
  );
};

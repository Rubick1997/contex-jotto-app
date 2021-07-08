import React, { Dispatch, SetStateAction } from "react";
import { ReactNode } from "react";

type ContextType = [
  success: boolean,
  setSuccess: Dispatch<SetStateAction<boolean>>
];

type Props = {
  children: ReactNode;
  value?: ContextType;
};

const successContext = React.createContext<ContextType | undefined>(undefined);

const useSuccess = () => {
  const context = React.useContext(successContext);

  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider");
  }
  return context;
};

const SuccessProvider = (props: Props) => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo<ContextType>(
    () => [success, setSuccess],
    [success]
  );

  return (
    <successContext.Provider value={value} {...props}>
      {props.children}
    </successContext.Provider>
  );
};

export { SuccessProvider, useSuccess };

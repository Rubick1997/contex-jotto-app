import React, { FunctionComponent } from "react";

const successContext = React.createContext({});

const useSuccess = () => {
  const context = React.useContext(successContext);

  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider");
  }

  return context;
};

const SuccessProvider: FunctionComponent = (props: Object): JSX.Element => {
  const [success, setSuccess] = React.useState(false);

  const value = React.useMemo(() => [success, setSuccess], [success]);
  return <successContext.Provider value={value} {...props} />;
};

export { SuccessProvider, useSuccess };

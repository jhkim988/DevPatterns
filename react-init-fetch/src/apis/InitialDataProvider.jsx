import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const InitialDataContext = React.createContext({});

export const InitialDataProvider = ({ children, promises, callback }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all(promises).then((resArr) => callback(resArr, setData));
  }, [callback, promises]);

  const dataMemo = useMemo(() => {
    return data;
  }, [data]);

  return (
    <InitialDataContext.Provider value={dataMemo}>
      {children}
    </InitialDataContext.Provider>
  );
};

InitialDataProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  promises: PropTypes.arrayOf(
    PropTypes.shape({
      then: PropTypes.func.isRequired,
      catch: PropTypes.func.isRequired,
    })
  ),
  callback: PropTypes.func,
};

import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { fetchMock as fetch } from "./fetchMock";

export const InitialDataContext = React.createContext({});

export const InitialDataProvider = ({ children, config }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all(
      Object.values(config).map((req) => fetch(req.url, req.args))
    ).then((resArr) => {
      const newData = {};
      Object.entries(config).forEach(
        (el, idx) => (newData[el[0]] = resArr[idx])
      );
      setData(newData);
    });
  }, []);

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
  config: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      args: PropTypes.any,
    })
  ),
};

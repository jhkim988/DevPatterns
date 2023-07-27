import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { fetchMock as fetch } from "./fetchMock";

// initial fetch config
const initReq = {
  test1: {
    id: "test1",
    url: "test URL1",
    args: "?id=testId",
  },
  test2: {
    id: "test2",
    url: "test URL2",
    args: {
      param1: "frog",
      param2: "jump",
    },
  },
};

export const InitialDataContext = React.createContext({});

export const InitialDataProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all(
      Object.values(initReq).map((req) => fetch(req.url, req.args))
    ).then((resArr) => {
      const newData = {};
      Object.entries(initReq).forEach(
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
};

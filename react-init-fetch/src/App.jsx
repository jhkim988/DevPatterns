import PropTypes from "prop-types";
import { InitialDataProvider } from "./apis/InitialDataProvider";
import { useInitialData } from "./apis/useInitialData";
import { fetchMock } from "./apis/fetchMock";

// out of component or useMemo
const promises = [
  fetchMock("/localhost/test0", undefined, "mock response test0"),
  fetchMock(
    "/localhost/test1",
    { param1: "frog", param2: "jump" },
    "mock response test1"
  ),
];

const callback = (resArr, set) => {
  const data = {};
  data.test0 = resArr[0];
  data.test1 = resArr[1];
  set(data);
};

function App() {
  return (
    <InitialDataProvider promises={promises} callback={callback}>
      <Test1 />
      <Test2 />
      <Test3>
        <Test4 />
      </Test3>
    </InitialDataProvider>
  );
}

const Test1 = () => {
  const { test0 } = useInitialData();
  console.log("Test1 Render", test0);
  return <div>test1</div>;
};

const Test2 = () => {
  console.log("Test2 Render");
  return <div>test2</div>;
};

const Test3 = ({ children }) => {
  console.log("Test3 Render");
  return (
    <div>
      test3
      {children}
    </div>
  );
};

Test3.propTypes = {
  children: PropTypes.element,
};

const Test4 = () => {
  const { test1 } = useInitialData();
  console.log("Test4 Render", test1);
  return <div>test4</div>;
};
export default App;

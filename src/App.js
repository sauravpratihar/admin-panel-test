import React from "react";
import Layout from "./components/Layout";
import Bank from "./components/Bank";
import { AppProvider } from "./AppContext";

import "./App.css";

const context = {
  CITIES: ["MUMBAI", "BANGALORE", "PUNE", "DELHI"],
  rowPerPage: 10,
};
function App() {
  return (
    <AppProvider value={context}>
      <Layout>
        <Bank />
      </Layout>
    </AppProvider>
  );
}

export default App;

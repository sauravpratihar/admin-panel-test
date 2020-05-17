import React from "react";
import Layout from "./components/Layout";
import Bank from "./components/Bank";
import { AppProvider } from "./AppContext";
import "./App.css";
const context = {};

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

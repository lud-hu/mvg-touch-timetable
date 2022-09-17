import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RouteView from "./components/RouteView";
import ConnectionEntry from "./components/RouteView/ConnectionEntry";
import testdata from "./components/RouteView/testData.json";
import StationsGrid from "./components/StationsGrid/StationsGrid";

function MyComp() {
  return <ConnectionEntry connection={testdata as any} />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<StationsGrid />} />
          <Route path="/route" element={<RouteView />} />
          {/* <Route path="/test" element={<MyComp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

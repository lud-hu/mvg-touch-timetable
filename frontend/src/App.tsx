import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ConnectionsView from "./components/RouteView/ConnectionsView";
import StationsGrid from "./components/StationsGrid/StationsGrid";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d min",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<StationsGrid />} />
          <Route path="/route" element={<ConnectionsView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

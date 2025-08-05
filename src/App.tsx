import { HashRouter, Routes, Route } from "react-router-dom";
import Component from "./data-fetching/component";
import CustomComp from "./data-fetching/useCustom";
import LoadingComp from "./data-fetching/useLoading";
import PollComp from "./data-fetching/usePoll";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/data" element={<Component/>}/>
        <Route path="/data/custom" element={<CustomComp/>}/>
        <Route path="/data/load" element={<LoadingComp/>}/>
        <Route path="/data/poll" element={<PollComp/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App

import React, { Profiler, useState } from "react";

import HighWorkWithRedux from "./examples/high/HighWorkWithRedux";
import HighWorkWithAsync from "./examples/high/HighWorkWithAsync";
import MediumWorkWithRedux from "./examples/medium/MediumWorkWithRedux";
import MediumWorkWithAsync from "./examples/medium/MediumWorkWithAsync";
import Simple from "./examples/simple/Simple";
import Test from "./examples/test/Test";
import Test2 from "./examples/test/Test2";
import TestWithFocus from "./examples/test/TestWithFocus";
import { Button } from "@mui/material";

import "./App.css";

function App() {
  const [view, setView] = useState<number>(0)
  function onRenderCallback(
    id: string, // the "id" prop of the Profiler tree that has just committed
    phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration: number, // time spent rendering the committed update
    baseDuration: number, // estimated time to render the entire subtree without memoization
    startTime: number, // when React began rendering this update
    commitTime: number, // when React committed this update
    interactions: any // the Set of interactions belonging to this update
  ) {
    // console.log('==========>phase', phase);
    // console.log('==========>actualDuration', actualDuration);
    // console.log('==========>baseDuration', baseDuration);
    // console.log('==========>startTime', startTime);
    // console.log('==========>commitTime', commitTime);
  }
  return (
    <Profiler id="app" onRender={onRenderCallback} >
      <div className="App">
        <Button variant={view === 0 ? "contained" : 'outlined'} onClick={() => setView(0)}>Без фокуса</Button>
        <Button variant={view === 1 ? "contained" : 'outlined'} onClick={() => setView(1)}>С фокусом</Button>
        {view === 0 && <Test2 />}
        {view === 1 && <TestWithFocus />}
      </div>
    </Profiler>
  );
}

export default App;

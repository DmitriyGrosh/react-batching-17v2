import React, { Profiler } from "react";

import HighWorkWithRedux from "./examples/high/HighWorkWithRedux";
import HighWorkWithAsync from "./examples/high/HighWorkWithAsync";
import MediumWorkWithRedux from "./examples/medium/MediumWorkWithRedux";
import MediumWorkWithAsync from "./examples/medium/MediumWorkWithAsync";
import Simple from "./examples/simple/Simple";
import Test from "./examples/test/Test";

import "./App.css";

function App() {
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
        {/*<HighWorkWithRedux />*/}
        {/*<HighWorkWithAsync />*/}
        {/*<MediumWorkWithRedux />*/}
        {/*<MediumWorkWithAsync />*/}
        {/*<Simple />*/}
        <Test />
      </div>
    </Profiler>
  );
}

export default App;

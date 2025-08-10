import Dashboard from "./Dashboard";
import GridView from "./GridView";
import { Description } from "./Description";
import { NoPossiblePathsModal } from "./NoPossiblePathsModal";

const App = () => (
  <div className="bg-slate-900 text-white">
    <div className="mx-auto max-w-6xl">
      <Description />
      <Dashboard />
      <GridView />
    </div>
    <NoPossiblePathsModal />
  </div>
);

export default App;

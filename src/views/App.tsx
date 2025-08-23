import { Toolbar } from "./Toolbar";
import { PathFindingMap } from "./PathFindingMap";
import { Description } from "./Description";
import { NoPossiblePathsModal } from "./NoPossiblePathsModal";
import { AppContextProvider } from "@components/providers/AppContextProvider";

export const App = () => (
  <AppContextProvider>
    <div className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl">
        <Description />
        <Toolbar />
        <PathFindingMap />
      </div>
      <NoPossiblePathsModal />
    </div>
  </AppContextProvider>
);

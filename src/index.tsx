import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { PathFindingContextProvider } from './contexts/PathFindingContext/PathFindingContextProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PathFindingContextProvider>
      <App />
    </PathFindingContextProvider>
  </StrictMode>,
);

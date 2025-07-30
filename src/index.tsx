import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { PathFindingContextProvider } from './contexts/PathFindingContext/PathFindingContextProvider';
import { UserActionContextProvider } from './contexts/UserActionContext/UserActionContextProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PathFindingContextProvider>
      <UserActionContextProvider>
        <App />
      </UserActionContextProvider>
    </PathFindingContextProvider>
  </StrictMode>,
);

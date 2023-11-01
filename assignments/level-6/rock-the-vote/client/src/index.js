import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './Contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { IssueContextProvider } from './Contexts/IssueContext';
import { CommentContextProvider } from './Contexts/CommentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <UserContextProvider>
      <IssueContextProvider>
        <CommentContextProvider>
          <App />
        </CommentContextProvider>
      </IssueContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
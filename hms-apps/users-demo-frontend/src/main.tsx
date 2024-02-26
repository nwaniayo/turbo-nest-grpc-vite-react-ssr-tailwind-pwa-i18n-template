import React, { Suspense } from 'react'
// import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
// import i18n
import './global/i18n.js'; //ignoring TS for now. To use TS see https://www.i18next.com/overview/typescript
import Loading from './global/Loading.tsx';


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )


//@ts-ignore
hydrateRoot(document, <React.StrictMode><Suspense loading={<Loading />}><BrowserRouter><App assetMap={window.assetMap} /></BrowserRouter></Suspense></React.StrictMode>);
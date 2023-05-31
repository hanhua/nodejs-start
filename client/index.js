import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const root_elem = document.querySelector('#root');
if (! root_elem) {
    throw new Error("The root element does not exit");
}
const root = createRoot(root_elem);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
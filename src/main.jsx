import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App.jsx'
import ParkSearchProvider from "./context/ParkSearchContext/ParkSearchContext.jsx";
import AuthContextProvider from "./context/AuthContext/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <ParkSearchProvider>
                    <App/>
                </ParkSearchProvider>
            </AuthContextProvider>
        </Router>
    </StrictMode>,
)

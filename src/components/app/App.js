import { BrowserRouter as Router } from 'react-router';

import MainContent from '../mainContent/MainContent';
import AppHeader from "../appHeader/AppHeader";

// import { MainPage, ComicsPage, SingleComicPage } from "../pages";
// import { Page404 } from "../pages/404"

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <MainContent />
            </div>
        </Router>
    )
}

export default App;
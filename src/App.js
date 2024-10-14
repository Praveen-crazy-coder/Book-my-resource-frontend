import './App.css';
import {useContext} from 'react';
import Header from "./header/Header";
import NavBar from "./nav-bar/NavBar";
import CreateResource from "./create-resource/Create-resource";
import {ResourceProvider} from "./contexts/ResourceListContext";
import BookResource from "./book-resource/Book-resource"
import {Route, Routes} from "react-router-dom";
import Auth from "./auth/auth";
import AuthenticatedRoute from "./customRoutes/AuthenticatedRoute";
import {AuthContext} from "./contexts/AuthContext";

function App() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <ResourceProvider>
            <div className="app">
                {isAuthenticated && <><Header/><NavBar/></>} {/*condition for Header and NavBar*/}
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/create-resource" element={
                        <AuthenticatedRoute>
                            <CreateResource />
                        </AuthenticatedRoute>
                    }/>
                    <Route path="/book-resource" element={
                        <AuthenticatedRoute>
                            <BookResource />
                        </AuthenticatedRoute>
                    }/>
                </Routes>
            </div>
        </ResourceProvider>
    )
}

export default App;

import './App.css';
import Header from "./header/Header";
import NavBar from "./nav-bar/NavBar";
import CreateResource from "./create-resource/Create-resource";
import {ResourceProvider} from "./contexts/ResourceListContext";
import BookResource from "./book-resource/Book-resource"
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <ResourceProvider>
              <div className="app">
                  <Header />
                  <NavBar />

                  {/* Define the routes for different components */}
                  <Routes>
                      <Route path="/create-resource" element={<CreateResource />} />
                      <Route path="/book-resource" element={<BookResource />} />
                  </Routes>
              </div>
      </ResourceProvider>
  )
}

export default App;

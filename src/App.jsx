import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/layout/Header/Header"; 
import HomePage from "./pages/HomePage/HomePage"; 
import CatalogPage from "./pages/CatalogPage/CatalogPage"; 
import CamperDetailPage from "./pages/CamperDetailPage/CamperDetailPage"; 
import "./styles/global.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:id" element={<CamperDetailPage />} />
            </Routes>
          </main>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
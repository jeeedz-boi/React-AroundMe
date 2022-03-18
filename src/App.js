import './App.css';
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./app/pages/home/homePage"
import { ProfilePage } from "./app/pages/profile/profilePage"
import { LoginPage } from "./app/pages/login/loginPage"
import { ResultPage } from './app/pages/results/resultPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;

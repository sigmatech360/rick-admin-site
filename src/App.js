import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";
import { UserProfileProvider } from './context/UserProfileContext';

function App() {
  return (
    <UserProfileProvider>

      <AdminRouter />
    </UserProfileProvider>
  );
}

export default App;

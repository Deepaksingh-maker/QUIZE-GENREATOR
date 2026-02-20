import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { token } = useAuth();
  return token ? <DashboardPage /> : <LoginPage />;
};

export default App;

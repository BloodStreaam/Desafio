import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import './App.css';
import Formulario from './pages/formulario/formulario';
import Confirmacao from './pages/confirmacao/confirmacao';

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Formulario /> },
    { path: "/confirmacao", element: <Confirmacao />}
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

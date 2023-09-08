import logo from './logo.svg';
import './App.css';
import { RouteStore } from './Routes';
import { ThemeProvider } from '@mui/material';
import Theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <RouteStore/>
      </div>
    </ThemeProvider>
  );
}

export default App;

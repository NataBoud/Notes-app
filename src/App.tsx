import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./routes/AppRouter";
import { ThemeProviderCustom } from "./context/ThemeProviderCustom";

function App() {

  return (
    <ThemeProviderCustom >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProviderCustom>
  );
}

export default App;

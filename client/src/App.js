import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import MenuHome from './components/MenuHome';
import MainLayout from './components/MainLayout';
import GlobalStyles from './components/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainLayout>
        <MenuHome></MenuHome>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;

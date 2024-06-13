import { Box } from "@mui/material";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Header />
      <Box style={{ marginTop: 55 }}>
        <Home />
      </Box>
    </AppProvider>
  );
}

export default App;

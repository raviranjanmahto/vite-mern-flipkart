import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { AppProvider } from "./context/AppContext";

// components
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DetailView from "./components/details/DetailView";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 55 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<DetailView />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

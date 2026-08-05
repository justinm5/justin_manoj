import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Route, Routes } from "react-router";
import Ask from "./pages/Ask";
import Books from "./pages/Books";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/books" element={<Books />} />
      <Route path="/ask" element={<Ask />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Analytics />
  </BrowserRouter>
);

export default App;

import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import PrescriptionDetailPage from "./pages/PrescriptionDetailPage";

const App = () => {
  return (
    <div>
      {/* <div data-theme="forest"> */}
      <div className="relative h-full w-full">
        <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(75,205,238,.5)_100%)]" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route
            path="/prescription/:id"
            element={<PrescriptionDetailPage />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

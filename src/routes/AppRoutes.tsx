import { Routes, Route } from "react-router-dom";
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BacklogScreen />} />
      <Route path="/sprintScreen/:idsprint" element={<SprintScreen />} />
    </Routes>
  );
}



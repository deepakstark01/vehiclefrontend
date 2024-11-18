import { Route, Routes, Navigate } from "react-router-dom";
import NotFoundPage from "../pages/404/PageNotFound";
import { getUser } from "../utils/utils";
import AuthPage from "../Pages/Auth/Authpages";
import MainLayout from "../Pages/MainLayout";
import Search from "../Pages/Search";
import GenrateApiKey from "../Pages/APiCreate/GenrateApiKey";
import PrivateRoutes from "./PrivateRoutes";

export const AppRoutes = () => {
  const localStorageData = getUser();
  const isAuthenticated = localStorageData?.message === "Login successful";

  return (
    <Routes>
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/search" />} />
        <Route path="search" element={<Search />} />
        <Route element={<PrivateRoutes />}>
          
          <Route path="genratekey" element={<GenrateApiKey />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
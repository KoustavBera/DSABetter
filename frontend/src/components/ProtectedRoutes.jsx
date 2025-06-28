// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthDataContext } from "../../context/AuthContext";
import SkeletonLoaderComponent from "./SkeletonLoaderComponent";

const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useContext(AuthDataContext);

  if (loading) return <SkeletonLoaderComponent />;

  return userData ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(selectCurrentToken)
    if (!token) {
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    return children;
}

export default ProtectedRoute;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "utils/account";

export const AuthAccess = (props: any) => {
  const navigate = useNavigate();
  const { children } = props;
  
  useEffect(() => {
    if (loginCheck()) {
      navigate('/dashboard')
    }
  }, [])
  
  return <>{children}</>
};

export default AuthAccess;

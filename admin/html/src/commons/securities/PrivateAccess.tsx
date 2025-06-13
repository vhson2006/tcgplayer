import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "utils/account";

export const PrivateAccess = (props: any) => {
  const navigate = useNavigate();
  const { children } = props;
  
  useEffect(() => {
    if (false === loginCheck()) {
      navigate('/authentication')
    }
  }, [])
  
  return <>{children}</>
};

export default PrivateAccess;

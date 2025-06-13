import { actions } from "components/dashboard/account/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "@chakra-ui/react";
import { FormButton } from "modules/buttons/FormButton";
import { Fragment, useRef } from "react";
import ProfileForm from "components/dashboard/account/forms/ProfileForm";

const ProfilePage = (props: any) => {
  const dispatch = useDispatch();
  const submitRef = useRef<any>(null);
  const submitHandler = (e: any) => {
    submitRef.current.click();
  };
  
  useEffect(() => {
    dispatch(actions.FETCH_PROFILE())
  }, []);
  
  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='save' onClick={submitHandler} />
      </HStack>
      <ProfileForm submitRef={submitRef}/>
    </Fragment>
  )
}

export default ProfilePage;
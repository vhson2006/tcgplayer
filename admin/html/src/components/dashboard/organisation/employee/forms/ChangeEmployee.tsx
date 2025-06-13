import { Stack, VisuallyHidden, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { defaultForm } from "utils/form";
import { useState } from "react";
import { actions } from "commons/modals/slice";
import { useDispatch, useSelector } from "react-redux";
import { actions as employeeActions } from 'components/dashboard/organisation/employee/slice';
import ChangeStatusSelect from "../inputs/ChangeEmployeeStatus";
import { MASS_CHANGE_EMPLOYEE_MODAL } from "../popups/ChangeEmployeeModal";
import { usePath } from "utils/link";

const MassChangeEmployeeForm = (props: any) => {
  const [ employeeStatus, handleSetEmployeeStatus ] = useState<any>();
  const { selected } = useSelector((state: any) => state.employeesReducer)
  const { buttonRef } = props;
  const { params } = usePath();
  const dispatch = useDispatch();
  const form = defaultForm(useForm);

  const massChangeEmployeeHandler = (data: any) => {
    dispatch(employeeActions.MASS_CHANGE_ASYNC({
      selected, 
      status: employeeStatus?.value, 
      params
    }));
    dispatch(actions.CLOSE_MODAL(MASS_CHANGE_EMPLOYEE_MODAL));
  }

  return (
    <form onSubmit={form.handleSubmit(massChangeEmployeeHandler)}>
      <Stack spacing={5}>
        <ChangeStatusSelect value={employeeStatus} onChange={(value: any) => handleSetEmployeeStatus(value)}/>
        <VisuallyHidden>
          <Button ref={buttonRef} type='submit'/>
        </VisuallyHidden>
      </Stack>
    </form>
  )
}

export default MassChangeEmployeeForm
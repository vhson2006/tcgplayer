import { Stack, Button, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { defaultForm } from "utils/form";
import { useState } from "react";
import { actions } from "commons/modals/slice";
import { actions as employeeActions } from "components/dashboard/organisation/employee/slice";
import { useDispatch } from "react-redux";
import AddEmployeeRole from "components/dashboard/organisation/employee/inputs/AddEmployeeRole";
import { ADD_EMPLOYEE_DRAWER } from "../popups/AddEmployeeDrawer";
import TextInput from "modules/forms/TextInput";
import EmployeeDatePicker from "../inputs/EmployeeDatePicker";
import AddEmployeeAvatar from "../inputs/AddEmployeeAvatar";
import AddEmployeeStatus from "../inputs/AddEmployeeStatus";
import { usePath } from "utils/link";
import TextAreaInput from "modules/forms/TextAreaInput";

const AddEmployeeForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ employeeRole, handleSetEmployeeRole ] = useState<any>();
  const [ employeeDob, handleSetEmployeeDob ] = useState<Date>(new Date());
  const [ employeeStatus, handleSetEmployeeStatus ] = useState<any>();
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const { buttonRef } = props;
  const { params } = usePath();

  const addEmployeeHandler = (data: any) => {
    if (employeeDob) {
      data.dob = employeeDob
    }
    if (employeeRole) {
      data.role = employeeRole.value
    }
    if (employeeStatus) {
      data.status = employeeStatus.value
    }
    if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
      data.avatar = uploadedFiles[0]?.id
    }
    dispatch(employeeActions.ADD_ASYNC({...data, params}))
  }

  return (
    <form onSubmit={form.handleSubmit(addEmployeeHandler)}>
      <Stack spacing={5}>
        <TextInput {...form} typical='name' />
        <TextInput {...form} typical='phone' />
        <TextInput {...form} typical='email' />
        <TextInput {...form} typical='cmnd' />
        <TextAreaInput {...form} typical='address' />
        <AddEmployeeRole value={employeeRole} onChange={(value: any) => handleSetEmployeeRole(value)} />
        <EmployeeDatePicker 
          value={employeeDob} 
          onChange={(value: any) => handleSetEmployeeDob(value)}
        />
        <AddEmployeeStatus 
          isRequired 
          value={employeeStatus} 
          onChange={(value: any) => handleSetEmployeeStatus(value)}
        />
        <AddEmployeeAvatar 
          uploadedFiles={uploadedFiles} 
          setUploadedFiles={setUploadedFiles} 
        />
        <VisuallyHidden>
          <Button ref={buttonRef} type='submit'/>
        </VisuallyHidden>
      </Stack>
    </form>
  )
}

export default AddEmployeeForm
import { HStack, Stack, } from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actions } from "components/dashboard/organisation/employee/slice";
import { defaultForm } from "utils/form";
import { useForm } from "react-hook-form";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import LeftView from "components/dashboard/organisation/employee/forms/LeftView";
import RightView from "components/dashboard/organisation/employee/forms/RightView";

const EditEmployeePage = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const location = useLocation();
  const [ employeeRole, handleSetEmployeeRole ] = useState<any>();
  const [ employeeDob, handleSetEmployeeDob ] = useState<Date>(new Date());
  const [ employeeStatus, handleSetEmployeeStatus ] = useState<any>();
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const { employeeId } = useParams();
  const { isRequesting } = useSelector((state: any) => state.employeesReducer); 

  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(employeeId))
  }, []);

  const saveHandler = (data: any) => {
    if (employeeDob) {
      data.dob = employeeDob
    }

    if (Array.isArray(employeeRole) && employeeRole.length > 0) {
      data.role = employeeRole[0]?.value
    }

    if (Array.isArray(employeeStatus) && employeeStatus.length > 0) {
      data.status = employeeStatus[0]?.value
    }

    if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
      data.avatar = uploadedFiles[0]?.id
    }
    const updateData = {
      ...data,
      id: employeeId,
    };
    setUploadedFiles([])
    dispatch(actions.UPDATE_ASYNC(updateData));
  }

  return (
    <form onSubmit={form.handleSubmit(saveHandler)}>
      <HStack pb={5} >
        <FormButton typical='list' permission="employee.view" as={Link} to={makeUrl('/dashboard/organisation', location)} />
        <FormButton typical='view' permission="employee.view" as={Link} to={makeUrl(`/dashboard/organisation/${employeeId}`, location)} />
        <FormButton typical='save' permission="employee.update" type="submit" isDisabled={isRequesting}/>
      </HStack>
      <Stack direction={{ base: 'column', xl: 'row' }} justify="space-between">
        <LeftView form={form}/>
        <RightView 
          employeeDob={employeeDob}
          handleSetEmployeeDob={handleSetEmployeeDob}
          employeeRole={employeeRole}
          handleSetEmployeeRole={handleSetEmployeeRole}
          employeeStatus={employeeStatus}
          handleSetEmployeeStatus={handleSetEmployeeStatus}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </Stack>
    </form>
  )
}

export default EditEmployeePage;
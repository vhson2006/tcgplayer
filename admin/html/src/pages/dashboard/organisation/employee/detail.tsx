import { HStack, Stack } from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { actions } from "components/dashboard/organisation/employee/slice";
import { defaultForm } from "utils/form";
import { useForm } from "react-hook-form";
import { FormButton } from "modules/buttons/FormButton";
import { makeUrl } from "utils/link";
import LeftView from "components/dashboard/organisation/employee/forms/LeftView";
import RightView from "components/dashboard/organisation/employee/forms/RightView";

const DetailEmployeePage = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const location = useLocation();
  const [ employeeRole, handleSetEmployeeRole ] = useState<any>();
  const [ employeeDob, handleSetEmployeeDob ] = useState<Date>(new Date());
  const [ employeeStatus, handleSetEmployeeStatus ] = useState<any>();
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(actions.GET_DETAIL_ASYNC(employeeId))
  }, []);

  return (
    <Fragment>
      <HStack pb={5} >
        <FormButton typical='list' permission="employee.view" as={Link} to={makeUrl('/dashboard/organisation', location)} />
        <FormButton typical='edit' permission="employee.update" as={Link} to={makeUrl(`/dashboard/organisation/${employeeId}/edit`, location)} />
      </HStack>
      <Stack direction={{ base: 'column', xl: 'row' }} justify="space-between">
        <LeftView form={form} isDisabled/>
        <RightView 
          isDisabled
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
    </Fragment>
  )
}

export default DetailEmployeePage;
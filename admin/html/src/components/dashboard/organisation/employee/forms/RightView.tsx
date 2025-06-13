import { Stack, StackDivider, Card, CardBody } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ViewEmployeeRole from "components/dashboard/organisation/employee/inputs/ViewEmployeeRole";
import EmployeeDatePicker from "components/dashboard/organisation/employee/inputs/EmployeeDatePicker";
import ViewEmployeeStatus from "components/dashboard/organisation/employee/inputs/ViewEmployeeStatus";
import EmployeeAvatar from "components/dashboard/organisation/employee/inputs/EmployeeAvatar";

const RightView = (props: any) => {
  const { 
    isDisabled,
    employeeDob, handleSetEmployeeDob,
    employeeRole, handleSetEmployeeRole,
    employeeStatus, handleSetEmployeeStatus,
    uploadedFiles, setUploadedFiles,
  } = props;
  const { detail } = useSelector((state: any) => state.employeesReducer); 

  useEffect(() => {
    handleSetEmployeeDob(detail?.dob)
  }, [detail?.dob]);

  return (
    <Card w='50%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <EmployeeDatePicker 
            value={employeeDob} 
            onChange={(value: any) => handleSetEmployeeDob(value)}
            isDisabled={isDisabled}
          />
          <ViewEmployeeRole 
            isRequired 
            value={employeeRole} 
            onChange={(value: any) => handleSetEmployeeRole(value)}
            isDisabled={isDisabled}
          />
          <ViewEmployeeStatus 
            isRequired 
            value={employeeStatus} 
            onChange={(value: any) => handleSetEmployeeStatus(value)}
            isDisabled={isDisabled}
          />
          <EmployeeAvatar 
            uploadedFiles={uploadedFiles} 
            setUploadedFiles={setUploadedFiles} 
            isDisabled={isDisabled}
          />
        </Stack>  
      </CardBody>
    </Card>
  )
}

export default RightView;
import { Stack, HStack, VisuallyHidden, FormControl } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { createQuery, usePath } from "utils/link";
import { defaultForm } from "utils/form";
import { useLocation, useNavigate } from "react-router-dom";
import FloatTextInput from "modules/forms/FloatTextInput";
import SearchEmployeeRole from "components/dashboard/organisation/employee/inputs/SearchEmployeeRole";
import SearchEmployeeStatus from "components/dashboard/organisation/employee/inputs/SearchEmployeeStatus";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "commons/drawers/slice";
import { actions as modalActions} from 'commons/modals/slice';
import { ADD_EMPLOYEE_DRAWER } from "components/dashboard/organisation/employee/popups/AddEmployeeDrawer";
import { MASS_CHANGE_EMPLOYEE_MODAL } from "components/dashboard/organisation/employee/popups/ChangeEmployeeModal";
import { FormButton } from "modules/buttons/FormButton";
import { DOWNLOAD_CONFIRMATION_MODAL } from "commons/modals/components/DownloadConfirmationModal";
import notify from "utils/notify";
import { downloadFile } from "utils/api";
import { t, useFormatMessage } from "commons/languages/helper";
import FileImporter from "modules/forms/FileImporter";
import { importEmployee } from "../api";
import { common } from "commons/config";

export const SearchEmployeeForm = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [ employeeRole, handleSetEmployeeRole ] = useState<any>();
  const [ employeeStatus, handleSetEmployeeStatus ] = useState<any>();
  const { params } = usePath();
  const { selected } = useSelector((state: any) => state.employeesReducer)
  const defaultFilter = {...{ search: null }, ...params}
  const form = defaultForm(useForm);
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

  useEffect(() => {
    form.setValue('search', defaultFilter.search)
  }, []);

  const searchEmployee = (data: any) => {
    if (employeeRole) {
      data.role = employeeRole.map((r: any) => r.value)
    } else {
      data.role = null
    }

    if (employeeStatus) {
      data.status = employeeStatus.value
    } else {
      data.status = null
    }

    const newQuery = createQuery({
      ...params,
      ...data,
    })
    navigate(`${location.pathname}?${newQuery}`)
  }
  
  const addEmployeeHandler = () => {
    dispatch(actions.OPEN_DRAWER({ type: ADD_EMPLOYEE_DRAWER, size: 'lg', data: {} }))
  }

  const massChangeHandler = () => {
    dispatch(modalActions.OPEN_MODAL({ type: MASS_CHANGE_EMPLOYEE_MODAL }));
  }
  
  const downloadHandler = useCallback(() => {
    const executeAndClose = async () => {
      try {
        await downloadFile('/api/employee/download', 'employee.csv', activedLanguage);
        notify.success(t('message.success'))
      } catch(error) {
        notify.error(t('message.error'))
      } finally {
        dispatch(modalActions.CLOSE_MODAL(DOWNLOAD_CONFIRMATION_MODAL))
      }
    }

    dispatch(modalActions.OPEN_MODAL({ 
      type: DOWNLOAD_CONFIRMATION_MODAL, 
      data: { next: executeAndClose } 
    }))
  }, []);
  
  const importHandler = async (data: any) => {
    const response = await importEmployee(data)
    if (response.status === common.INCORRECT) {
      notify.error(`${JSON.stringify(response.data)}`)
    } else {
      notify.success(t('message.success'))
    }
  }
  
  return (
    <form onSubmit={form?.handleSubmit(searchEmployee)}>
      <Stack spacing={5} >
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
          <FloatTextInput {...form} typical='search' />
          <SearchEmployeeStatus value={employeeStatus} onChange={(value: any) => handleSetEmployeeStatus(value)} />
          <SearchEmployeeRole isMulti={true} value={employeeRole} onChange={(value: any) => handleSetEmployeeRole(value)} />
          <FormControl>
            <VisuallyHidden>Checkmark</VisuallyHidden>
          </FormControl>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
          <Stack direction={{ base: 'column', md: 'row' }}>
            <HStack>
              <FormButton typical="add" permission="employee.create" onClick={addEmployeeHandler} />
              <FormButton typical="download" permission="employee.view" onClick={downloadHandler} />
            </HStack>
            <HStack>
              <FileImporter permission="employee.create" onChange={importHandler}/>
              <FormButton typical="massChange" permission="employee.update" isDisabled={!(Array.isArray(selected) && selected.length > 0)} onClick={massChangeHandler} />
            </HStack>
          </Stack>
          <HStack>
            <FormButton type="submit" permission="employee.view"  typical="search"  />
          </HStack>
        </Stack>
      </Stack>
    </form>
  )
}

export default SearchEmployeeForm
import { useCallback, useMemo } from 'react'
import { getColumns } from 'components/dashboard/organisation/employee/tables/Define'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { actions } from 'components/dashboard/organisation/employee/slice'
import { actions as modalActions } from 'commons/modals/slice'
import { t } from 'commons/languages/helper'
import { DELETE_CONFIRMATION_MODAL } from 'commons/modals/components/DeleteConfirmationModal'
import ResponsiveTable from 'modules/table/ResponsiveTable'
import { usePath } from 'utils/link'

const EmployeeList = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { list } = useSelector((state: any) => state.employeesReducer)
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { params } = usePath()

  const onSelect = useCallback((data: any) => {
    dispatch(actions.PUSH_SELECTED(data))
  }, []);

  const deleteEmployeeHandler = useCallback((id: any) => {
    const executeAndClose = () => {
      dispatch(actions.DELETE_ASYNC({ id, params }))
      dispatch(modalActions.CLOSE_MODAL(DELETE_CONFIRMATION_MODAL))
    }

    dispatch(modalActions.OPEN_MODAL({ 
      type: DELETE_CONFIRMATION_MODAL, 
      data: { next: executeAndClose } 
    }))
  }, []);
  
  return useMemo(() => 
    <ResponsiveTable 
      permissionGroup="employee"
      data={list || []} 
      columns={getColumns({t, location, activedLanguage, deleteEmployeeHandler})} 
      onSelect={onSelect}
    />
  , [list, activedLanguage]);
}

export default EmployeeList;
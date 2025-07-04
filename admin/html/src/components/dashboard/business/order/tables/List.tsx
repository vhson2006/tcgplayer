import ResponsiveTable from 'modules/table/ResponsiveTable'
import { t } from 'commons/languages/helper';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'components/dashboard/business/order/slice';
import { actions as modalActions} from 'commons/modals/slice';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { DELETE_CONFIRMATION_MODAL } from 'commons/modals/components/DeleteConfirmationModal';
import { getColumns } from 'components/dashboard/business/order/tables/Define';
import { usePath } from 'utils/link';

const OrderList = (props: any) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { list } = useSelector((state: any) => state.orderReducer);
  const { params } = usePath();
  
  const deleteOrderHandler = useCallback((id: any) => {
    const executeAndClose = () => {
      dispatch(actions.DELETE_ASYNC({id, params}))
      dispatch(modalActions.CLOSE_MODAL(DELETE_CONFIRMATION_MODAL))
    }

    dispatch(modalActions.OPEN_MODAL({ 
      type: DELETE_CONFIRMATION_MODAL, 
      data: { next: executeAndClose } 
    }))
  }, []);

  return useMemo(() => 
    <ResponsiveTable 
      data={list || []} 
      columns={getColumns({t, deleteOrderHandler, location, activedLanguage})} 
    />
  , [list])
}

export default OrderList
import ResponsiveTable from 'modules/table/ResponsiveTable'
import { getColumns } from 'components/dashboard/announce/news/tables/Define';
import { t } from 'commons/languages/helper';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'components/dashboard/announce/news/slice';
import { actions as modalActions} from 'commons/modals/slice';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { DELETE_CONFIRMATION_MODAL } from 'commons/modals/components/DeleteConfirmationModal';
import { usePath } from 'utils/link';

const NewsList = (props: any) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { lang } = props; 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { list } = useSelector((state: any) => state.newsReducer);
  const { params } = usePath();

  const deleteNewsHandler = useCallback((id: any) => {
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
      columns={getColumns({t, deleteNewsHandler, location, lang, activedLanguage})} 
    />
  , [list, lang])
}

export default NewsList
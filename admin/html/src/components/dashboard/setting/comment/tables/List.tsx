import ResponsiveTable from 'modules/table/ResponsiveTable'
import { t } from 'commons/languages/helper';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'components/dashboard/setting/comment/slice';
import { useCallback, useMemo } from 'react';
import { getColumns } from 'components/dashboard/setting/comment/tables/Define';

const CommentList = (props: any) => {
  const dispatch = useDispatch();
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { list } = useSelector((state: any) => state.commentReducer);

  const onSelect = useCallback((data: any) => {
    dispatch(actions.PUSH_SELECTED(data))
  }, []);

  return useMemo(() => 
    <ResponsiveTable 
      data={list || []} 
      columns={getColumns({t, activedLanguage})} 
      onSelect={onSelect}
    />
  , [list])
}

export default CommentList
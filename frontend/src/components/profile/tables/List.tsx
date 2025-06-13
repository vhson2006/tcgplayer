import ResponsiveTable from 'modules/table/ResponsiveTable'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getColumns } from './Define';
import useTranslation from 'next-translate/useTranslation';
import { actions } from '../slice';
import { usePath } from 'utils/link';

const OrderList = (props: any) => {
  const { order } = useSelector((state: any) => state.profile);
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();
  const { fullPath } = usePath();

  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC({}))
  }, []);

  useEffect(() => {
    dispatch(actions.GET_LIST_ASYNC({}))
  }, [fullPath]);


  return useMemo(() => 
    <ResponsiveTable 
      data={order || []} 
      columns={getColumns({t, lang})} 
    />
  , [order, lang])
}

export default OrderList
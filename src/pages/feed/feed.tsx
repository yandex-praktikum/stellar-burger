import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ordersSelectors } from '../../services/slices/ordersSlice';
import { getOrders } from '../../services/thunks/ordersThunks';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelectors.selectOrders);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getOrders());
  // }, [dispatch]);

  console.log(orders);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};

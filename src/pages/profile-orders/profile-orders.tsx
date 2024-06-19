import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { ordersSelectors } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector<TOrder[]>(ordersSelectors.selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};

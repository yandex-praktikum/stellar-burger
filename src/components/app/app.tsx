import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/thunks/ingredientsThunks';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { getCookie } from '../../utils/cookie';
import { userActions } from '../../services/slices/userSlice';
import { getUser } from '../../services/thunks/userThunks';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state?.locationState;

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    dispatch(fetchIngredients());

    if (accessToken) {
      dispatch(getUser());
    } else {
      dispatch(userActions.userInit());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={locationState || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {locationState && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

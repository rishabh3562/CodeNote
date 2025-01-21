import React, { Suspense, ReactNode } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { Oval } from 'react-loader-spinner';
const ProtectedRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const Fallback = ({ element }) => (
  <ErrorBoundary>
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#3949ab"
            ariaLabel="oval-loading"
            secondaryColor="#626ebc"
          />
        </div>
      }
    >
      {element}
    </Suspense>
  </ErrorBoundary>
);

const Wrapper = ({ element }) => {
  return (
    <ErrorBoundary>
      <Fallback element={element} />
    </ErrorBoundary>
  );
};

export { ProtectedRoute, Fallback, Wrapper };
// // SuspenseWrapper.jsx
// import React, { Suspense } from 'react';

// const SuspenseWrapper = ({ children, fallback }) => {
//   return (
//     <Suspense fallback={fallback || <div>Loading...</div>}>
//       {children}
//     </Suspense>
//   );
// };

// export default SuspenseWrapper;

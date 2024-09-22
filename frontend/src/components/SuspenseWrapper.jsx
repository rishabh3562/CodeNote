// SuspenseWrapper.jsx
import React, { Suspense } from 'react';

const SuspenseWrapper = ({ children, fallback }) => {
  return (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
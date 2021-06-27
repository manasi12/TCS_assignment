import React, { Suspense } from 'react';
import './App.css';

const DebitCardComponent = React.lazy(() => import('./components/DebitCard'));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading... </div>}>
        <DebitCardComponent />
      </Suspense>
    </div>
  );
}

export default App;

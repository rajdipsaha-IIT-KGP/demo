import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;

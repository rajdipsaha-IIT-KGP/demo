import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Welcome from './Pages/Welcome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/welcome" element={<Welcome />} /> 
    </Routes>
  );
}

export default App;

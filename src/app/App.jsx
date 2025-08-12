import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Goals from '../pages/Goals.jsx';
import Feedback from '../pages/Feedback.jsx';
import Feedback360 from '../pages/Feedback360.jsx';
import Appraisals from '../pages/Appraisals.jsx';
import Development from '../pages/Development.jsx';
import Privacy from '../pages/Privacy.jsx';
import Compliance from '../pages/Compliance.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="goals" element={<Goals />} />
        <Route path="development" element={<Development />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="feedback360" element={<Feedback360 />} />
        <Route path="appraisals" element={<Appraisals />} />
        <Route path="compliance" element={<Compliance />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

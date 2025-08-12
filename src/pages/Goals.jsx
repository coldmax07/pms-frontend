import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext.jsx';
import { mockGoals } from '../utils/mockData.js';

const Goals = () => {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState('');
  const [kpi, setKpi] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [goals, setGoals] = useState(mockGoals);
  const [showPending, setShowPending] = useState(true);

  const validate = () => {
    const err = {};
    if (!description) err.description = true;
    if (!kpi || isNaN(kpi)) err.kpi = true;
    if (!deadline || new Date(deadline) <= new Date()) err.deadline = true;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const newGoal = { id: goals.length + 1, description, kpi, deadline, status: 'Pending' };
    setGoals([...goals, newGoal]);
    toast.success('Goal submitted');
    setDescription('');
    setKpi('');
    setDeadline('');
  };

  const approve = (id, status) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, status } : g)));
    console.log(status, id);
  };

  return (
    <div>
      <h2 className="mb-3">Goals</h2>
      <div className="mb-4">
        <div className="mb-2">
          <label className="form-label" htmlFor="goalDesc">Description</label>
          <textarea id="goalDesc" className={`form-control ${errors.description ? 'is-invalid' : ''}`} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <div className="invalid-feedback">Required</div>
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="goalKpi">KPI</label>
          <input id="goalKpi" className={`form-control ${errors.kpi ? 'is-invalid' : ''}`} value={kpi} onChange={(e) => setKpi(e.target.value)} />
          <div className="invalid-feedback">Numeric required</div>
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="goalDeadline">Deadline</label>
          <input type="date" id="goalDeadline" className={`form-control ${errors.deadline ? 'is-invalid' : ''}`} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <div className="invalid-feedback">Future date required</div>
        </div>
        <button className="btn btn-primary" onClick={submit}>Submit for Approval</button>
      </div>
      {user.role === 'manager' && (
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="togglePending" checked={showPending} onChange={() => setShowPending(!showPending)} />
          <label className="form-check-label" htmlFor="togglePending">Show Pending Only</label>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>KPI</th>
            <th>Deadline</th>
            <th>Status</th>
            {user.role === 'manager' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {goals.filter((g) => (user.role === 'manager' && showPending ? g.status === 'Pending' : true)).map((g) => (
            <tr key={g.id}>
              <td>{g.description}</td>
              <td>{g.kpi}</td>
              <td>{g.deadline}</td>
              <td>{g.status}</td>
              {user.role === 'manager' && (
                <td>
                  <button className="btn btn-sm btn-success me-2" onClick={() => approve(g.id, 'Approved')}>Approve</button>
                  <button className="btn btn-sm btn-danger" onClick={() => approve(g.id, 'Rejected')}>Reject</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Goals;

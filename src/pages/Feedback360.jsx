import { useState } from 'react';
import { toast } from 'react-toastify';
import { mockUsers } from '../utils/mockData.js';
import StarRating from '../components/StarRating.jsx';

const Feedback360 = () => {
  const [peer, setPeer] = useState('');
  const [subordinate, setSubordinate] = useState('');
  const [manager, setManager] = useState('');
  const [answers, setAnswers] = useState({ teamwork: 0, leadership: 0, communication: 0 });

  const submit = () => {
    const data = { peer, subordinate, manager, answers };
    console.log('360 feedback', data);
    toast.success('360 feedback submitted');
  };

  return (
    <div>
      <h2 className="mb-3">360 Feedback</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label" htmlFor="peerSelect">Peer</label>
          <select id="peerSelect" className="form-select" value={peer} onChange={(e) => setPeer(e.target.value)}>
            <option value="">Select</option>
            {mockUsers.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="subSelect">Subordinate</label>
          <select id="subSelect" className="form-select" value={subordinate} onChange={(e) => setSubordinate(e.target.value)}>
            <option value="">Select</option>
            {mockUsers.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="manSelect">Manager</label>
          <select id="manSelect" className="form-select" value={manager} onChange={(e) => setManager(e.target.value)}>
            <option value="">Select</option>
            {mockUsers.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <p>Teamwork</p>
        <StarRating rating={answers.teamwork} setRating={(n) => setAnswers({ ...answers, teamwork: n })} />
        <p className="mt-3">Leadership</p>
        <StarRating rating={answers.leadership} setRating={(n) => setAnswers({ ...answers, leadership: n })} />
        <p className="mt-3">Communication</p>
        <StarRating rating={answers.communication} setRating={(n) => setAnswers({ ...answers, communication: n })} />
      </div>
      <button className="btn btn-primary mb-4" onClick={submit}>Submit</button>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Report</h5>
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Question</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Teamwork</td>
                <td>4.1</td>
              </tr>
              <tr>
                <td>Leadership</td>
                <td>3.8</td>
              </tr>
              <tr>
                <td>Communication</td>
                <td>4.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Feedback360;

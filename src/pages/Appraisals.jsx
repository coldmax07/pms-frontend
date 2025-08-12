import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import StarRating from '../components/StarRating.jsx';
import { UserContext } from '../context/UserContext.jsx';

const Appraisals = () => {
  const { user } = useContext(UserContext);
  const [kpi, setKpi] = useState('');
  const [comment, setComment] = useState('');
  const [managerComment, setManagerComment] = useState('');
  const [score, setScore] = useState(0);

  const submit = () => {
    const data = { kpi, comment, managerComment, score };
    console.log('appraisal', data);
    toast.success('Appraisal completed');
  };

  return (
    <div>
      <h2 className="mb-3">Appraisals</h2>
      <div className="mb-3">
        <label className="form-label" htmlFor="apKpi">KPI</label>
        <input id="apKpi" className="form-control" value={kpi} onChange={(e) => setKpi(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="apComment">Comments</label>
        <textarea id="apComment" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      </div>
      {user.role === 'manager' && (
        <>
          <div className="mb-3">
            <label className="form-label" htmlFor="apManager">Manager Comments</label>
            <textarea id="apManager" className="form-control" value={managerComment} onChange={(e) => setManagerComment(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <StarRating rating={score} setRating={setScore} />
          </div>
        </>
      )}
      <button className="btn btn-primary" onClick={submit}>Complete Appraisal</button>
    </div>
  );
};

export default Appraisals;

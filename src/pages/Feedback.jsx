import { useState } from 'react';
import { toast } from 'react-toastify';
import StarRating from '../components/StarRating.jsx';
import { mockUsers, mockFeedbackLog } from '../utils/mockData.js';

const Feedback = () => {
  const [recipient, setRecipient] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [log, setLog] = useState(mockFeedbackLog);

  const submit = () => {
    const err = {};
    if (!recipient) err.recipient = true;
    if (!comment) err.comment = true;
    setErrors(err);
    if (Object.keys(err).length) return;
    const entry = { id: log.length + 1, sender: 'You', comment, rating, timestamp: new Date().toISOString() };
    setLog([entry, ...log]);
    toast.success('Feedback submitted');
    console.log(entry);
    setRecipient('');
    setComment('');
    setRating(0);
  };

  return (
    <div>
      <h2 className="mb-3">Feedback</h2>
      <div className="mb-4">
        <div className="mb-2">
          <label htmlFor="fbRecipient" className="form-label">Recipient</label>
          <select id="fbRecipient" className={`form-select ${errors.recipient ? 'is-invalid' : ''}`} value={recipient} onChange={(e) => setRecipient(e.target.value)}>
            <option value="">Select</option>
            {mockUsers.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
          <div className="invalid-feedback">Required</div>
        </div>
        <div className="mb-2">
          <label htmlFor="fbComment" className="form-label">Comment</label>
          <textarea id="fbComment" className={`form-control ${errors.comment ? 'is-invalid' : ''}`} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          <div className="invalid-feedback">Required</div>
        </div>
        <div className="mb-2">
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <button className="btn btn-primary" onClick={submit}>Submit</button>
      </div>
      <ul className="list-group">
        {log.map((f) => (
          <li key={f.id} className="list-group-item">
            <strong>{f.sender}</strong>: {f.comment} ({f.rating}) - {f.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;

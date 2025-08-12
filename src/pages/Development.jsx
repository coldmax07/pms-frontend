import { useState, useContext, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { LanguageContext } from '../context/LanguageContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { mockIdps } from '../utils/mockData.js';

const Development = () => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const [goal, setGoal] = useState('');
  const [training, setTraining] = useState('');
  const [timeline, setTimeline] = useState('');
  const [errors, setErrors] = useState({});
  const [plans, setPlans] = useState(mockIdps);
  const [showManager, setShowManager] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [completionInput, setCompletionInput] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    setTimeout(() => {
      console.log('IDP page load', performance.now() - start, 'ms');
    }, 0);
  }, []);

  const validate = () => {
    const err = {};
    if (!goal.trim()) err.goal = true;
    if (!timeline || new Date(timeline) <= new Date()) err.timeline = true;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const blurGoal = () => setErrors((e) => ({ ...e, goal: !goal.trim() }));
  const blurTimeline = () => setErrors((e) => ({ ...e, timeline: !timeline || new Date(timeline) <= new Date() }));

  const savePlan = () => {
    if (!validate()) return;
    const newPlan = { id: plans.length + 1, goal, training, timeline, completion: 0, status: 'Pending' };
    setPlans([...plans, newPlan]);
    console.log('Saved plan', newPlan);
    toast.success(t('planSaved'), { className: 'bg-primary text-white' });
    setGoal('');
    setTraining('');
    setTimeline('');
  };

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setCompletionInput(plan.completion);
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
    setTimeout(() => {
      modalRef.current.querySelector('input')?.focus();
    }, 200);
  };

  const saveCompletion = () => {
    const value = parseInt(completionInput, 10);
    if (isNaN(value) || value < 0 || value > 100) return;
    setPlans(plans.map((p) => (p.id === selectedPlan.id ? { ...p, completion: value } : p)));
    console.log('Updated completion', selectedPlan.id, value);
    const modal = window.bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
  };

  const approve = (plan, decision) => {
    setPlans(plans.map((p) => (p.id === plan.id ? { ...p, status: decision } : p)));
    console.log(decision, plan.id);
  };

  return (
    <div>
      <h2 className="mb-3">{t('development')}</h2>
      <div className="mb-4">
        <div className="mb-2">
          <label className="form-label" htmlFor="idpGoal">{t('developmentGoal')}</label>
          <textarea id="idpGoal" aria-label={t('developmentGoal')} className={`form-control ${errors.goal ? 'is-invalid' : ''}`} value={goal} onChange={(e) => setGoal(e.target.value)} onBlur={blurGoal}></textarea>
          <div className="invalid-feedback">{t('required')}</div>
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="idpTraining">{t('trainingRecommendation')}</label>
          <input id="idpTraining" aria-label={t('trainingRecommendation')} className="form-control" value={training} onChange={(e) => setTraining(e.target.value)} />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="idpTimeline">{t('timeline')}</label>
          <input type="date" id="idpTimeline" aria-label={t('timeline')} className={`form-control ${errors.timeline ? 'is-invalid' : ''}`} value={timeline} onChange={(e) => setTimeline(e.target.value)} onBlur={blurTimeline} />
          <div className="invalid-feedback">{t('futureDate')}</div>
        </div>
        <button className="btn btn-primary" onClick={savePlan}>{t('savePlan')}</button>
      </div>
      <div className="row">
        {plans.map((plan) => (
          <div className="col-md-6 mb-3" key={plan.id}>
            <div className="card h-100" style={{ borderColor: '#0C5E3A' }}>
              <div className="card-body">
                <h5 className="card-title">{plan.goal}</h5>
                <p className="card-text">{plan.training}</p>
                <p className="card-text">{plan.timeline}</p>
                <div className="progress mb-2" role="progressbar" aria-label={t('completion')} aria-valuenow={plan.completion} aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar" style={{ width: `${plan.completion}%`, backgroundColor: '#01A94F' }}></div>
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => openModal(plan)}>{t('update')}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {user.role === 'manager' && (
        <>
          <div className="form-check form-switch my-3">
            <input className="form-check-input" type="checkbox" id="managerToggle" checked={showManager} onChange={() => setShowManager(!showManager)} />
            <label className="form-check-label" htmlFor="managerToggle">{t('managerView')}</label>
          </div>
          {showManager && (
            <table className="table">
              <thead>
                <tr>
                  <th>{t('developmentGoal')}</th>
                  <th>{t('trainingRecommendation')}</th>
                  <th>{t('timeline')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {plans.filter((p) => p.status === 'Pending').map((p) => (
                  <tr key={p.id}>
                    <td>{p.goal}</td>
                    <td>{p.training}</td>
                    <td>{p.timeline}</td>
                    <td>
                      <button className="btn btn-sm btn-success me-2" onClick={() => approve(p, 'Approved')}>{t('approve')}</button>
                      <button className="btn btn-sm btn-danger" onClick={() => approve(p, 'Rejected')}>{t('reject')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <div className="modal fade" tabIndex="-1" ref={modalRef} aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">{t('updateCompletion')}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label={t('close')}></button>
            </div>
            <div className="modal-body">
              <label htmlFor="completionInput" className="form-label">{t('completion')}</label>
              <input type="number" id="completionInput" aria-label={t('completion')} className="form-control" value={completionInput} onChange={(e) => setCompletionInput(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('close')}</button>
              <button type="button" className="btn btn-primary" onClick={saveCompletion}>{t('save')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Development;

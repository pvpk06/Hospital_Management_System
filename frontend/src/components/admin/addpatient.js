import React, { useState } from 'react';

const AddPatientForm = ({ onAddPatient }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = { id: Date.now(), name };
    onAddPatient(newPatient);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Patient</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Patient Name"
        required
      />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default AddPatientForm;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { InputText } from './common/Input';
import { emailValid } from '../utils/format';
import moment from 'moment';

const Profile = () => {
  const { users, loadUser, updateUser } = useContext(GlobalContext);
  const [name, setName] = useState(''),
        [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState(''),
        [errorEmail, setErrorEmail] = useState(false);
  const [date, setDate] = useState('');
  const [disableBtn, setDisableBtn] = useState(true),
        [disableCancel, setDisableCancel] = useState(true);

  const centerAlign = {
    height: 'calc(100vh - 56px)',
    display: 'flex',
    alignItems: 'center',
  };

  const itemValid = (item, errorItem) => {
    if (!item) setDisableBtn(true);
    else errorItem ? setDisableBtn(true) : setDisableBtn(false);
  };

  const handleName = useCallback(
    (e) => {
      setDisableCancel(false);
      setName(e.target.value);
      if (e.target.value.length >= 3) {
        setErrorName(false);
        itemValid(email, errorEmail);
      } else {
        setErrorName(true);
        setDisableBtn(true);
      }
    },
    [email, errorEmail]
  );

  const handleEmail = useCallback(
    (e) => {
      setDisableCancel(false);
      setEmail(e.target.value);
      if (emailValid(e.target.value)) {
        setErrorEmail(false);
        itemValid(name, errorName);
      } else {
        setErrorEmail(true);
        setDisableBtn(true);
      }
    },
    [name, errorName]
  );

  const lists = [
    { label: 'Name', value: name, error: errorName, onChange: handleName },
    { label: 'Email', value: email, error: errorEmail, onChange: handleEmail },
    { label: 'Register Date', value: date, error: null, onChange: null },
  ];

  const errorMessage = (label) =>
    `Please enter ${label === 'Name' ? label : 'valid ' + label}`;

  const buttons = [
    { text: 'SAVE', state: disableBtn },
    { text: 'CANCEL', state: disableCancel },
  ];

  const handleClick = useCallback(
    (e) => {
      const type = e.target.innerText;
      e.preventDefault();

      if (type === 'CANCEL') {
        const { name, email } = users;
        setName(name);
        setEmail(email);
      }
      if (type === 'SAVE') {
        const editUser = { name, email };
        updateUser(users._id, editUser);
      }
      setErrorName(false);
      setErrorEmail(false);
      setDisableBtn(true);
      setDisableCancel(true);
    },
    [users, name, email, updateUser]
  );

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { name, email, register_date } = users;
    setName(name);
    setEmail(email);
    setDate(moment(register_date).format('d MMM, YYYY'));
  }, [users]);

  return (
    <div style={centerAlign}>
      <form className='new-form' style={{ height: 420 }} noValidate>
        {lists.map(({ label, value, error, onChange }) => (
          <InputText
            key={label}
            label={label}
            value={value || ''}
            error={error}
            errorMsg={errorMessage(label)}
            onChange={onChange}
          />
        ))}

        {buttons.map(({ text, state }, index) => (
          <button
            key={text}
            className='btn plus-bg'
            style={{ marginTop: !index && '5%' }}
            disabled={state ? true : false}
            onClick={handleClick}
          >
            {text}
          </button>
        ))}
      </form>
    </div>
  );
};

export default Profile;
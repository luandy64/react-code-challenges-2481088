import { useState } from 'react'

const validate_email = (word) => {
  const too_short = word.length == 0;
  const no_at = !(word.indexOf("@") > -1);
  if (too_short || no_at) {
    return "bad email";
  }
  return "";
};

const validate_password = (word, confirm) => {
  const too_short = word.length < 8;
  const matches = word === confirm;
  if (too_short || !matches) {
    return "bad password";
  }
  return "";
};

const do_validation = (e) => {
  e.preventDefault();

  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("password")[0].value;
  const confirm = document.getElementsByName("password-confirm")[0].value;

  const errors = [
    validate_email(email),
    validate_password(password, confirm)
  ];

  const error_free = errors => errors.every(x => x === "");
  const error = document.getElementsByName("errorBox")[0]
  if (error_free(errors)) {
    error.textContent = '';
    return true;
  } else {
    error.textContent = errors.join("\n");
    console.log("Bad");
    return false;
  }
};

export default function FormValidator () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  let error_text ='testing';
  return (
    <form onSubmit={do_validation}>
      <h2>Sign Up!</h2>
      <label htmlFor='email'>Email</label>
      <input
        type='text' name='email'
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password' name='password'
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor='password-confirm'>Confirm Password </label>
      <input
        type='password' name='password-confirm'
        onChange={e => setPasswordConfirm(e.target.value)}
      />
      <div name="errorBox">
        {error_text}
      </div>
      <input 
        type='submit' 
        value='Submit'
        />
    </form>
  )
}

import React, {HTMLInputTypeAttribute, useState} from 'react';
import './login-form.scss'


const fields = ['email', 'password'] as const;
type Fields = typeof fields[number]
interface FormInput {
  key: Fields;
  required?: boolean;
  label: string,
  pattern: RegExp,
  errorMessage: string;
  type: HTMLInputTypeAttribute
}


const loginInputs: FormInput[] = [
  {
    key: 'email',
    label: 'E-Mail',
    required: true,
    pattern: /[^@]+@[^@]+\.[^@]+/,
    errorMessage: 'Укажите корректный email адрес',
    type: 'text',
  },
  {
    key: 'password',
    label: 'Пароль',
    required: true,
    pattern: /.{8}/,
    type: 'password',
    errorMessage: 'Пароль должен состоять из не менее восьми символов'
  },
]

type FormState = {[key in Fields]: {
  error: string,
  value: string
}}


const LoginForm = () => {


  const [loginForm, setLoginForm] = useState(fields.reduce((acc, item) => {
    acc[item] = {
      value: '',
      error: ''
    }
    return acc
  }, {} as FormState))
  const [isLoading, setIsLoading] = useState(false)


  function submitForm() {
    const pureFormState = {...loginForm}
    fields.forEach((key) => {
      const value = loginForm[key].value.trim()
      const fieldSettings = loginInputs.find((item) => item.key === key)!
      const valid = fieldSettings.pattern.test(value)
      if (!valid) {
        pureFormState[key] = {...loginForm[key], error: fieldSettings.errorMessage}
      } else {
        pureFormState[key] = {...loginForm[key], error: ''}
      }
    })
    const isValid = !Object.values(pureFormState).some(({error}) => error)
    setLoginForm(pureFormState)
    if (isValid) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 5000)
    }
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <div className='login-form__title'>Вход</div>
        <div className='login-form__subtitle'>Для существующих пользователей</div>
        <div className='login-form__form-wrapper'>
          {
            loginInputs.map(({key, label, required, type}) => (
              <div key={key}>
                <label className={`login-form__item-label ${required && 'input-required'}`} htmlFor={key}>{label}:</label>
                <input
                  type={type}
                  autoComplete={key}
                  value={loginForm[key].value}
                  onChange={(e) => setLoginForm({...loginForm, [key]: {...loginForm[key], value: e.target.value }})}
                  className={`login-form__item-input ${loginForm[key].error && 'login-form__item-input_waring'}`}
                  id={key}
                  required={required}
                />
                <div className={`login-form__item-error ${!loginForm[key].error && 'hidden'}`}>{loginForm[key].error}</div>
              </div>
            ))
          }
        </div>
        <button disabled={isLoading} onClick={() => submitForm()} className='login-form__btn'>
          {isLoading ? 'Загрузка...' : 'Войти в систему'}
        </button>
      </div>

    </div>
  );
};

export default LoginForm;
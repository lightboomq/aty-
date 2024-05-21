import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './reg.module.css';

function Registration() {
    localStorage.clear();


    const [name, setName] = React.useState('');
    const [nameErr, setNameErr] = React.useState(false);

    const [surName, setSurName] = React.useState('');
    const [surNameErr, setSurNameErr] = React.useState(false);

    const [mail, setMail] = React.useState('');
    const [mailErr, setMailErr] = React.useState(false);

    const [password, setPassword] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState(false);

    const [passwordRepeat, setPasswordRepeat] = React.useState('');
    const [passwordRepeatErr, setPasswordRepeatErr] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState('');
    const regexpName = /^[а-я]*$/gi;
    const regexpSurName = /^[а-я]*$/gi;
    const regexpMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const navigate = useNavigate();
    async function sendForm() {
        if (nameErr || surNameErr || mailErr || passwordErr || passwordRepeatErr) return;

        const form = {
            firstName: name[0].toUpperCase() + name.slice(1).toLowerCase(),
            secondName: surName[0].toUpperCase() + surName.slice(1).toLowerCase(),
            email: mail,
            password: password,
        };
        try {
            const response = await fetch('http://localhost:3333/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const user = await response.json();

            if (!response.ok) {
                throw new Error(user.message);
            }

            navigate('/auth');
        } catch (err) {
            setErrMessage(err.message);
        }
    }

    if (errMessage) {
        return <div>{errMessage}</div>;
    }
    return (
        <form className={s.wrapper}>
            <h3 className={s.regText}>Регистрация</h3>

            <label className={`${s.wrapperInput} ${nameErr ? s.highlightingInputErr : ''}`}>
                Имя:
                <input value={name} onChange={e => setName(e.target.value)} onBlur={() => setNameErr(!regexpName.test(name))} className={s.input} type='text' />
            </label>

            <label className={`${s.wrapperInput} ${surNameErr ? s.highlightingInputErr : ''}`}>
                Фамилия:
                <input value={surName} onChange={e => setSurName(e.target.value)} onBlur={() => setSurNameErr(!regexpSurName.test(surName))} className={s.input} type='text' />
            </label>

            <label className={`${s.wrapperInput} ${mailErr ? s.highlightingInputErr : ''}`}>
                Почта:
                <input value={mail} onChange={e => setMail(e.target.value)} onBlur={() => setMailErr(!regexpMail.test(mail))} className={s.input} type='email' />
            </label>

            <label className={`${s.wrapperInput} ${passwordErr ? s.highlightingInputErr : ''}`}>
                Пароль для входа:
                <input value={password} onChange={e => setPassword(e.target.value)} onBlur={() => setPasswordErr(password.length > 15 || password === '')} className={s.input} type='password' autoComplete='off' />
            </label>

            <label className={`${s.wrapperInput} ${passwordRepeatErr ? s.highlightingInputErr : ''}`}>
                Повторите пароль:
                <input value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} onBlur={() => setPasswordRepeatErr(passwordRepeat === '')} className={s.input} type='password' autoComplete='off' />
            </label>

            <button onClick={sendForm} className={s.btnReg} type='button'>
                Зарегистрироваться
            </button>

            <div className={s.wrapperLink}>
                <Link to='/auth' className={s.linkAuth}>
                    Войти в аккаунт
                </Link>
            </div>
        </form>
    );
}

export default Registration;

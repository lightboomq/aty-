import UserIcon from './UserIcon/UserIcon.jsx';
import ThemeIcon from './ThemeIcon/ThemeIcon.jsx';
import logo from '../assets/logoHeader.svg';
import s from './header.module.css';
function Header() {
    return (
        <header className={s.headerWrapper}>
            <h2>АТУ</h2>
            <div className={s.divIconWrapper}>
                <UserIcon />
                <ThemeIcon />
            </div>
        </header>
    );
}

export default Header;

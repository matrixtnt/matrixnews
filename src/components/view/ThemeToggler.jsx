import React, { useEffect } from 'react'
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { checkThemeMode, themeSelector } from 'src/store/reducers/CheckThemeReducer'

const ThemeToggler = () => {

    const darkThemeMode = useSelector(themeSelector);

    const dispatch = useDispatch()

    const changeTheme = (isDarkMode) => {
        if (isDarkMode) {
            // document.body.setAttribute('data-bs-theme', 'dark');
            dispatch(checkThemeMode({ data: { isDarkMode: true } }))
        }
        else {
            // document.body.setAttribute('data-bs-theme', 'light');
            dispatch(checkThemeMode({ data: { isDarkMode: false } }))
        }

    };

    useEffect(() => {
        if (darkThemeMode) {
            document.body.setAttribute('data-bs-theme', 'dark');
            dispatch(checkThemeMode({ data: { isDarkMode: true } }))
        }
        else {
            document.body.setAttribute('data-bs-theme', 'light');
            dispatch(checkThemeMode({ data: { isDarkMode: false } }))
        }
        // console.log('darkThemeMode => ', darkThemeMode)
    }, [darkThemeMode])

    return (
        <div>
            <div className="darkModeToggle">
                <MdLightMode size={20} />
                <div className="form-check form-switch text-white"><input className="form-check-input" type="checkbox" checked={darkThemeMode} onChange={(e) => changeTheme(e.target.checked)} role="switch" id="flexSwitchCheckDefault" /><label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                </div>
                <FaMoon />
            </div>
        </div>
    )
}

export default ThemeToggler

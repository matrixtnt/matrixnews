import React, { useEffect } from 'react'
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { checkThemeMode, themeSelector } from 'src/store/reducers/CheckThemeReducer'

const ThemeToggler = () => {

    const darkThemeMode = useSelector(themeSelector);

    const dispatch = useDispatch()

    const applyTheme = (isDarkMode) => {
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
                <div class="form-check form-switch text-white"><input class="form-check-input" type="checkbox" checked={darkThemeMode} onChange={(e) => applyTheme(e.target.checked)} role="switch" id="flexSwitchCheckDefault" /><label class="form-check-label" for="flexSwitchCheckDefault"></label>
                </div>
                <FaMoon />
            </div>
        </div>
    )
}

export default ThemeToggler

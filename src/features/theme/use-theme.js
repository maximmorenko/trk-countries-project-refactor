// кастомный хук
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react';

import { setTheme } from './theme-slice';


export const useTheme = () => {
    // переносим всю логику переключения темы в хук
    // на выходе отправляем выбраную тему из стейта и переключатель
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);

    const toggleTheme = () => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return [theme, toggleTheme];
};
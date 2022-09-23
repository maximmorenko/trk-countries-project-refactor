import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { clearDetails, loadCountryByName, selectDetails } from './details-slice';


export const useDetails = (name) => {

    const dispatch = useDispatch();
    const {currentCountry, error, status} = useSelector(selectDetails);

    useEffect(() => {
        dispatch(loadCountryByName(name));
    
        return () => {
            dispatch(clearDetails());
        }
    }, [name, dispatch]);


    return {currentCountry, error, status};
}
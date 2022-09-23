import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadCountries, selectCountriesInfo, selectVisibleCountries } from './countries-slice';

import { List } from '../../components/List';
import { Card } from '../../components/Card';
import { selectControls } from '../controls/controls-slice';


export const CountryList = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {search, region} = useSelector(selectControls);
    const countries = useSelector(state => selectVisibleCountries(state, {search, region}));
    const {status, error, qty} = useSelector(selectCountriesInfo);
  
    useEffect(() => {
        if (!qty) {
            dispatch(loadCountries());
        }
    }, [qty, dispatch]);

    return (
        <>
            {error && <h2>Can't fetch data</h2>}
            {status === 'loading' && <h2>Loading...</h2>}

            {status === 'received' && (
            <List>
                {countries.map((c) => {
                const countryInfo = {
                    img: c.flags.png,
                    name: c.name,
                    info: [
                    {
                        title: 'Population',
                        description: c.population.toLocaleString(),
                    },
                    {
                        title: 'Region',
                        description: c.region,
                    },
                    {
                        title: 'Capital',
                        description: c.capital,
                    },
                    ],
                };

                return (
                    <Card
                    key={c.name}
                    onClick={() => navigate(`/country/${c.name}`)}
                    {...countryInfo}
                    />
                );
                })}
            </List>
            )}
        </>
    )
}

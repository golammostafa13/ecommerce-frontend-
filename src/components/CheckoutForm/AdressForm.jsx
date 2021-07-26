import React, {useState, useEffect} from 'react';
import {Grid, Typography, InputLabel, Select, MenuItem} from '@material-ui/core';
import FormInput from './FormInput';
import {useForm, FormProvider} from 'react-hook-form';
import {commerce} from '../../lib/commerce.js';

const AdressForm = ({checkoutToken}) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
    useEffect(() => {
        const fetchCountries = async (checkoutToken) => {
            const {countries} = await commerce.services.localeListShippingCountries(checkoutToken.id);
            setShippingCountries(countries);
            // setShippingCountry(Object.keys(coutries)[0]);
            setShippingCountry(Object.keys(countries)[0]);
        };
        fetchCountries(checkoutToken);
    }, []);

    useEffect(() => {
        const fetchSubdivisions = async (countryCode) => {
            const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
            console.log(subdivisions);
            setShippingSubdivisions(subdivisions);
            setShippingSubdivision(Object.keys(subdivisions)[0]);
        }
        fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Adress</Typography>
            <FormProvider {...methods}>
                <form onSubmit="">
                    <Grid container spacing={3}>
                            <FormInput required name="firstName" label="First Name" />
                            <FormInput required name="lastName" label="Last Name" />
                            <FormInput required name="email" label="Email" />
                            <FormInput required name="address" label="Address" />
                            <FormInput required name="city" label="City" />
                            <FormInput required name="zip" label="ZIP / POSTAL code" />
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Countries</InputLabel>
                                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                    {
                                        countries.map((country =>(
                                            <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                        )))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Subdivisions</InputLabel>
                                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                    {
                                        subdivisions.map((subdivision =>(
                                            <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                        )))
                                    }
                                </Select>
                            </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
};

export default AdressForm;
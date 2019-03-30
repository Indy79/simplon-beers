import React, {useState, useEffect} from 'react';

import { getBeer } from './beer.service'

export const Beer = ({match}) => {
    const [beer, setBeer] = useState({});

    useEffect(() => {
        getBeer(match.params.id).then(item => {
            setBeer(item)
        })
    }, [match.params.id])

    return (<div>
        <h1>{beer.name}</h1>
        <p>{beer.price} €</p>
    </div>);
};
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { getAllBeers } from './src/beer.service';

import { Beer } from './src/beer'

const Index = () => {
    return <h1>Index</h1>
}

const Home = () => {
    const [beers, setBeers] = useState([]);
    const [fetched, setFetched] = useState(false);
    
    useEffect(() => {
        getAllBeers().then(
            items => {
                setBeers(items)
                setFetched(true)
            }
        )
    }, [fetched])
    return (<Router>
        <div>
          <nav>
            {
                beers.map(beer => <Link key={beer._id} to={`/beers/${beer._id}`}>{beer.name}</Link>)
            }
          </nav>
  
          <Route path="/" exact component={Index} />
          <Route path="/beers/:id" exact component={Beer} />
        </div>
      </Router>
    );
}

ReactDOM.render(
    <Home />, 
    document.getElementById("app")
)
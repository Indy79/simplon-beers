export const getAllBeers = () => {
    return fetch('http://localhost:8000/api/beers').then(
        response => response.json()
    )
};

export const getBeer = (id) => {
    return fetch(`http://localhost:8000/api/beers/${id}`).then(
        response => response.json()
    )
};
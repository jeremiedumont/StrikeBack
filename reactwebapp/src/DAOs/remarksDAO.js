import {local, heroku} from './urls'

export function getRemarksSortedByDate(order,skip,number) {
    const fetchUri = heroku  + 'remarks/sorted/date' + '?order=' + order + '&skip=' + skip + '&number=' + number;
    console.log('On envoie la request...'+ fetchUri)
    return fetch(fetchUri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }/*,
        body: JSON.stringify({
            email: e,
            password: p
        }),*/
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.log('on est en error')
        console.error(error);
        return false;
      });
}

export function getRemarksSortedByHeard(order,skip,number) {
    const fetchUri = heroku  + 'sorted/heard' + '?order=' + order + '&skip=' + skip + '&number=' + number;
    return fetch(fetchUri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }/*,
        body: JSON.stringify({
            email: e,
            password: p
        }),*/
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
}
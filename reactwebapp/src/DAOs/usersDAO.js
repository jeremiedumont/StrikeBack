import {local, heroku} from './urls'

export function getUserById(id) {
    const fetchUri = heroku  + 'users/findById?id=' + id;
    console.log('On envoie la request...'+ fetchUri)
    return fetch(fetchUri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
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
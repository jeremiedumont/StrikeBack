import baseURL from './urls'

export async function getNotificationsByUser(token) {
    const fetchUri = baseURL + 'notifications/findByUserId?token=' + token;
    return fetch(fetchUri, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
}

//DELETE
export async function deleteNotification(token, id) {
    const fetchUri = baseURL + 'notifications/delete?id=' + id + '&token=' + token;
    return fetch(fetchUri, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
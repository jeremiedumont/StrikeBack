import baseURL from './urls'

export async function getAllReports(token) {
  const fetchUri = baseURL  + 'reports/?token=' + token;
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
      return error
    });
}

export async function addReport(postId, type, token){
    const fetchUri = baseURL  + 'reports/add?token='+ token;
    return fetch(fetchUri, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: postId,
        type : type         
      }),
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

export async function dismissReport(token, postId)  {
  const fetchUri = baseURL + 'reports/dismissByPostId?token=' + token;
  return fetch(fetchUri, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: postId,
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

export async function deleteReport(token, id)  {
  const fetchUri = baseURL + 'reports/delete?token=' + token + '&id=' + id;
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
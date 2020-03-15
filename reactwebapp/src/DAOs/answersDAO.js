import baseURL from './urls'

//
export async function getAnswerById(id) {
  const fetchUri = baseURL  + 'answers/?id=' + id;
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

export async function getAnswersByRemarkId(id) {
    const fetchUri = baseURL  + 'answers/findByRemark?id=' + id;
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

export async function getAllRemarksOfOneUser(id){
  const fetchUri = baseURL  + 'answers/findByUserId/?id=' + id;
    console.log('On envoie la request: '+ fetchUri)
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

export async function getAnswersSortedByDate(order,skip,number) {
  const fetchUri = baseURL  + 'answers/sorted/date' + '?order=' + order + '&skip=' + skip + '&number=' + number;
  console.log('On envoie la request: '+ fetchUri)
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
      console.error(error);
      return false;
    });
}

export async function getAnswersSortedByPertinency(order,skip,number) {
  const fetchUri = baseURL  + 'answers/sorted/pertinency' + '?order=' + order + '&skip=' + skip + '&number=' + number;
  console.log('On envoie la request: '+ fetchUri)
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
      console.error(error);
      return false;
    });
}

//POST
export async function addAnswer(userId,remarkId,content) {
  const fetchUri = baseURL  + 'answers/add';
  return fetch(fetchUri, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        remarkId: remarkId,
        content: content          
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

//PUT 
export async function incrementUp(id) {
  const fetchUri = baseURL  + 'answers/up?id=' + id;
  console.log('On envoie la request: '+ fetchUri)
  return fetch(fetchUri, {
      method: 'PUT',
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

export async function incrementDown(id) {
  const fetchUri = baseURL  + 'answers/down?id=' + id;
  console.log('On envoie la request: '+ fetchUri)
  return fetch(fetchUri, {
      method: 'PUT',
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

export async function deleteAnswer(id) {
  const fetchUri = baseURL  + 'answers/delete?id=' + id;
  console.log('On envoie la request: '+ fetchUri)
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
      console.log('on est en error')
      console.error(error);
      return false;
    });
}
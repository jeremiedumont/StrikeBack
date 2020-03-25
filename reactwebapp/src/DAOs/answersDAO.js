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
        
        console.error(error);
        return false;
      });
}

export async function getAllAnswersOfOneUser(token){
  const fetchUri = baseURL  + 'answers/findByUserId/?token=' + token;
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
export async function addAnswer(token,remarkId,content) {
  console.log("addAnswer -> (userId,remarkId,content",token,remarkId,content)
  const fetchUri = baseURL  + 'answers/add?token=' + token;
  return fetch(fetchUri, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        remarkId: remarkId,
        content: content          
      }),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log('new answer: ', responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

//PUT 
export async function incrementUp(id, token) {
  const fetchUri = baseURL  + 'answers/up?id=' + id + "&token=" + token;
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
      
      console.error(error);
      return false;
    });
}

export async function incrementDown(id, token) {
  const fetchUri = baseURL  + 'answers/down?id=' + id + "&token=" + token;
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
      
      console.error(error);
      return false;
    });
}

export async function deleteAnswer(token, id) {
  const fetchUri = baseURL  + 'answers/delete?id=' + id + '&token=' + token;
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
      
      console.error(error);
      return false;
    });
}
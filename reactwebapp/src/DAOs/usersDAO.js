import baseURL from './urls'

//GET
export function getUserById(id) {
  const fetchUri = baseURL + 'users/findById?id=' + id;
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

export function getUserByToken(token) {
  const fetchUri = baseURL + 'users/findByToken?token=' + token;
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

export function getAllUsers() {
  const fetchUri = baseURL + 'users/';
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
export async function signUp(pseudo, password, color, email) {
  const fetchUri = baseURL + 'users/signup';
  return fetch(fetchUri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pseudo: pseudo,
      password: password,
      color: color,
      email: email

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

export async function login(pseudo, password, autoLogin) {
  const fetchUri = baseURL + 'users/login';
  return fetch(fetchUri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pseudo: pseudo,
      password: password,
      autologin: autoLogin
    }),
  }).then((response) => {
    return response
  })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

//PUT
export async function updatePassword(userId, oldPassword, newPassword) {
  const fetchUri = baseURL + 'users/updatePassword';
  return fetch(fetchUri, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword
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

export async function updateColor(userId, color) {
  const fetchUri = baseURL + 'users/updateColor';
  return fetch(fetchUri, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      color: color
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


//DELETE
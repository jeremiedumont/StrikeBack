import baseURL from './urls'
import uuid from 'react-uuid'

import "@firebase/storage";
import { storage } from "../firebase/firebase"

export async function getRemarkById(id) {
  const fetchUri = baseURL + 'remarks/?id=' + id;
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

export async function findRemarkWithText(search) {
  const fetchUri = baseURL + 'remarks/find?search=' + search;
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

export async function getNumberOfRemarks() {
  const fetchUri = baseURL + 'remarks/count';
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

export async function getAllRemarksOfOneUser(token) {
  const fetchUri = baseURL + 'remarks/findByUserId/?token=' + token;
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

export async function getRemarksSortedByDate(order, skip, number) {
  const fetchUri = baseURL + 'remarks/sorted/date?order=' + order + '&skip=' + skip + '&number=' + number;
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

export async function getRemarksSortedByHeard(order, skip, number) {
  const fetchUri = baseURL + 'remarks/sorted/heard?order=' + order + '&skip=' + skip + '&number=' + number;
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
export async function addRemark(token, title, text, image) {
  const fetchUri = baseURL + 'remarks/add?token='+token;
  if (image === null || image === ''){
    image = "none"
  }
  return fetch(fetchUri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      text: text,
      image: image

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
export async function incrementHeard(id,token) {
  const fetchUri = baseURL + 'remarks/heard?id=' + id + '&token=' + token;
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

export async function decrementHeard(id,token) {
  const fetchUri = baseURL + 'remarks/heard/decrement?id=' + id + '&token=' + token;
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

//DELETE
export async function deleteRemark(token, id) {
  const fetchUri = baseURL + 'remarks/delete?id=' + id + '&token=' + token;
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

export async function uploadImageToFireBase(imageAsFile) {
  if (imageAsFile == null || imageAsFile === '') {
    console.error(`Not an image, the image file is a ${typeof (imageAsFile)}`)
  } else {
    console.log('Start of the uploading...')
    const metadata = { contentType: 'image/jpeg' }
    const imageName = uuid() + '.jpeg'
    const imageRef = storage.ref(`/images/${imageName}`)
    await imageRef.put(imageAsFile, metadata)
    const url = await imageRef.getDownloadURL().catch((error) => console.error(error))
    return url
  }
  console.log('Image uploaded.')
}
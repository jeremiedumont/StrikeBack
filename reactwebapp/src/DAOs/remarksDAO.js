import baseURL from './urls'
import uuid from 'react-uuid'

import "@firebase/storage";
import { storage } from "../firebase/firebase"

export async function getRemarkById(id) {
  const fetchUri = baseURL + 'remarks/?id=' + id;
  console.log('On envoie la request: ' + fetchUri)
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

export async function getAllRemarksOfOneUser(id) {
  const fetchUri = baseURL + 'remarks/findByUserId/?id=' + id;
  console.log('On envoie la request: ' + fetchUri)
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
  const fetchUri = baseURL + 'remarks/sorted/date' + '?order=' + order + '&skip=' + skip + '&number=' + number;
  console.log('On envoie la request: ' + fetchUri)
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
  const fetchUri = baseURL + 'remarks/sorted/heard' + '?order=' + order + '&skip=' + skip + '&number=' + number;
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

//POST
export async function addRemark(token, title, text, image) {
  const fetchUri = baseURL + 'remarks/add?token='+token;
  if (image == null || image == ''){
    image = "none"
  }
  console.log("token = " + token + ",title = " + title + ",text = " + text + ",image = " + image)
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
export async function incrementHeard(id) {
  const fetchUri = baseURL + 'remarks/heard?id=' + id;
  console.log('On envoie la request: ' + fetchUri)
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

export async function decrementHeard(id) {
  const fetchUri = baseURL + 'remarks/heard/decrement?id=' + id;
  console.log('On envoie la request: ' + fetchUri)
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

//DELETE
export async function deleteRemark(id) {
  const fetchUri = baseURL + 'remarks/delete?id=' + id;
  console.log('On envoie la request: ' + fetchUri)
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

// --- FIREBASE ---
/*const src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"

const src="https://www.gstatic.com/firebasejs/7.10.0/firebase-analytics.js"
*/

/*
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDx3nx1MYIjSgWoe0_XKi6Pt-YWsjxuNaM",
    authDomain: "strikeback-a3503.firebaseapp.com",
    databaseURL: "https://strikeback-a3503.firebaseio.com",
    projectId: "strikeback-a3503",
    storageBucket: "strikeback-a3503.appspot.com",
    messagingSenderId: "1092210670490",
    appId: "1:1092210670490:web:f4a19c38f449d729bf1823",
    measurementId: "G-5NVEKETS9P"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
*/
export async function uploadImageToFireBase(imageAsFile) {
  if (imageAsFile == null || imageAsFile === '') {
    console.error(`Not an image, the image file is a ${typeof (imageAsFile)}`)
  } else {
    console.log('Start of the uploading...')
    console.log(imageAsFile)
    const metadata = { contentType: 'image/jpeg' }
    const imageName = uuid() + '.jpeg'
    const imageRef = storage.ref(`/images/${imageName}`)
    const uploadTask = await imageRef.put(imageAsFile, metadata)
    const url = await imageRef.getDownloadURL().catch((error) => console.error(error))
    return url

  }
  console.log('FINI')
}
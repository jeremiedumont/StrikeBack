import baseURL from './urls'
import firebase from "firebase/app";
import "@firebase/storage";

export async function getRemarkById(id){
  const fetchUri = baseURL  + 'remarks/?id=' + id;
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

export async function getAllRemarksOfOneUser(id){
  const fetchUri = baseURL  + 'remarks/findByUserId/?id=' + id;
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

export async function getRemarksSortedByDate(order,skip,number) {
    const fetchUri = baseURL  + 'remarks/sorted/date' + '?order=' + order + '&skip=' + skip + '&number=' + number;
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

export async function getRemarksSortedByHeard(order,skip,number) {
    const fetchUri = baseURL  + 'remarks/sorted/heard' + '?order=' + order + '&skip=' + skip + '&number=' + number;
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
export async function addRemark(userId,title,text,image) {
  const fetchUri = baseURL  + 'remarks/add';
  return fetch(fetchUri, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
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
  const fetchUri = baseURL  + 'remarks/heard?id=' + id;
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

export async function decrementHeard(id) {
  const fetchUri = baseURL  + 'remarks/heard/decrement?id=' + id;
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

//DELETE
export async function deleteRemark(id) {
  const fetchUri = baseURL  + 'remarks/delete?id=' + id;
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

  export function uploadImageToFireBase() {
    const { image } = image;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        firebase.storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  }
*/
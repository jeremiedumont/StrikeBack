import baseURL from './urls'

export function addReport(postId, type, token){
    console.log("postId = " + postId + ", type = " + type)
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
        console.log("Success reporting")
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
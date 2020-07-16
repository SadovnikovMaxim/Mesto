export class Api {
  constructor(config){
    this.url = config.url;
    this.headers = config.headers;
  }

  loadUser(){
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }
 
  getCard(){
   return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }

  updateUser(nameProfile, jobProfile) {
   return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: nameProfile,
        about: jobProfile
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }
}
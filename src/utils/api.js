class Api {
  constructor({baseUrl, token, cohort}) {
    this._baseUrl = baseUrl
    this._token = token;
    this._cohort = cohort;
  }

  _request(adres, method, info) {
    const pattern = {
      method: method,
      headers: {
       authorization: this._token,
       'Content-Type': 'application/json',
       }
     }
     
    return fetch(
      `${this._baseUrl}/${this._cohort}/${adres}`,
      info ? {...pattern, body: JSON.stringify(info)} : pattern
      )
      .then(res => {
        if(res.ok) {
          return res.json()
        } else {
          Promise.reject(`ошибка: ${res.status}`)
        }
     })

  }

  newUserInfo() {
    return this._request('users/me', 'GET')
  }

  editUserInfo(userInfo) {
    return this._request('users/me', 'PATCH', userInfo)
  }

  editAvatar(avatarInfo) {
    return this._request('users/me/avatar', 'PATCH', avatarInfo)
  }

  getUserId() {
    return this._request('users/me', 'GET')
  }

  getCards(){
    return  this._request('cards', 'GET')
  }

  setNewCard(data) {
    return this._request('cards', 'POST', data)
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, 'DELETE')
  }

  like(cardId, isLiked) {
    return this._request(`cards/likes/${cardId}`, isLiked? 'DELETE' : 'PUT') 
  }
}

const newApi = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  token: '17967209-61dd-4a29-b076-c48750c9d1ad',
  cohort: 'cohort-24'
})

export default newApi
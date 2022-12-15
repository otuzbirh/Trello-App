import axios from 'axios'

export interface Credentials {
  email: string,
  password: string
}

export interface FormData {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}



export const onLogin = (data: Credentials) => {


  return new Promise((resolve, reject) => {
    axios.post("http://localhost:2000/api/users/login", data)
      // axios.post(process.env.API_URL)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })

}


export const onRegister = (data: FormData) => {
  const url = 'http://localhost:2000/api/users/register';


  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}







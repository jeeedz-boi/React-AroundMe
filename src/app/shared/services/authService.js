import axios from 'axios';

export const getUser = async (username, password) => {
    const BASE_URL = 'http://localhost:5000'
    const config = {
      method: 'get',
      url: `${BASE_URL}/user?username=${username}&password=${password}`,
      headers: { }
    };
    
    const response = await axios(config)
    return response.data.authStatus === 'FOUND' ? response.data.data : {}
}

export const setUser = async (username, password, displayName) => {
    const BASE_URL = 'http://localhost:5000'
    const config = {
      method: 'post',
      url: `${BASE_URL}/register`,
      data: {
        username: username,
        password: password,
        displayName: displayName
      },
      headers: { }
    };
    
    const response = await axios(config)
    return response.data
}
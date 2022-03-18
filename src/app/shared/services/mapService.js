import axios from 'axios';
import { GMAP_KEY } from '../utilities/const'

export const getPlaceViaGMAP = async (location, radius, keyword) => {
    const BASE_URL = 'http://localhost:5000'
    const config = {
      method: 'get',
      url: `${BASE_URL}/getPlaceViaGoogleMap?lat=${location.lat}&lng=${location.lng}&radius=${radius}&keyword=${keyword}&key=${GMAP_KEY}`,
      headers: { }
    };
    
    const response = await axios(config)
    // console.log(response.data)
    return response.data
}
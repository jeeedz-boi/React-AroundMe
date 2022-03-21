import './style.css'
import { useState } from "react";
import { InputField } from '../../shared/components/inputField/inputField'
import { Button } from '../../shared/components/button/button'
import { Slider } from '../../shared/components/slider/slider';
import { Map } from '../../shared/components/map/map'
import { getPlaceViaGMAP } from '../../shared/services/mapService'
import { useNavigate } from "react-router-dom";
import { setLocalStorageValueByKey } from '../../shared/utilities/helper';
import { RESULT_KEY, SEARCH_KEYWORD } from '../../shared/utilities/const';
import { mainIcon } from '../../shared/assets/images';

let circle

export function HomePage() {
  const [ userName, setUserName ] = useState('TEST - Scaffords')
  const [ keyword, setKeyword ] = useState('')
  const [ sliderValue, setSliderValue ] = useState('3')
  const [ center, setCenter ] = useState({})
  const defaultCenter = {lat: 13.7563, lng: 100.5018}
  const navigate = useNavigate();
  
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    console.log('- on handleApiLoaded map');  
    circle = new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      fillColor: "#abebff",
      fillOpacity: 0.35,
      map,
      center: center,
      radius: Number(sliderValue * 1000),
    })

    new maps.Marker({
      position: center,
      map
    });
  };

  const handleChange = (value) => {
    console.log('- on change');
    console.log('\t! set keyword', value)
    setKeyword(value)
    setLocalStorageValueByKey(SEARCH_KEYWORD, value)
  }

  const handleClick = async () => {
    console.log('- on click')
    console.log('\t! calling getPlaceViaGMAP')
    const result = await getPlaceViaGMAP(center, Number(sliderValue * 1000), keyword)
    console.log('\t! calling setLocalStorageValueByKey')
    setLocalStorageValueByKey(RESULT_KEY, result)
    console.log('\t! navigate to /result')
    navigate("../result", { replace: true });
  }

  const handleSliderChange = (value) => {
    console.log('- on slider change');
    console.log('\t! set slider', value)
    setSliderValue(value)
    if (circle) {
      circle.setRadius(Number(value * 1000));
    }
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
    setCenter({ lat: crd.latitude, lng: crd.longitude})
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

  return(
    <>
      <div className='cotaniner'>
        <div className='header'>
          <div className='username-container'>
            <img className='image' src={mainIcon} alt=""/>
            <span>{userName}</span>
          </div>
          <div className='keyword-container'>
            <InputField 
              placeholder='Enter Keyword' 
              onChange={handleChange}
            />
            <Button 
              text='SEARCH' 
              onClick={handleClick}
            />
          </div>
          <div className='radius-container'>
            <div className='slider-container'>
              <Slider
                value={sliderValue}
                min='1'
                max='10'
                onChange={handleSliderChange}
              />
            </div>
            <span>{`${sliderValue} KM.`}</span>
          </div>
        </div>
        <div className='map-container'>
          <Map
            handleApiLoaded={handleApiLoaded}      
            defaultCenter={defaultCenter}
            center={center}
            zoom={13}
            radius={sliderValue}
          />
        </div>
      </div>
    </>
  )
}

import imageSrc from '../../shared/assets/images/main-logo.png';
import './style.css'
import { useState } from "react";
import InputField from '../../shared/components/inputField/inputField'
import Button from '../../shared/components/button/button'
import Slider from '../../shared/components/slider/slider';
import { Map } from '../../shared/components/map/map'
let circle

function HomePage() {
  const [ userName, setUserName ] = useState('TEST - Scaffords')
  const [ keyword, setKeyword ] = useState('')
  const [ sliderValue, setSliderValue ] = useState('3')
  const [ center, setCenter ] = useState({})
  const defaultCenter = {lat: 13.7563, lng: 100.5018}
  
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
  }

  const handleClick = () => {
    console.log('- on click')
    console.log('\t! calling some function')
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
          <div className='username-title'>
            <img className='image' src={imageSrc} alt=""/>
            <span>{userName}</span>
          </div>
          <div className='keyword-field'>
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

export default HomePage

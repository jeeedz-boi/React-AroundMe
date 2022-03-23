import './style.css'
import { useState } from "react";
import { InputField } from '../../shared/components/inputField/inputField'
import { Button } from '../../shared/components/button/button'
import { Slider } from '../../shared/components/slider/slider';
import { Map } from '../../shared/components/map/map'
import { getPlaceViaGMAP } from '../../shared/services/mapService'
import { useNavigate } from "react-router-dom";
import { getLocalStorageValueByKey, setLocalStorageValueByKey } from '../../shared/utilities/helper';
import { ACCOUNT, LOCATION, RESULT, SEARCH_KEYWORD } from '../../shared/utilities/const';
import { arrowWhiteIcon, barIcon, hospitalIcon, mainIcon, poiIcon, searchIcon, shoppingIcon } from '../../shared/assets/images';
import { RoundedButton } from '../../shared/components/round-button/roundButton';
import  { isEmpty } from 'lodash'
let circle

const getLocationFronLocalStorage = () => {
  return getLocalStorageValueByKey(LOCATION) || {}
}

export function HomePage() {
  const { displayName} = getLocalStorageValueByKey(ACCOUNT) || {}
  const [ keyword, setKeyword ] = useState('')
  const [ sliderValue, setSliderValue ] = useState('3')
  const [ center, setCenter ] = useState(getLocationFronLocalStorage())
  const [ isQuickKeywordActive, setQuickKeywordActive ] = useState(false)
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

  const handleKeywordChange = (value) => {
    const setValue = value.target.value
    console.log('- on change');
    setStateKeyword(setValue)
  }

  const setStateKeyword = (value) => {
    console.log('\t! set keyword', value)
    setKeyword(value)
  }

  const onHomepageSubmit = async (keyword, location) => {
    console.log('- on click')
    console.log('\t! calling getPlaceViaGMAP')
    const result = await getPlaceViaGMAP(center, Number(sliderValue * 1000), keyword)

    updateLocalStorage(result, keyword, location)
    
    console.log('\t! navigate to /result')
    onChangeRoute('next')
  }

  const updateLocalStorage = (result, keyword, location) => {
    console.log('\t! calling updateLocalStorage')
    setLocalStorageValueByKey(RESULT, result)
    setLocalStorageValueByKey(SEARCH_KEYWORD, keyword)
    setLocalStorageValueByKey(LOCATION, location)
  }

  const handleSliderChange = (value) => {
    console.log('- on slider change');
    console.log('\t! set slider', value)
    setSliderValue(value)
    if (circle) {
      circle.setRadius(Number(value * 1000));
    }
  }

  const onToggleKeyword = () => { 
    setQuickKeywordActive(!isQuickKeywordActive)
  }

  const onClickShortcut = (keyword) => {
    console.log('- onClickShortcut', keyword)
    setStateKeyword(keyword)
    onHomepageSubmit(keyword)
  }

  const onChangeRoute = (target) => {
    switch (target) {
      case 'next': navigate("../result", { replace: true }); break;
      case 'profile': navigate("../profile", { replace: true }); break;
      case 'prev': navigate("../login", { replace: true }); break;
      default: navigate("../", { replace: true })
    }
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    console.log('! get location from browser')
    const crd = pos.coords;
    const location = { lat: crd.latitude, lng: crd.longitude}
    setCenter(location)
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  if (isEmpty(center)) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return(
    <>
      <div className='home-cotaniner'>
        <div className='header'>
          <div className='username-container'>
            <img className='image' src={mainIcon} alt=""/>
            <span onClick={() => onChangeRoute('profile')} >{displayName || 'UNKNOWN'}</span>
          </div>
          <div className='keyword-container'>
            <InputField 
              placeholder='Enter Keyword' 
              value={keyword}
              onChange={handleKeywordChange}
            />
            <Button 
              type="button"
              imageSource={searchIcon} 
              onClick={() => onHomepageSubmit(keyword, center)}
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
            <span className={'distance-text'}>{`${sliderValue} KM.`}</span>
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
          <div className="shortcut-main-container">
            { isQuickKeywordActive &&
              <div className="shortcut-container">
                <RoundedButton 
                  imageSource={shoppingIcon}
                  onClick={() => onClickShortcut('grocery')}
                  small
                />
                <RoundedButton 
                  imageSource={barIcon}
                  onClick={() => onClickShortcut('bar')}
                  small
                />
                <RoundedButton 
                  imageSource={hospitalIcon}
                  onClick={() => onClickShortcut('hospital')}
                  small
                />
                <RoundedButton 
                  imageSource={poiIcon}
                  onClick={() => onClickShortcut('point_of_interest')}
                  small
                />
              </div>
            }
            <RoundedButton 
              imageSource={arrowWhiteIcon}
              isActive={isQuickKeywordActive}
              onClick={onToggleKeyword}
            />
          </div>
        </div>
      </div>
    </>
  )
}

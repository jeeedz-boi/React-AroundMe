import GoogleMapReact from 'google-map-react'
import { GMAP_KEY } from '../../utilities/const'
import mapMarker from '../../assets/images/map-marker.png'
import './style.css'

export const Map = (props) => {
    const { handleApiLoaded, defaultCenter, center, zoom } = props
    const MarkerComponent = () => <img className='map-marker' src={mapMarker} alt=''></img>;
    const CircleComponent = () => <div className='circle'></div>
    const MAP_OPTIONS = {
        zoomControl: false,
        zoomControlOptions: false,
        fullscreenControl: false,
        fullscreenControlOptions: false
    }
    console.log('! Map init' ,center)
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ 
                key: GMAP_KEY,
                libraries: ['places']
            }}
            defaultCenter={defaultCenter}
            defaultZoom={zoom}
            center={center}
            options={MAP_OPTIONS}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
    )
}
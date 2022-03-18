import GoogleMapReact from 'google-map-react'
import { GMAP_KEY } from '../../utilities/const'
import './style.css'

export const Map = (props) => {
    const { handleApiLoaded, defaultCenter, center, zoom } = props
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
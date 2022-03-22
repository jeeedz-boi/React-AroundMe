import { barIcon, foodIcon, healthIcon, hospitalIcon, poiIcon, restaurantIcon, shoppingIcon, storeIcon } from "../assets/images"

export const GMAP_KEY = process.env.REACT_APP_G_KEY

export const RESULT_KEY = 'ls-result'
export const SEARCH_KEYWORD = 'ls-keyword'
export const LOCATION = 'ls-location'

export const IMAGE_SWITCH = {
    hospital: hospitalIcon, 
    health: healthIcon, 
    point_of_interest: poiIcon, 
    bar: barIcon, 
    restaurant: restaurantIcon, 
    food: foodIcon,  
    grocery_or_supermarket: shoppingIcon,  
    store: storeIcon
}
export const VALID_TYPES = ['hospital', 'health', 'point_of_interest', 'bar','restaurant', 'food', 'grocery_or_supermarket', 'store']
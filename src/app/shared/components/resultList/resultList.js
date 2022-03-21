import { closeIcon, arrowIcon, gMapsIcon, infoIcon, openIcon, ratingIcon } from "../../assets/images";
import { IMAGE_SWITCH, VALID_TYPES } from "../../utilities/const";
import { distanceFormat, translateBusinessStatus } from "../../utilities/helper";
import './style.css'

const ImageList = (props) => {
    const { types } = props
    const ReturnElement = types.map((type, index) => {
        if (VALID_TYPES.includes(type)) {
            return <div key={type+index}>            
                    <img 
                        className="image-type"
                        src={IMAGE_SWITCH[type]}
                        alt=""
                    />
                </div> 
        }
        return null
    })
    return (
        <div className='image-list'>{ReturnElement}</div>
    )
}


export const ResultList = (props) => {
    const { result, onHandleClick } = props;
    const listItems = result.map((element) =>
    <div className="result-list" key={element.name.toString()}>
        <div className="result-header">
        <img 
            className="down-icon"
            src={arrowIcon}
            alt=""
            onClick={() => onHandleClick(element)}
        />
        <div className="name-and-types">
            <span>
                {element.name}
            </span>
            <ImageList types={element.types}/>
        </div>
        </div>
        { element.detailVisible &&
            <ul className="nobull">
                <li>
                    <div className="close-status">
                        <div className="main-status">
                            <img src={infoIcon} alt="" />
                            <span>
                                {translateBusinessStatus(element.business_status)}
                            </span><br />
                        </div>
                        {element.permanently_closed && 
                        <span className="sub-status">
                            - ปิดให้บริการถาวร
                        </span>}
                    </div>
                </li>
                <li>
                    { <img src={element.opening_hours.open_now ? openIcon: closeIcon} alt="" /> }
                    {element.opening_hours.open_now ? 'เปิด' : 'ปิด'}
                </li>
                <li>
                    <img src={ratingIcon} alt="" />
                    {element.rating >= 0 ? element.rating : 'ไม่มีเรตติ้ง'}
                </li>
                <li 
                    onClick={() => { window.location = `http://maps.google.com/maps?z=12&t=m&q=loc:${element.location.lat}+${element.location.lng}` }}
                >
                    <img src={gMapsIcon} alt="" />
                    {element.vicinity}
                    <br />
                    {distanceFormat(element.location.distance)+' กม. (ระยะทางเส้นตรง)'}
                </li>
            </ul>
        }
        <hr/>
    </div>
    );
    return (
        <>{listItems}</>
    );
}
import { RESULT_KEY, SEARCH_KEYWORD } from "../../shared/utilities/const"
import { getLocalStorageValueByKey } from "../../shared/utilities/helper"
import backIcon from "../../shared/assets/images/left-arrow.png"
import './style.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function ResultPage() {
    console.log('- Navigate to ResultPage')
    const navigate = useNavigate();
    const searchKeyword = getLocalStorageValueByKey(SEARCH_KEYWORD) || 'UNKNOWN'
    const result = getLocalStorageValueByKey(RESULT_KEY)
    const transformedResult = result.map((res, index) => { return {...res, index: index, detailVisible: false }})
    const [ displayResult, setDisplayResult ] = useState(transformedResult)
    console.log('\t! result', result)
    
    const setDetailVisiblity = (element) => {
        console.log('- onClick elemnt', element)
        const targetIndex = element.index;
        const targetObj = displayResult[targetIndex]
        const resultObj = { ...targetObj, detailVisible: !targetObj.detailVisible }
        const resultArray = displayResult
        resultArray[targetIndex] = resultObj
        console.log('before set', displayResult)
        setDisplayResult([...resultArray])
        console.log('after set', displayResult)
    }
    const onChangeRoute = (target) => {
        switch (target) {
            case 'back': navigate("../", { replace: true }); break;
            default: { navigate("../result", { replace: true }); }
        }
    }
 
    return (
        <>
            <div className="container">
                <div className="nav">
                    <img 
                        className="back-icon"
                        src={backIcon}
                        alt=""
                        onClick={() => onChangeRoute('back')}
                    />
                    <span>{searchKeyword.toUpperCase()}</span>
                </div>
                <div className="result-container">
                    <ResultList 
                        result={displayResult}
                        onHandleClick={setDetailVisiblity}
                    />
                </div>
            </div>
        </>
    )
}

const ResultList = (props) => {
    console.log('re-render')
    const { result, onHandleClick } = props;
    const listItems = result.map((element) =>
    <div key={element.name.toString()}>
        <button onClick={() => onHandleClick(element)}>DOWN</button>
        <span>
            {element.name}
        </span>
        { element.detailVisible &&
            <ul>
                <li>{element.business_status}</li>
                <li>{element.opening_hours.open_now ? 'OPEN' : 'CLOSE'}</li>
                <li>{element.rating}</li>
                <li>{element.location.lat}</li>
                <li>{element.location.lng}</li>
            </ul>
        }
    </div>
    );
    return (
        <>{listItems}</>
    );
}
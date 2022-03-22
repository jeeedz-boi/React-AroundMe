import { RESULT_KEY, SEARCH_KEYWORD } from "../../shared/utilities/const"
import { getLocalStorageValueByKey } from "../../shared/utilities/helper"
import { backIcon} from "../../shared/assets/images"
import './style.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ResultList } from "../../shared/components/resultList/resultList"

export function ResultPage() {
    console.log('- ResultPage render')
    const navigate = useNavigate();
    const searchKeyword = getLocalStorageValueByKey(SEARCH_KEYWORD) || 'UNKNOWN'
    const result = getLocalStorageValueByKey(RESULT_KEY)
    const transformedResult = result.map((res, index) => { return {...res, index: index, detailVisible: false }})
    const [ displayResult, setDisplayResult ] = useState(transformedResult)
    
    const setDetailVisiblity = (element) => {
        const targetIndex = element.index;
        const targetObj = displayResult[targetIndex]
        const resultObj = { ...targetObj, detailVisible: !targetObj.detailVisible }
        const resultArray = displayResult
        resultArray[targetIndex] = resultObj
        setDisplayResult([...resultArray])
    }
    const onChangeRoute = (target) => {
        switch (target) {
            case 'back': navigate("../", { replace: true }); break;
            default: { navigate("../result", { replace: true }); }
        }
    }
 
    return (
        <>
            <div className="result-main-container">
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
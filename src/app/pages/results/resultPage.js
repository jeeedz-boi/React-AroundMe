import { RESULT_KEY } from "../../shared/utilities/const"
import { getLocalStorageValueByKey } from "../../shared/utilities/helper"

export function ResultPage() {
    console.log('ResultPage')
    console.log(getLocalStorageValueByKey(RESULT_KEY))
    return (
        <>
            <p>Hi</p>
        </>
    )
}
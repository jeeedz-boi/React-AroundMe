import { Toast, ToastContainer } from "react-bootstrap";
import './style.css'

export const CustomToast = (props) => {
    const { isShow, ToastBody } = props;
  
    return (
      <>
        <ToastContainer  className="p-3" position='bottom-center'>
            <Toast show={isShow}>
              <Toast.Body>{ToastBody()}</Toast.Body>
            </Toast>
        </ToastContainer>
      </>
    );
}
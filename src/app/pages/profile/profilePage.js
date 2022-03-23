import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/button/button';
import './style.css'

export function ProfilePage() {
  const navigate = useNavigate();
  navigate("../login", { replace: true });

  const onChangeRoute = (target) => {
    switch (target) {
      case 'next': navigate("../result", { replace: true }); break;
      case 'login': navigate("../login", { replace: true }); break;
      default: navigate("../profile", { replace: true })
    }
  }

  return (
    <div className="profile-page-container">
      <div className="logout-container">
        <Button
          onClick={onChangeRoute}
          isBulk
          text={'Logout'}
        />
      </div>
    </div>
  );
}
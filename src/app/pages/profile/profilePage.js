import { Link } from "react-router-dom";

function ProfilePage() {
    return (
      <>
        <main>
          <h2>Template</h2>
          <p>
            ProfilePage
          </p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
}

export default ProfilePage;

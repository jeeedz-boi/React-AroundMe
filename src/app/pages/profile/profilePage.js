import { Link } from "react-router-dom";

export function ProfilePage() {
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
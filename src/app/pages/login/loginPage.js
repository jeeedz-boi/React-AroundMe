import { Link } from "react-router-dom";

function LoginPage() {
    return (
      <>
        <main>
          <h2>Template</h2>
          <p>
            LoginPage
          </p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
}

export default LoginPage;
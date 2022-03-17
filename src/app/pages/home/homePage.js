import { Link } from "react-router-dom";

function HomePage() {
  return(
      <>
      <main>
      <h2>Welcome to the homepage!</h2>
      <p>You can do this, I believe in you.</p>
      </main>
      <nav>
      <Link to="/profile">Profile</Link>
      <br />
      <Link to="/login">Login</Link>
      </nav>
  </>
  )
}

export default HomePage

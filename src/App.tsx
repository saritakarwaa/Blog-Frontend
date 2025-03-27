import './App.css';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function App() {
  // Handle successful Google login
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse?.credential) {
      // Decode the JWT token
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Decoded User Info:', decoded);
    } else {
      console.error('No credential found');
    }
  };

  // Handle login error
  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>Google Auth Integration</p>
          <span>
            {/* Google Login Button */}
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </span>
        </header>
      </div>
    </>
  );
}

export default App;


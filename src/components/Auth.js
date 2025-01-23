import { supabase } from '../supabaseClient';
import './Auth.css'; // Импорт стилей

const Auth = () => {
  const handleSignUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email for a confirmation link!");
  };

  const handleSignIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Sign Up / Sign In</h2>
      <div className="auth-form">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="auth-input"
        />
        <div className="auth-buttons">
          <button
            onClick={() =>
              handleSignUp(
                document.getElementById("email").value,
                document.getElementById("password").value
              )
            }
            className="auth-button signup"
          >
            Sign Up
          </button>
          <button
            onClick={() =>
              handleSignIn(
                document.getElementById("email").value,
                document.getElementById("password").value
              )
            }
            className="auth-button signin"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

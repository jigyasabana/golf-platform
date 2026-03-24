import { useState } from "react";
import { signUp, login } from "../services/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await signUp(email, password);
    if (error) alert(error.message);
    else alert("Signup successful!");
  }

  async function handleLogin() {
    const { error } = await login(email, password);
    if (error) alert(error.message);
    else alert("Login successful!");
  }

  return (
    <div>
      <h2>Auth</h2>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
      
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
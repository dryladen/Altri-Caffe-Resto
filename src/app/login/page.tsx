import { login, signup, googleLogin, signOut } from "./actions"

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={googleLogin}>Log in with Google</button>
      <button formAction={signup}>Sign up</button>
      <button formAction={signOut}>Sign out</button>

    </form>
  )
}
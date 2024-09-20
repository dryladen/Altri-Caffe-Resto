import { User } from '@supabase/supabase-js';
import { createContext } from 'react'
export interface CustomUser extends User {
  user_role?: string;
}
type UserContextType = {
  userLoaded: boolean
  user: CustomUser
  signOut: () => void}

const UserContext = createContext<UserContextType>(null!)

export default UserContext
import { useClerk } from '@clerk/clerk-expo'

import {  Alert, TouchableOpacity } from 'react-native'
import { styles } from '../assets/styles/home.styles'
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          onPress: async () => {
            await signOut();
          },
        },
      ],
      { cancelable: false }
    )
  }
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
     <Ionicons name="log-out-outline" size={22} color={COLORS.text} />  
    </TouchableOpacity>
  )
}
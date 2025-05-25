import React from 'react';
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from 'expo-router';

const NoTransactionFound = () => {
    const router = useRouter();
  return (
    <View style={styles.emptyState}>
      <Ionicons 
        name="receipt-outline"
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No hay transacciones</Text>
      <Text style={styles.emptyStateText}>Haz tu primera transacción aqui.</Text>

      <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
         <Ionicons 
         name="add-outline"
         size={20}
         color={COLORS.white}
         />
         
        <Text style={styles.emptyStateButtonText}>Nueva transacción</Text>
      </TouchableOpacity>
      
      
    </View>
  );
}

export default NoTransactionFound;

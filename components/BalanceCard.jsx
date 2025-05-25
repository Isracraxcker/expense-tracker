import { View, Text } from "react-native";
import React from "react";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total balance</Text>
      <Text style={styles.balanceAmount}>
        ${parseFloat(summary.balance).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Ingresos</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${parseFloat(summary.income).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={[styles.balanceStatItem]}>
          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Egresos</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
              -${Math.abs(parseFloat(summary.expenses).toFixed(2))}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;

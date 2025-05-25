
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api.js";
import { styles } from "../../assets/styles/create.styles.js";
import { COLORS } from "../../constants/colors.js";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES = [
  { id: "food", name: "Comida & Bebidas", icon: "fast-food" },
  { id: "shopping", name: "Compras", icon: "cart" },
  { id: "transport", name: "Transporte", icon: "car" },
  { id: "entertainment", name: "Entretenimiento", icon: "film" },
  { id: "bills", name: "Facturas", icon: "receipt" },
  { id: "income", name: "Ingresos", icon: "cash" },
  { id: "health", name: "Salud", icon: "medkit" },
  { id: "education", name: "Educación", icon: "book" },
  { id: "travel", name: "Viajes", icon: "airplane" },
  { id: "gifts", name: "Regalos", icon: "gift" },
  { id: "sports", name: "Deportes", icon: "barbell" },

  { id: "other", name: "Otros", icon: "ellipsis-horizontal" },
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim())
      return Alert.alert("Error", "Por favor ingrese un título.");
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return Alert.alert("Error", "Por favor ingrese una cantidad válida.");
    }
    if (!selectCategory)
      return Alert.alert("Error", "Por favor seleccione una categoría.");

    setLoading(true);
    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          title,
          amount: formattedAmount,
          category: selectCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fallo al crear la transacción.");
      }

      Alert.alert("Transacción creada", "La transacción ha sido creada.");
      router.back();
    } catch (error) {
      console.error("Error creating transaction:", error);
      Alert.alert("Error", "No se pudo crear la transacción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Nueva transacción</Text>

        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            isLoading && styles.saveButtonDisabled,
          ]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Text>

          {!isLoading && (
            <Ionicons name="checkmark" size={18} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      {/* Card */}

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          {/* Expense button */}
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name="arrow-down-circle"
              size={24}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />

            <Text
              style={[
                styles.typeButtonText,
                isExpense && styles.typeButtonTextActive,
              ]}
            >
              Gasto
            </Text>
          </TouchableOpacity>



          {/* Income button */}
          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              name="arrow-up-circle"
              size={24}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />

            <Text
              style={[
                styles.typeButtonText,
                !isExpense && styles.typeButtonTextActive,
              ]}
            >
              Ingreso
            </Text>
          </TouchableOpacity>         
        </View>
     
        {/* Amount cONTAINER */}

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

          {/* Input cONTAINER */}
           
           <View
           style={styles.inputContainer}     
           >
            <Ionicons 
             name="create-outline"
             size={22}
             color={COLORS.textLight}
             style={styles.inputIcon}  
            />

            <TextInput
              style={styles.input}
              placeholder="Título de la transacción"
              placeholderTextColor={COLORS.textLight}
              value={title}
              onChangeText={setTitle}
            />

           </View>

           <Text style={styles.sectionTitle}>
             <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Categorias de transacción
           </Text>

           <ScrollView 

           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={styles.categoriesScrollContent}
           
           style={styles.categoriesScroll}
           >
              {CATEGORIES.map(category => (
                <TouchableOpacity
                 key={category.id}
                 style= {[
                  styles.categoryButton,
                  selectCategory=== category.name && styles.categoryButtonActive,
                  ]}

                  onPress={() => setSelectCategory(category.name)}
                >

                 <Ionicons
                  name={category.icon}
                  size={20}
                  color={selectCategory === category.name ? COLORS.white : COLORS.text}
                  style={styles.categoryIcon}
                 />

                 <Text style={[
                    styles.categoryButtonText,
                    selectCategory === category.name && styles.categoryButtonTextActive
                 ]}>

                   {category.name}

                 </Text>

                </TouchableOpacity>

                ))}
           </ScrollView>
      </View>

  {
    isLoading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )  
    
}



    </View>
  );
};

export default CreateScreen;

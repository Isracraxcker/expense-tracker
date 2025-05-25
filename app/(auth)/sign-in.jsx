import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { styles } from "@/assets/styles/auth.styles.js";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [erorr, setErorr] = useState("");
  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
       
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setErorr("Contraseña incorrecta. Por favor intente de nuevo");
      } else {
        setErorr("Ah ocurrido un error. Por favor intente de nuevo");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i4.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}>Bienvenido de nuevo </Text>

        {erorr ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{erorr}</Text>
            <TouchableOpacity onPress={() => setErorr("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, erorr && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Ingresa tu correo"
          placeholderTextColor={COLORS.textLight}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={[styles.input, erorr && styles.errorInput]}
          value={password}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor={COLORS.textLight}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿No tienes una cuenta?</Text>

          <Link href="/sign-up" asChild>
            <TouchableOpacity href="/sign-up">
              <Text style={styles.linkText}>Crear una cuenta</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

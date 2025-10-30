import { signingUp } from "@/api";
import { useStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

export default function SigningUp() {
  const setUser = useStore((state) => state.setUser);
  const [username, onChangeTextUsername] = useState("");
  const [email, onChangeTextEmail] = useState("");
  const [password, onChangeTextPassword] = useState("");
  const [confirmPassword, onChangeTextConfirmPassword] = useState("");
  const signingUpMutation = useMutation({
    mutationFn: signingUp,
    onSuccess: (data) => {
      const enhancedUser = { ...data, username, email };
      console.log("Usuário cadastrado com sucesso", enhancedUser);
      setUser(enhancedUser);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        "Ocorreu um erro ao cadastrar o usuário.";
      console.error("Erro ao cadastrar usuário", error.response?.data);
      Alert.alert("Erro", errorMessage);
    },
  });

  function handleSigningUp() {
    if (password !== confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem");
      return;
    }
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Todos os campos devem ser preenchidos");
      return;
    }

    signingUpMutation.mutate({
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={onChangeTextUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={onChangeTextEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={onChangeTextPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="confirm password"
        value={confirmPassword}
        onChangeText={onChangeTextConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Cadastrar-se" onPress={handleSigningUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: "90%",
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    marginVertical: 10,
  },
});

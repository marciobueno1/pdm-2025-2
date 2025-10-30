import { loggingIn } from "@/api";
import { useStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

export default function LoggingIn() {
  const setUser = useStore((state) => state.setUser);
  const [username, onChangeTextUsername] = useState("");
  const [password, onChangeTextPassword] = useState("");
  const loggingInMutation = useMutation({
    mutationFn: loggingIn,
    onSuccess: (data) => {
      console.log("Usuário logado com sucesso", data);
      // const enhancedUser = { ...data, username, email };
      // console.log("Usuário cadastrado com sucesso", enhancedUser);
      setUser(data);
      router.replace("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Ocorreu um erro ao realizar o login";
      console.error("Erro ao realizar o login", error.response?.data);
      Alert.alert("Erro", errorMessage);
    },
  });

  function handleLoggingIn() {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Atenção", "Todos os campos devem ser preenchidos");
      return;
    }

    loggingInMutation.mutate({
      username: username.trim(),
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
        placeholder="password"
        value={password}
        onChangeText={onChangeTextPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLoggingIn} />
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

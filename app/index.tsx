import { loggingOut } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Link, router } from "expo-router";
import { Alert, Button, Dimensions, StyleSheet, View } from "react-native";

import { PizzaTranslator } from "@/components/PizzaTranslator";
// import { ScrollViewApp } from "@/components/ScrollViewApp";
// import { FlatListExample } from "@/components/FlatListExample";
import { SectionListExample } from "@/components/SectionListExample";
import { useStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";

console.log("window dimensions: ", Dimensions.get("window"));

export default function Index() {
  const { isEnabled, toggleIsEnabled, user, setUser } = useStore(
    (state) => state
  );
  const loggingOutMutation = useMutation({
    mutationFn: loggingOut,
    onSuccess: () => {
      console.log("Logout realizado com sucesso!");
      setUser(null);
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Ocorreu um erro ao fazer o logout.";
      console.error("Ocorreu um erro ao fazer o logout", errorMessage);
      Alert.alert("Erro", errorMessage);
      setUser(null);
    },
  });

  return (
    <View style={styles.rootContainer}>
      {user ? (
        <View>
          <Text>{user.email}</Text>
          <Button
            title="Logout"
            onPress={() => loggingOutMutation.mutate(user)}
          />
        </View>
      ) : (
        <View>
          <Button title="Login" onPress={() => router.navigate("/loggingIn")} />
          <Button
            title="Register"
            onPress={() => router.navigate("/signingUp")}
          />
        </View>
      )}
      <Switch
        size="md"
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        activeThumbColor="#fafafa"
        ios_backgroundColor="#d4d4d4"
        value={isEnabled}
        onToggle={toggleIsEnabled}
      />
      <View className="flex-1 items-center justify-center bg-tertiary-50">
        <Text size="xl" bold>
          Welcome to Gluestack UI!
        </Text>
        <Text size="xl" bold className="text-info-500">
          Welcome to Gluestack UI!
        </Text>
      </View>
      <Spinner size="large" color="orange" />
      {isEnabled ? (
        <SectionListExample />
      ) : (
        <View style={styles.container}>
          <Text bold size="4xl" className="text-info-700">
            Olá Turma!!!
          </Text>
          <Link href="/list">Section List Example</Link>
          <Link href="/tarefas">Tasks Example</Link>
          <PizzaTranslator />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
});

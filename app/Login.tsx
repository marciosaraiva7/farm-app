import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useToast } from "@/components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState } from "react";

export function Login() {
  const { toast } = useToast();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  async function handleLogin() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://farmlog-api.wr-agro.dev.br:3003/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: string = await response.json();
      console.log("Login successful:", data);
      setToken(data);
      await AsyncStorage.setItem("auth-token", data);

      // Handle success (e.g., save token, redirect, etc.)
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro no login");
      alert("Usuario ou senha incorretos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-yellow-100">
      <View className="flex-1 justify-center  w-full px-8 pb-4">
        <Text className="text-2xl font-bold mb-8">Login</Text>
        <View className="flex gap-4 mb-8">
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            mode="outlined"
            label="Senha"
            secureTextEntry={visiblePassword}
            value={password}
            onChangeText={(e) => setPassword(e)}
            right={
              <TextInput.Icon
                icon={visiblePassword ? "eye" : "eye-off"}
                onPress={() => setVisiblePassword(!visiblePassword)}
              />
            }
          />
        </View>
        <Button
          mode="contained"
          buttonColor="gray"
          disabled={!email && !password}
          onPress={() => handleLogin()}
        >
          Entrar
        </Button>
      </View>
    </View>
  );
}

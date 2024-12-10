import { View, Text } from "react-native";

import { useToast } from "@/components/Toast";

export function Profile() {
  const { toast } = useToast();

  return (
    <View className="flex-1 justify-center items-center ">
      <View className="flex-1 justify-center items-center  px-4 pb-4">
        <Text className="text-2xl font-bold">Profile</Text>
      </View>
    </View>
  );
}

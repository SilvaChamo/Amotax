import { useState } from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import type { AdminStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AdminStackParamList, "AdminAnnouncement">;

export function AdminAnnouncementScreen({ navigation }: Props) {
  const { createAnnouncement } = useApp();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sendSms, setSendSms] = useState(true);
  const [loading, setLoading] = useState(false);

  const publish = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha título e texto.");
      return;
    }
    setLoading(true);
    await createAnnouncement(title, body, sendSms);
    setLoading(false);
    Alert.alert(
      "Publicado",
      sendSms
        ? "Aviso publicado. No piloto o SMS é simulado (integração futura)."
        : "Aviso publicado no aplicativo.",
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <Screen title="Novo aviso" subtitle="Comunicado aos membros">
      <Input label="Título" value={title} onChangeText={setTitle} />
      <Input
        label="Texto"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={5}
        style={{ minHeight: 120, textAlignVertical: "top" }}
      />
      <Button
        title={sendSms ? "SMS: activado (piloto simulado)" : "SMS: desactivado"}
        variant="outline"
        onPress={() => setSendSms(!sendSms)}
      />
      <Button title="Publicar" onPress={publish} loading={loading} />
    </Screen>
  );
}

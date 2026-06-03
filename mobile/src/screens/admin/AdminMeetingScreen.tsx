import { useState } from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import type { AdminStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AdminStackParamList, "AdminMeeting">;

export function AdminMeetingScreen({ navigation }: Props) {
  const { createMeeting } = useApp();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [body, setBody] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!title.trim() || !location.trim() || !dateStr.trim()) {
      Alert.alert("Campos obrigatórios", "Título, local e data/hora são obrigatórios.");
      return;
    }
    const startsAt = new Date(dateStr);
    if (Number.isNaN(startsAt.getTime())) {
      Alert.alert("Data inválida", "Use formato ISO, ex.: 2026-06-15T14:00");
      return;
    }
    setLoading(true);
    await createMeeting(title, startsAt.toISOString(), location, body);
    setLoading(false);
    Alert.alert("Reunião criada", "Membros activos podem confirmar presença.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <Screen title="Nova reunião" subtitle="Convite com confirmação de presença">
      <Input label="Título" value={title} onChangeText={setTitle} />
      <Input
        label="Data e hora (ISO)"
        value={dateStr}
        onChangeText={setDateStr}
        placeholder="2026-06-15T14:00"
      />
      <Input label="Local" value={location} onChangeText={setLocation} />
      <Input
        label="Pauta / notas"
        value={body}
        onChangeText={setBody}
        multiline
        style={{ minHeight: 100, textAlignVertical: "top" }}
      />
      <Button title="Criar reunião" onPress={save} loading={loading} />
    </Screen>
  );
}

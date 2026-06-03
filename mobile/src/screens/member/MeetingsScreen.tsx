import { Text, View } from "react-native";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import { text } from "../../theme/typography";
import { formatDateTime } from "../../utils/date";
import type { RsvpResponse } from "../../types";

const rsvpLabels: Record<RsvpResponse, string> = {
  yes: "Confirmo presença",
  no: "Não posso",
  maybe: "Talvez",
};

export function MeetingsScreen() {
  const { data, sessionMember, respondMeeting } = useApp();
  const meetings = data?.meetings ?? [];

  const myRsvp = (meetingId: string) =>
    data?.rsvps.find(
      (r) => r.meetingId === meetingId && r.memberId === sessionMember?.id,
    );

  return (
    <Screen title="Reuniões" subtitle="Convites e confirmação de presença">
      {meetings.map((m) => {
        const rsvp = myRsvp(m.id);
        return (
          <Card key={m.id}>
            <Text style={text.h3}>{m.title}</Text>
            <Text style={text.caption}>{formatDateTime(m.startsAt)}</Text>
            <Text style={text.body}>{m.locationText}</Text>
            <Text style={text.body}>{m.body}</Text>
            {rsvp && (
              <Badge
                label={`Resposta: ${rsvp.response === "yes" ? "Confirmado" : rsvp.response === "no" ? "Não vou" : "Talvez"}`}
                tone="navy"
              />
            )}
            {sessionMember?.status === "active" && (
              <View style={{ gap: 8, marginTop: 4, width: "100%" }}>
                {(["yes", "no", "maybe"] as RsvpResponse[]).map((r) => (
                  <Button
                    key={r}
                    title={rsvpLabels[r]}
                    variant={rsvp?.response === r ? "primary" : "outline"}
                    onPress={() => respondMeeting(m.id, r)}
                  />
                ))}
              </View>
            )}
          </Card>
        );
      })}
      {meetings.length === 0 && (
        <Text style={text.body}>Nenhuma reunião agendada de momento.</Text>
      )}
    </Screen>
  );
}

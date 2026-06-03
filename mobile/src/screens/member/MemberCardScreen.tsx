import { StyleSheet, Text, View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { Screen } from "../../components/ui/Screen";
import { useApp } from "../../context/AppContext";
import { colors } from "../../theme/colors";
import { fontFamily, text } from "../../theme/typography";
import { formatPhoneDisplay } from "../../utils/phone";

/** Cartão digital simplificado (QR representado visualmente no piloto) */
export function MemberCardScreen() {
  const { data, sessionMember } = useApp();
  const zone = data?.zones.find((z) => z.id === sessionMember?.zoneId);
  const code = sessionMember?.memberNumber ?? sessionMember?.id ?? "AMOTAX";

  return (
    <Screen title="Cartão de membro" subtitle="Apresente na reunião ou fiscalização">
      <View style={styles.card}>
        <View style={styles.strip} />
        <Text style={styles.brand}>AMOTAX</Text>
        <Text style={styles.name}>{sessionMember?.name}</Text>
        <Text style={styles.num}>{code}</Text>
        <Text style={styles.meta}>{zone?.name}</Text>
        <Text style={styles.meta}>{formatPhoneDisplay(sessionMember?.phone ?? "")}</Text>
        <View style={styles.qrWrap}>
          <Svg width={140} height={140} viewBox="0 0 140 140">
            {Array.from({ length: 10 }).map((_, row) =>
              Array.from({ length: 10 }).map((_, col) => {
                const on = (row + col + code.length) % 3 !== 0;
                if (!on) return null;
                return (
                  <Rect
                    key={`${row}-${col}`}
                    x={col * 14}
                    y={row * 14}
                    width={12}
                    height={12}
                    fill={colors.navy}
                  />
                );
              }),
            )}
          </Svg>
        </View>
        <Text style={text.caption}>Código para verificação interna</Text>
      </View>
      {sessionMember?.status !== "active" && (
        <Text style={[text.body, { color: colors.warning }]}>
          Cartão pleno disponível após activação da inscrição.
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.navy,
    overflow: "hidden",
  },
  strip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: colors.yellow,
  },
  brand: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.yellowDark,
    marginTop: 12,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.navy,
    marginTop: 16,
    textAlign: "center",
  },
  num: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    color: colors.navyMid,
    marginTop: 8,
  },
  meta: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray500,
    marginTop: 4,
  },
  qrWrap: { marginTop: 20, padding: 12, backgroundColor: colors.gray100, borderRadius: 12 },
});

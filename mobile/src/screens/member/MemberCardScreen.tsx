import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { MemberScreenLayout } from "../../components/MemberScreenLayout";
import { useApp } from "../../context/AppContext";
import { formatMemberLocation } from "../../data/mozambique-locations";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily, text } from "../../theme/typography";
import { formatPhoneDisplay } from "../../utils/phone";
import type { RootStackParamList } from "../../navigation/types";

export function MemberCardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { sessionMember } = useApp();
  const code = sessionMember?.memberNumber ?? sessionMember?.id ?? "AMOTAX";
  const location = formatMemberLocation(sessionMember ?? {});

  return (
    <MemberScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      title="Cartão de membro"
      subtitle="Apresente na reunião ou fiscalização"
    >
      <View style={styles.card}>
        <View style={styles.strip} />
        <Text style={styles.brand}>AMOTAX</Text>
        <Text style={styles.name}>{sessionMember?.name}</Text>
        <Text style={styles.num}>{code}</Text>
        <Text style={styles.meta}>{location}</Text>
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
    </MemberScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: RADIUS,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.navy,
    overflow: "hidden",
    width: "100%",
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
    textAlign: "center",
  },
  qrWrap: {
    marginTop: 20,
    padding: 12,
    backgroundColor: colors.gray100,
    borderRadius: RADIUS,
  },
});

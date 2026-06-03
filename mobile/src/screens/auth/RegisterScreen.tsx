import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { LocationSelector } from "../../components/LocationSelector";
import { MemberTopBar } from "../../components/MemberTopBar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import {
  findAdminPost,
  findDistrict,
  findProvince,
  resolveMunicipalityName,
} from "../../data/mozambique-locations";
import { useApp } from "../../context/AppContext";
import { colors } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { fontFamily, text } from "../../theme/typography";
import { isValidMozPhone, normalizePhone } from "../../utils/phone";
import type { MemberRegistrationKind } from "../../types";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

const REGISTRATION_TABS: { id: MemberRegistrationKind; label: string; plateLabel: string }[] =
  [
    { id: "mototaxi", label: "Moto", plateLabel: "Matrícula da moto" },
    { id: "tchopela", label: "Tchopela", plateLabel: "Matrícula da tchopela" },
  ];

export function RegisterScreen({ navigation }: Props) {
  const { register } = useApp();
  const [registrationKind, setRegistrationKind] =
    useState<MemberRegistrationKind>("mototaxi");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [otherLocality, setOtherLocality] = useState("");
  const [adminPostId, setAdminPostId] = useState("");
  const [praca, setPraca] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onProvinceChange = (id: string) => {
    setProvinceId(id);
    setDistrictId("");
    setMunicipalityId("");
    setOtherLocality("");
    setAdminPostId("");
    setPraca("");
  };

  const onDistrictChange = (id: string) => {
    setDistrictId(id);
    setMunicipalityId("");
    setAdminPostId("");
    setPraca("");
  };

  const onMunicipalityChange = (id: string) => {
    setMunicipalityId(id);
    if (id) setOtherLocality("");
  };

  const onAdminPostChange = (id: string) => {
    setAdminPostId(id);
    setPraca("");
  };

  const submit = async () => {
    if (!name.trim()) {
      setError("Indique o seu nome completo");
      return;
    }
    if (!isValidMozPhone(phone)) {
      setError("Número de telemóvel inválido");
      return;
    }
    const municipalityName = resolveMunicipalityName(
      provinceId,
      districtId,
      municipalityId,
      otherLocality,
    );
    if (!provinceId || !districtId || !adminPostId || !praca.trim()) {
      setError("Seleccione província, distrito, posto administrativo e indique a praça");
      return;
    }
    if (!municipalityName) {
      setError("Seleccione um município ou indique outro local de operação");
      return;
    }
    const province = findProvince(provinceId);
    const district = findDistrict(provinceId, districtId);
    const adminPost = findAdminPost(provinceId, districtId, adminPostId);
    if (!province || !district || !adminPost) {
      setError("Localização inválida");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register({
        phone: normalizePhone(phone),
        name,
        zoneId: `${provinceId}:${districtId}:${municipalityId || "outro-local"}:${adminPostId}`,
        province: province.name,
        district: district.name,
        municipality: municipalityName,
        adminPost: adminPost.name,
        praca: praca.trim(),
        smsOptIn,
        licensePlate: plate,
        registrationKind,
      });
      navigation.navigate("Otp", { phone: normalizePhone(phone), mode: "register" });
    } catch {
      Alert.alert("Erro", "Não foi possível concluir o registo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <MemberTopBar showBack onBack={() => navigation.goBack()} showLogout={false} />
      <Screen footer={<Button title="Continuar" onPress={submit} loading={loading} />} omitTopSafeArea>
        <View style={styles.form}>
          <View style={styles.tabs}>
            {REGISTRATION_TABS.map((tab) => {
              const active = registrationKind === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  style={[styles.tab, active && styles.tabActive]}
                  onPress={() => setRegistrationKind(tab.id)}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.tabHint}>
            {registrationKind === "mototaxi"
              ? "Registo como mototáxi (AMOTAX)"
              : "Registo como tchopela (AMOTAX)"}
          </Text>

          <Input
          label="Nome completo"
          value={name}
          onChangeText={setName}
          placeholder="O seu nome"
          align="left"
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Input
              label="Telemóvel"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="84 123 4567"
              align="left"
            />
          </View>
          <View style={styles.half}>
            <Input
              label={
                REGISTRATION_TABS.find((t) => t.id === registrationKind)?.plateLabel ??
                "Matrícula"
              }
              value={plate}
              onChangeText={setPlate}
              placeholder="ABC-1234"
              align="left"
            />
          </View>
        </View>

        <LocationSelector
          provinceId={provinceId}
          districtId={districtId}
          municipalityId={municipalityId}
          otherLocality={otherLocality}
          adminPostId={adminPostId}
          praca={praca}
          onProvinceChange={onProvinceChange}
          onDistrictChange={onDistrictChange}
          onMunicipalityChange={onMunicipalityChange}
          onOtherLocalityChange={setOtherLocality}
          onAdminPostChange={onAdminPostChange}
          onPracaChange={setPraca}
        />

        <Pressable
          style={styles.checkRow}
          onPress={() => setSmsOptIn(!smsOptIn)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: smsOptIn }}
        >
          <View style={[styles.check, smsOptIn && styles.checkOn]}>
            {smsOptIn ? <Text style={styles.checkIcon}>✓</Text> : null}
          </View>
          <Text style={styles.checkLabel}>
            Aceito receber comunicações da AMOTAX por SMS
          </Text>
        </Pressable>

        {error ? <Text style={styles.err}>{error}</Text> : null}
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  form: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  tabs: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: RADIUS,
    borderWidth: 2,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  tabActive: {
    borderColor: colors.navy,
    backgroundColor: colors.yellow,
  },
  tabText: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.navyMid,
  },
  tabTextActive: {
    fontFamily: fontFamily.bold,
    color: colors.navy,
  },
  tabHint: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.gray500,
    textAlign: "left",
    width: "100%",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    alignItems: "flex-start",
  },
  half: {
    flex: 1,
    minWidth: 0,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
    width: "100%",
    paddingHorizontal: 2,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: RADIUS,
    borderWidth: 2,
    borderColor: colors.navyMid,
    alignItems: "center",
    justifyContent: "center",
  },
  checkOn: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  checkIcon: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 16,
    color: colors.navy,
    marginTop: -1,
  },
  checkLabel: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray700,
    textAlign: "left",
  },
  err: {
    color: colors.danger,
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
});

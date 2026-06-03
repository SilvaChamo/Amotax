import { StyleSheet, Text, View } from "react-native";
import { MOZ_PROVINCES, OTHER_LOCALITY_LABEL } from "../data/mozambique-locations";
import { text } from "../theme/typography";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";

type Props = {
  provinceId: string;
  districtId: string;
  municipalityId: string;
  otherLocality: string;
  adminPostId: string;
  praca: string;
  onProvinceChange: (id: string) => void;
  onDistrictChange: (id: string) => void;
  onMunicipalityChange: (id: string) => void;
  onOtherLocalityChange: (value: string) => void;
  onAdminPostChange: (id: string) => void;
  onPracaChange: (value: string) => void;
};

export function LocationSelector({
  provinceId,
  districtId,
  municipalityId,
  otherLocality,
  adminPostId,
  praca,
  onProvinceChange,
  onDistrictChange,
  onMunicipalityChange,
  onOtherLocalityChange,
  onAdminPostChange,
  onPracaChange,
}: Props) {
  const province = MOZ_PROVINCES.find((p) => p.id === provinceId);
  const district = province?.districts.find((d) => d.id === districtId);

  const provinceOptions = MOZ_PROVINCES.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const districtOptions =
    province?.districts.map((d) => ({
      value: d.id,
      label: d.name,
    })) ?? [];

  const municipalityOptions =
    district?.municipalities.map((m) => ({
      value: m.id,
      label: m.name,
    })) ?? [];

  const adminPostOptions =
    district?.adminPosts.map((p) => ({
      value: p.id,
      label: p.name,
    })) ?? [];

  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>Zona de operação</Text>

      <Select
        label="Província"
        value={provinceId}
        options={provinceOptions}
        onValueChange={onProvinceChange}
        placeholder="Seleccione a província"
      />

      <Select
        label="Distrito"
        value={districtId}
        options={districtOptions}
        onValueChange={onDistrictChange}
        placeholder="Seleccione o distrito"
        enabled={Boolean(provinceId)}
      />

      <Select
        label="Município"
        value={municipalityId}
        options={municipalityOptions}
        onValueChange={onMunicipalityChange}
        placeholder={
          municipalityOptions.length > 0
            ? "Seleccione o município (opcional)"
            : "Nenhum município neste distrito"
        }
        enabled={Boolean(districtId) && municipalityOptions.length > 0}
      />

      <Select
        label="Posto administrativo"
        value={adminPostId}
        options={adminPostOptions}
        onValueChange={onAdminPostChange}
        placeholder="Seleccione o posto administrativo"
        enabled={Boolean(districtId)}
      />

      <Input
        label={OTHER_LOCALITY_LABEL}
        value={otherLocality}
        onChangeText={onOtherLocalityChange}
        placeholder="Indique outro local de operação"
        align="left"
        editable={Boolean(provinceId)}
      />

      <Input
        label="Praça"
        value={praca}
        onChangeText={onPracaChange}
        placeholder="Digite o nome da praça"
        align="left"
        editable={Boolean(adminPostId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    marginBottom: 4,
  },
  sectionTitle: {
    ...text.h3,
    textAlign: "left",
    alignSelf: "stretch",
    marginBottom: 10,
    marginTop: 4,
  },
});

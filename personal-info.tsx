import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { ScrollView, View } from "react-native"
import PLText from "#/components/PLText"
import BtnsControl from "#/components/forms/BtnsControl"
import RHF2StrInputs from "#/components/forms/RHF2StrInputs"
import RHF3NumInputs from "#/components/forms/RHF3NumInputs"
import RHFCheckbox from "#/components/forms/RHFCheckbox"
import RHFDropdown from "#/components/forms/RHFDropdown"
import RHFInput from "#/components/forms/RHFInput"
import { GenderEnum } from "#/lib/schemas"
import { type PersonalInfo, PersonalInfoSchema, useCCNIFormAtom } from "./form.ctx"

export default function ServiceCCNIPersonalInfoForm() {
  const [infos, setInfos] = useCCNIFormAtom()
  const { personalInfo } = infos

  const form = useForm({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: personalInfo,
  })

  const handleNextStep: SubmitHandler<PersonalInfo> = personalInfo => {
    setInfos({ ...infos, personalInfo })
    router.push("/services/chart-correction-n-interpretation/visual-info")
  }

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, flexGrow: 1, gap: 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <FormProvider {...form}>
        <RHFInput dir="rtl" name="chartName" label="نام چارت" />
        <RHFDropdown
          label="جنسیت"
          name="gender"
          placeholder={{ label: "یک مورد را انتخاب کنید...", value: "" }}
          items={[
            { label: "مذکر", value: GenderEnum.Values.male },
            { label: "مونث", value: GenderEnum.Values.female },
          ]}
        />
        <RHF2StrInputs
          label="مکان تولد"
          labels={["کشور", "شهر"]}
          names={["birthPlace.country", "birthPlace.city"]}
        />
        <RHF3NumInputs
          label="تاریخ تولد"
          labels={["روز", "ماه", "سال"]}
          names={["birthDate.d", "birthDate.m", "birthDate.y"]}
        />

        <View style={{ gap: 16 }}>
          <PLText style={{ fontFamily: "VazirmatnBold" }}>بازه احتمالی تولد:</PLText>
          <RHF3NumInputs
            label="از"
            labels={["ثانیه", "دقیقه", "ساعت"]}
            names={[
              "birthTimeEstimation.from.s",
              "birthTimeEstimation.from.m",
              "birthTimeEstimation.from.h",
            ]}
          />
          <RHF3NumInputs
            label="تا"
            labels={["ثانیه", "دقیقه", "ساعت"]}
            names={[
              "birthTimeEstimation.to.s",
              "birthTimeEstimation.to.m",
              "birthTimeEstimation.to.h",
            ]}
          />
        </View>

        <RHFCheckbox
          name="knowsInnateNInherentTemperament"
          label="مزاج جبلی و ذاتی خود را می‌شناسم. "
        />
        <RHFInput
          multiline
          dir="rtl"
          style={{ height: 80 }}
          name="temperamentDescription"
          label="توضیحات درباره مزاج"
          containerStyle={{
            display: form.watch().knowsInnateNInherentTemperament ? "flex" : "none",
          }}
        />
      </FormProvider>

      <BtnsControl
        style={{ marginTop: 0 }}
        firstBtnType="cancel"
        onFirstBtnClick={() => router.push("/services/chart-correction-n-interpretation")}
        secondBtnType="next"
        onSecondBtnClick={form.handleSubmit(handleNextStep)}
      />
    </ScrollView>
  )
}

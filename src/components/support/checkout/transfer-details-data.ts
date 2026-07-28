/* The bank rows of "بيانات التحويل" (wizard screen 2). Values are account
   data, not copy — they are never translated, so only the label carries a
   data-i18n key. */

export interface TransferField {
  label: string;
  labelKey: string;
  value: string;
}

export const TRANSFER_FIELDS: TransferField[] = [
  {
    label: "اسم البنك",
    labelKey: "checkout_field_bank",
    value: "Bank Of Palestine",
  },
  {
    label: "صاحب الحساب",
    labelKey: "checkout_field_holder",
    value: "مؤسسة صوت للإعلام",
  },
  {
    label: "رقم الحساب",
    labelKey: "checkout_field_account",
    value: "21256261162",
  },
  {
    label: "IBAN",
    labelKey: "checkout_field_iban",
    value: "Ps9656PA00000025951111",
  },
];

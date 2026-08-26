import {
  IconCoinBitcoin,
  IconHandsGive,
  IconPayCard,
} from "@/components/ui/icons";
import {
  LogoMastercard,
  LogoPaypal,
  LogoVisa,
} from "./PaymentBrandLogos";
import type { PaymentMethod } from "./payment-methods-data";

/* Card glyphs — kept here (not in payment-methods-data.ts) since that file is
   plain .ts and can't hold JSX. */
const METHOD_ICON = {
  gateway: IconPayCard,
  transfer: IconHandsGive,
  crypto: IconCoinBitcoin,
};

/* One option of "اختر طريقة الدعم التي تناسبك". Presentational — the pick lives
   in PaymentMethods. Same anatomy at every breakpoint: the card is a <label> so
   the whole panel is the radio's hit area, the native input stays in the DOM for
   keyboard + a11y and is visually replaced by .sp-method-dot, which CSS fills on
   :checked (same mechanics as .cl-type on /collaborate). */
export default function PaymentMethodCard({
  method,
  checked,
  onSelect,
}: {
  method: PaymentMethod;
  checked: boolean;
  onSelect: () => void;
}) {
  const Icon = METHOD_ICON[method.value];

  return (
    <div className="sp-method">
      <label className={"sp-method-card" + (checked ? " is-selected" : "")}>
        <input
          type="radio"
          name="payment-method"
          className="sp-method-input"
          value={method.value}
          checked={checked}
          onChange={onSelect}
        />
        <span className="sp-method-head">
          <span className="sp-method-marks">
            <span className="sp-method-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="sp-method-brands" aria-hidden="true">
              <LogoVisa />
              <LogoMastercard />
              <LogoPaypal />
            </span>
          </span>
          <span className="sp-method-dot" aria-hidden="true"></span>
        </span>

        <h3 className="sp-method-title" data-i18n={method.titleKey}>
          {method.title}
        </h3>
        <p className="sp-method-desc" data-i18n={method.descKey}>
          {method.desc}
        </p>
      </label>
    </div>
  );
}

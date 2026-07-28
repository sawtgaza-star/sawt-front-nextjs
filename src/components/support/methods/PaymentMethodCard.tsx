import {
  IconChevronLeftSmall,
  IconChevronLeftThin,
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

export default function PaymentMethodCard({
  method,
}: {
  method: PaymentMethod;
}) {
  const Icon = METHOD_ICON[method.value];

  return (
    /* .sp-method holds the coloured tab that peeks out above the white card */
    <div className={`sp-method sp-method--${method.accent}`}>
      <span className="sp-method-tab" aria-hidden="true"></span>

      <article className="sp-method-card">
        <div className="sp-method-head">
          <span className="sp-method-icon" aria-hidden="true">
            <Icon />
          </span>
          <div className="sp-method-brands">
            <LogoMastercard />
            <LogoPaypal />
            <LogoVisa />
          </div>
        </div>

        <h3 className="sp-method-title" data-i18n={method.titleKey}>
          {method.title}
        </h3>
        <p className="sp-method-desc" data-i18n={method.descKey}>
          {method.desc}
        </p>

        <a href={method.href} className="sp-method-cta">
          <span data-i18n="support_method_continue">المتابعة</span>
          {/* The mock uses a different chevron below 768px — both ship and CSS
              picks one, so each breakpoint matches its design exactly. */}
          <i className="sp-method-cta-arrow sp-method-cta-arrow--lg" aria-hidden="true">
            <IconChevronLeftSmall />
          </i>
          <i className="sp-method-cta-arrow sp-method-cta-arrow--sm" aria-hidden="true">
            <IconChevronLeftThin />
          </i>
        </a>
      </article>
    </div>
  );
}

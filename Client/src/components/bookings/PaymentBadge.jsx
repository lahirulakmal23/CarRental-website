import { PAYMENT } from "../../assets/constance/bookingconfig";

const PaymentBadge = ({ status }) => {
  const cfg = PAYMENT[status] ?? PAYMENT.pending;
  return (
    <span className={`inline-block px-[9px] py-[3px] rounded-full text-[11px] font-semibold ${cfg.wrapper}`}>
      {cfg.label}
    </span>
  );
};

export default PaymentBadge;
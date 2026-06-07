import  {STATUS} from "../../assets/constance/bookingconfig";

const BookingStatusBadge = ({ status }) => {
  const cfg = STATUS[status] ?? STATUS.pending;
  return (
    <span className={`inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full text-[11px] font-semibold ${cfg.wrapper}`}>
      <span className={`inline-block w-[6px] h-[6px] rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

export default BookingStatusBadge;

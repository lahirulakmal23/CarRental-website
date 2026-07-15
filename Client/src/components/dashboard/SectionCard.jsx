const SectionCard = ({ title, sub, children, action }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-[22px] pt-[18px] pb-[14px] border-b border-gray-100 flex items-start justify-between">
      <div>
        <h2 className="text-[14px] font-bold text-gray-900 m-0">{title}</h2>
        {sub && <p className="text-[12px] text-gray-400 mt-[3px] mb-0">{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
    {children}
  </div>
);

export default SectionCard;
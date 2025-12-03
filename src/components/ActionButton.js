const ActionButton = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer  hover:opacity-80 transition">
      <div className="flex items-center justify-center w-14 h-14 bg-gray-200 rounded-full mb-1">
        <span className='border rounded-full p-4 border-gray-300'>{icon}</span>
      </div>

      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
  );
};

export default ActionButton;

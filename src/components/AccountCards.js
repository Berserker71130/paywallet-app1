import { Plus, ChevronRight, LogOut, Trash2 } from "lucide-react";

export const AccountCard = ({
  currency,
  balance,
  status,
  onClick,
  onDelete,
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
    <div className="flex-1" onClick={onClick}>
      <p className="text-lg font-semibold text-gray-800">{currency}</p>
      <p className="text-sm text-gray-500">{balance.replace("NGN", "₦")}</p>
      {status && (
        <span className="text-xs text-indigo-500 font-medium">{status}</span>
      )}
    </div>

    <div className="flex items-center space-x-2">
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 text-red-500 hover:bg-red-200 rounded-full transition-colors"
          title="Remove Account"
        >
          <Trash2 size={20} />
        </button>
      )}
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  </div>
);

// Card component for adding new account
export const AddAccountCard = ({ currency, onClick }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
    <p className="text-base font-medium text-gray-700">{currency}</p>
    <button
      onClick={onClick}
      className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors"
    >
      <Plus size={16} />
      <span>Add Account</span>
    </button>
  </div>
);

export const LogOutItem = ({ onclick }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
    <div
      className="flex items-center justify-between p-4 transition-all duration-200 cursor-pointer hover:bg-red-50"
      onClick={onclick}
    >
      <div className="flex items-center space-x-4">
        <LogOut size={22} className="text-red-500" />
        <p className="text-base font-medium text-red-600">Log Out</p>
      </div>
      <ChevronRight size={18} className="text-red-500" />
    </div>
  </div>
);

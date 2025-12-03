import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaCog,
  FaCreditCard,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Dashboard", path: "/dashboard", icon: FaChartBar },
    { name: "Payments", path: "/payments", icon: FaCreditCard },
    { name: "Transactions", path: "/transactions", icon: FaHistory },
    { name: "Settings", path: "/settings", icon: FaCog },
  ];

  return (
    <nav className="w-72 bg-white border-r border-gray-200 p-4 flex-shrink-0">
      <div className="text-2xl font-bold text-indigo-600 mb-8">FinDash</div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 my-1 rounded-lg transition duration-200 ${
              isActive
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
            }`}
          >
            <item.icon className="mr-3 text-xl" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Sidebar;

import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  BadgeHelp,
  LayoutDashboard,
  Search,
  BrainCircuit,
  View,
  User,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/logowhite.svg";

const SIDEBAR_ITEMS = [
  {
    name: "How To Use",
    icon: BadgeHelp,
    color: "#0094ff",
    href: "/howto",
  },
  { name: "Dashboard", icon: LayoutDashboard, color: "#0094ff", href: "/" },
  { name: "Detect", icon: Search, color: "#0094ff", href: "/detect" },
  { name: "Analyze", icon: BrainCircuit, color: "#0094ff", href: "/analyze" },
  { name: "Visualize", icon: View, color: "#0094ff", href: "/visualize" },
  { name: "Profile", icon: User, color: "#0094ff", href: "/profile" },

  // { name: "Orders", icon: ShoppingCart, color: "#0094ff", href: "/orders" },
  // { name: "Analytics", icon: TrendingUp, color: "#0094ff", href: "/analytics" },
  // { name: "Settings", icon: Settings, color: "#0094ff", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <div style={{ display: "flex" }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </motion.button>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <Logo style={{ width: "120px" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;

import {
  Menu,
  BadgeHelp,
  LayoutDashboard,
  Search,
  BrainCircuit,
  View,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/logowhite.svg";
import { ReactComponent as Logo2 } from "../../assets/svg/logoblack.svg";
import { useDarkMode } from "../../contexts/darkModeContext";

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
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use dark mode context

  // Use bg-white for a light sidebar background in light mode
  const backgroundColor = isDarkMode ? "bg-gray-800" : "u-white-bg";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const hoverColor = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div
        className={`h-full ${backgroundColor} bg-opacity-50 backdrop-blur-md p-4 flex flex-col ${borderColor} border-r`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Toggle Sidebar Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-full ${hoverColor} transition-colors max-w-fit`}
          >
            <Menu size={24} className={textColor} />
          </motion.button>

          {/* Logo */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                {isDarkMode ? (
                  <Logo style={{ width: "120px" }} />
                ) : (
                  <Logo2 style={{ width: "120px" }} />
                )}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${hoverColor} transition-colors max-w-fit`}
          ></motion.button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={`flex items-center p-4 text-sm font-medium rounded-lg ${hoverColor} transition-colors mb-2`}
              >
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className={`ml-4 whitespace-nowrap ${textColor}`}
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
          <motion.div
            className={`flex items-center p-4 text-sm font-medium rounded-lg ${hoverColor} transition-colors mb-2`}
            onClick={toggleDarkMode}
            style={{ cursor: "pointer" }}
          >
            {isDarkMode ? (
              <Sun size={20} style={{ color: "#0094ff", minWidth: "20px" }} />
            ) : (
              <Moon size={20} style={{ color: "#0094ff", minWidth: "20px" }} />
            )}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  className={`ml-4 whitespace-nowrap ${textColor}`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;

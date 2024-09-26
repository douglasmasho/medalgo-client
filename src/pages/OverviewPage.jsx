import { useState, useEffect } from "react";
import { BarChart2, ShoppingBag, Users, Zap, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import { useAuth } from "../contexts/authContext/index";
import { Navigate } from "react-router-dom";
import PatientsTable from "../components/users/PatientsTable";
import { useDarkMode } from "../contexts/darkModeContext";

const OverviewPage = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode()


  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);



  return (
    <div
      className={`flex-1 overflow-auto relative z-10 ${isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
        }`}
    >
      {!userLoggedIn && !loggedInUser ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <>
          <Header title="Dashboard" icon={<LayoutDashboard style={{ marginRight: "10px" }} color="#0094ff" />} />


          {loggedInUser?.role === "medical" ? (
            <>
              <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <PatientsTable isDarkMode={isDarkMode} />
              </main>

              {/* <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >

                  <StatCard
                    name="Total Sales"
                    icon={Zap}
                    value="$12,345"
                    color="#6366F1"
                  />


                  <StatCard
                    name="New Users"
                    icon={Users}
                    value="1,234"
                    color="#8B5CF6"
                  />

                  <StatCard
                    name="Total Products"
                    icon={ShoppingBag}
                    value="567"
                    color="#EC4899"
                  />


                  <StatCard
                    name="Conversion Rate"
                    icon={BarChart2}
                    value="12.5%"
                    color="#10B981"
                  />

                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SalesOverviewChart />
                  <CategoryDistributionChart />
                  <SalesChannelChart />
                </div>
              </main> */}

            </>

          ) : null}


        </>
      )}
    </div>
  );
};

export default OverviewPage;

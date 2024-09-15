import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { User } from "lucide-react";
import Login from "../components/auth/login";


const iconStyle = {
  width: "100px",
};


const LoginPage = () => {
  const [files, setFiles] = useState([]);
  const [predictedClass, setPredictedClass] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header
        title="Profile"
        icon={<User style={{ marginRight: "10px" }} />}
      />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <Login/>
      </main>

      
    </div>
  );
};
export default LoginPage;

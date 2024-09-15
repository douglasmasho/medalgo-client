import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { User } from "lucide-react";
import Login from "../components/auth/login";
import { doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";


const iconStyle = {
  width: "100px",
};


const ProfilePage = () => {

  const signOut = async()=>{
    await doSignOut();
  }
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header
        title="Profile"
        icon={<User style={{ marginRight: "10px" }} />}
      />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        This is the Profile of the user
        <button onClick={signOut}>Sign Out</button>
      </main>

      
    </div>
  );
};
export default ProfilePage;

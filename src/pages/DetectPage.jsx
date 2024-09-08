import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import { Search, BrainCircuit, View, BadgeHelp } from "lucide-react";

const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

const iconStyle = {
	width: "100px"
}

const DetectPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Detect' icon={<Search style={{marginRight: "10px"}}/>}/>

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 1 }}
				>
                    {/* Detect Part */}
                    <p>Upload a brain MRI image to detect the presence of a tumor and more information about the tumor if it exists</p>
				</motion.div>
			</main>

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 1 }}
				>
                    {/* Results Part */}
				</motion.div>
			</main>
		</div>
	);
};
export default DetectPage;

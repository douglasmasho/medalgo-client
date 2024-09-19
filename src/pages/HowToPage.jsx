import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import PatientsTable from "../components/users/PatientsTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import { Search, BrainCircuit, View, BadgeHelp } from "lucide-react";
import { useAuth } from "../contexts/authContext/index";
import { Navigate } from "react-router-dom";

const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

const iconStyle = {
	width: "100px"
}

const HowToPage = () => {
	const { currentUser, userLoggedIn } = useAuth();
	console.log(currentUser);
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			{!userLoggedIn ? (<Navigate to="/login" replace={true} />) :
				<>
					<Header title='Welcome to Medalgo' icon={<BadgeHelp style={{ marginRight: "10px" }} />} />

					<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
						<motion.div
							className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 1 }}
						>
							<p>Welcome to Medalgo, a powerful tool designed to assist medical professionals in the detection and classification of brain tumors. This application leverages advanced machine learning algorithms to analyze MRI scans and identify potential cases of high-grade and low-grade gliomas.</p>
							<br />
							<h2 className="bigger-text u-margin-bottom-small">Features</h2>

							<div className="grid grid-3 u-margin-bottom-medium">
								<motion.div
									className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 center-text'
									whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
								>
									<div className='px-4 py-5 sm:p-6 '>
										<Search style={{ color: "#3B82F6" }} size={100} className="u-margin-bottom-small" />
										<h3 className="bigish-text">Detect</h3>
									</div>
								</motion.div>

								<motion.div
									className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 center-text'
									whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
								>
									<div className='px-4 py-5 sm:p-6'>
										<BrainCircuit style={{ color: "#3B82F6" }} size={100} className="u-margin-bottom-small" />
										<h3 className="bigish-text">Analyze</h3>

									</div>
								</motion.div>

								<motion.div
									className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 center-text'
									whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
								>
									<div className='px-4 py-5 sm:p-6'>
										<View style={{ color: "#3B82F6" }} size={100} className="u-margin-bottom-small" />

										<h3 className="bigish-text">Visualize</h3>

									</div>
								</motion.div>
							</div>

							{/* Detect */}
							<h2 className="bigger-text u-margin-bottom-small"><Search style={{ color: "#3B82F6", marginRight: "10px" }} />Detect</h2>
							<h3 className="u-margin-bottom-tiny bigish-text">Introduction</h3>
							<p className="u-margin-bottom-small">Detect allows you to quickly analyze MRI scans for the presence of brain tumors. This feature highlights any detected tumors and classifies them into one of three types: glioma, meningioma, pituitary, or determines if no tumor is present (healthy).</p>

							<h3 className="u-margin-bottom-tiny bigish-text">Tutorial</h3>
							<ul className="list u-margin-bottom-medium">
								<li>Navigate to the <strong><Search style={{ color: "#3B82F6", margin: "5px" }} />Detect</strong> tab.</li>
								<li>Click <strong>Upload</strong> and select the MRI image from your device.</li>
								<li>Wait a moment while the image is processed.</li>
								<li>View the results: the tumor will be highlighted, and the system will display the tumor type.</li>
								<li>Optionally, download the report for further reference or save to patient.</li>
							</ul>

							{/* Analyze */}
							<h2 className="bigger-text u-margin-bottom-small"><BrainCircuit style={{ color: "#3B82F6", marginRight: "10px" }} />Analyze</h2>
							<h3 className="u-margin-bottom-tiny bigish-text">Introduction</h3>
							<p className="u-margin-bottom-small">Analyze helps determine whether a glioma tumor is high-grade (HGG) or low-grade (LGG). Upload a .nii file, and Medalgo will classify the grade, offering insight for further medical evaluation.</p>

							<h3 className="u-margin-bottom-tiny bigish-text">Tutorial</h3>
							<ul className="list u-margin-bottom-medium">
								<li>Open the <strong><BrainCircuit style={{ color: "#3B82F6", margin: "5px" }} />Analyze </strong> section.</li>
								<li>Click <strong>Upload</strong> and select a .nii MRI file from your device.</li>
								<li>Once uploaded, the system will analyze the glioma’s grade.</li>
								<li>The result will show whether the glioma is classified as high-grade (HGG) or low-grade (LGG).</li>
								<li>Optionally, download the report for further reference or save to patient.</li>
							</ul>

							{/* Visualize */}
							<h2 className="bigger-text u-margin-bottom-small"><View style={{ color: "#3B82F6", marginRight: "10px" }} />Analyze</h2>
							<h3 className="u-margin-bottom-tiny bigish-text">Introduction</h3>
							<p className="u-margin-bottom-small">Visualize lets you explore MRI scans stored in .nii format, offering a clear and detailed view of the brain images. You can interact with the images and gain a better understanding of the scan.</p>

							<h3 className="u-margin-bottom-tiny bigish-text">Tutorial</h3>
							<ul className="list u-margin-bottom-tiny">
								<li>Go to the <strong><View style={{ color: "#3B82F6", margin: "5px" }} />Visualize </strong> tab.</li>
								<li>Click <strong>Upload</strong> to select your .nii file.</li>
								<li>Use the provided tools to explore different layers and views of the MRI scan.</li>
								<li>Zoom in, pan, and rotate the image as needed to get a detailed look.</li>
								<li>Optionally, download the report for further reference or save to patient.</li>
							</ul>

						</motion.div>


					</main>
				</>
			}
		</div>
	);
};
export default HowToPage;

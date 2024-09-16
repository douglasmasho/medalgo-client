import { Navigate } from "react-router-dom";
import Header from "../components/common/Header";
import DangerZone from "../components/settings/DangerZone";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";
import { useAuth } from "../contexts/authContext";
import {User} from "lucide-react"

const SettingsPage = () => {
	const {userLoggedIn} = useAuth();
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>

		{!userLoggedIn ? (<Navigate to="/login" replace={true}/>) :
				<>
				<Header
						title="Profile"
						icon={<User style={{ marginRight: "10px" }} />}
					/>
							<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
								<Profile />
								<Security />
								<DangerZone />
							</main>
				</>

}
		</div>
	);
};
export default SettingsPage;

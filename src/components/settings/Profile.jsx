import { useEffect, useState } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/authContext";
import { db } from "../../firebase/firebase";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animation from "../../assets/animation/loadingcubes.json"

const Profile = () => {
	const navigate = useNavigate();
	const [userPic, setUserPic] = useState("");
	const { currentUser } = useAuth();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("")
	const [role, setRole] = useState("");
	const [organization, setOrganization] = useState("");
	const [loading, setLoading] = useState(false);

	const getProfileDetails = async () => {
		setLoading(true)
		try {
			const docRef = await getDoc(doc(db, "users", currentUser.uid));
			console.log(docRef);
			const userObj = docRef.data();
			setUserPic(userObj.profilePic);
			setFullName(userObj.fullName);
			setEmail(userObj.email);
			setOrganization(userObj.organization);
			
		} catch (e) {
			toast.error(e.code)
		}finally{
			setLoading(false);
		}

	}

	useEffect(() => {
		getProfileDetails();
	}, [])




	const signOut = async () => {
		try {
			await doSignOut();
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<SettingSection icon={User} title={"Personal Info"}>
			{
				loading ?
					<div className="u-center-hrz">
						<Lottie animationData={animation} style={{ width: "500px" }} />
					</div> :
					<>
						<div className='flex flex-col sm:flex-row items-center mb-6'>
							<img
								src={userPic}
								alt='Profile'
								className='rounded-full w-20 h-20 object-cover mr-4'
							/>

							<div>
								<h3 className='text-lg font-semibold text-gray-100'>{fullName}</h3>
								<p className='text-gray-400'>{email}</p>
							</div>
						</div>
						<div className="u-margin-bottom-small">
							<p className='text-lg white-text'>Role: <span className="text-base">{role === "medical" ? "Medical Professional" : "Researcher"}</span></p>
							<p className='text-lg white-text'>Institution / Organization: <span className="text-base">{organization}</span></p>
						</div>


						<button className='bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mr-5' onClick={signOut}>
							Sign Out
						</button>
						<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto' onClick={() => {
							navigate("/editprofile")
						}}>
							Edit Profile
						</button>
					</>


			}

		</SettingSection>
	);
};
export default Profile;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Plus, CircleX } from "lucide-react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import AddPatientForm from "../forms/AddPatientForm";
import { doc, setDoc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContext";
import Lottie from "lottie-react";
import animation from "../../assets/animation/loadingcubes.json"
import moment from "moment";

const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };
  

const PatientsTabl2 = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [allPatients, setAllPatients] = useState([]);
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {currentUser} = useAuth()

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = allPatients.filter(
			(user) => user.fullName.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	const getAge = (birthDate) => {
		// Create a moment object for the birth date
		const birthMoment = birthDate
		// Get the current date
		const currentMoment = moment();
		// Calculate the age in years
		const age = currentMoment.diff(birthMoment, "years");
		return age;
	  };

	const getPatients = async()=>{
		setFilteredUsers([]);
		setAllPatients([])
		try{
			setIsLoading(true);
			const docSnap = await getDoc(doc(db, "users", currentUser.uid));
			const patientsList = docSnap.data().patients;
			if(patientsList.length === 0){
				setIsLoading(0)
			}else{
				patientsList.forEach(async(pid, index)=>{
					// console.log("iurlhgfiurhgluierhgluierhlguiehrl")
					const docSnap = await getDoc(doc(db, "patients", pid));
					setFilteredUsers(prevState=>[...prevState, {
						...docSnap.data(),
						age: getAge(docSnap.data().dob)
					}]);
					setAllPatients(prevState=>[...prevState, {
						...docSnap.data(),
						age: getAge(docSnap.data().dob)
					}]);
					// console.log(patientsList.length)
					if(index === patientsList.length - 1){
						setIsLoading(false);
					}
				})
			}

		}catch(e){
			console.log(e);
			toast.error(e.code)
			setIsLoading(false);
		}
	}

	useEffect(()=>{
		getPatients();
	}, [])

	return (
		<>
		 { isLoading ?
		  <div className="u-center-hrz">
          <Lottie animationData={animation} style={{ width: "200px" }} />
        </div> : 

		<motion.div
		className=' bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay: 0.2 }}
	>
		<div className='flex justify-between items-center mb-6'>
			<h2 className='text-xl font-semibold text-gray-100'>Patients</h2>
			<div style={{display: "flex"}}>
			<div className='relative'>
			<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				<input
					type='text'
					placeholder='Search patients...'
					className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>
			</div>

		</div>

		<div className='overflow-x-auto'>
			<table className='min-w-full divide-y divide-gray-700'>
				<thead>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
							Name
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
							Age
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
							Gender
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
							Last Diagnosis
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
							Add to Patient
						</th>
					</tr>
				</thead>

				<tbody className='divide-y divide-gray-700'>
					{filteredUsers.map((user) => (
						<motion.tr
							key={user.pid}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
											{user.fullName.charAt(0)}
										</div>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-gray-100'>{user.fullName}</div>
									</div>
								</div>
							</td>

							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{user.age}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
									{user.gender}
								</span>
							</td>

							<td className='px-6 py-4 whitespace-nowrap white-text'>
								{user.lastDiagnosis ? moment(user.lastDiagnosis).format('Do MMMM YYYY, h:mm:ss a') : "Not yet diagnosed"}
							</td>

							<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 u-v'>
                            <button className='bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mx-5'>
                              <Plus/>
                            </button>
							</td>
						</motion.tr>
					))}
				</tbody>
			</table>
		</div>
	</motion.div>
		}
		</>

	);
};
export default PatientsTabl2;

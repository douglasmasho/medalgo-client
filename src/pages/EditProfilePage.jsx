import { Navigate } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../contexts/authContext";
import SettingSection from "../components/settings/SettingSection";
import { Dice1, User, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import Avatar from 'react-avatar-edit';
import { db, storage } from '../firebase/firebase'; // Import your Firebase config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase storage functions
import { doc, updateDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";


function base64ToBlob(base64) {
	const [metadata, base64String] = base64.split(',');
	const mime = metadata.match(/:(.*?);/)[1];
	const byteCharacters = atob(base64String);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512);
		const byteNumbers = new Array(slice.length);

		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: mime });
}


const EditProfilePage = () => {
	const [preview, setPreview] = useState(null);
	const [src, setSrc] = useState("");
	const [changingPic, setChangingPic] = useState(true);
	const [userPic, setUserPic] = useState("");

	const { userLoggedIn, currentUser } = useAuth();

	const getProfilePic = async () => {
		try {
			const docSnap = await getDoc(doc(db, "users", currentUser.uid));
			setUserPic(docSnap.data().profilePic);
		} catch (e) {
			console.log(e);
			toast.error(e.code)
		}
	}
	useEffect(() => {
		getProfilePic();
	}, [])

	const onClose = () => {
		setPreview(null);
	}

	const onCrop = (preview) => {
		setPreview(preview)
	}

	const onBeforeFileLoad = (elem) => {
		// if (elem.target.files[0].size > 71680) {
		// 	alert("File is too big!");
		// 	elem.target.value = "";
		// };
	}

	const uploadFile = async () => {
		const uid = currentUser.uid;
		console.log(uid);
		const blob = base64ToBlob(preview);
		// Get the MIME type from the Blob
		const mimeType = blob.type;
		// Determine the file extension from the MIME type
		const extension = mimeType.split('/')[1]; // e.g., 'png', 'jpeg'
		// Append the extension to the file name
		const fileNameWithExtension = `profile.${extension}`;
		const storageRef = ref(storage, `profile-pics/${uid}-${fileNameWithExtension}`); // Use the file name with extension
		try {
			// Upload the Blob to Firebase Storage
			await uploadBytes(storageRef, blob);
			console.log('Upload successful');
			const downloadURL = await getDownloadURL(storageRef);
			await updateDoc(doc(db, "users", uid), {
				profilePic: downloadURL
			})
			const docSnap = await getDoc(doc(db, "users", currentUser.uid));
			setUserPic(docSnap.data().profilePic);
			setChangingPic(false);
			setPreview(null);
		} catch (error) {
			console.error('Upload failed', error);
		}
	};


	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			{!userLoggedIn ? (<Navigate to="/login" replace={true} />) :
				<>
					<Header title='Edit Profile' icon={<UserRoundPen className="mr-2" />} />
					<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
						<SettingSection icon={User} title={"Profile Picture"}>
							<div className='flex flex-col sm:flex-row items-center mb-6 center-hrz--col'>
								<img
									src={userPic}
									alt='Profile'
									className='rounded-full  object-cover mr-4 mb-5'
									style={{ width: "200px" }}
								/>
								{
									changingPic ?
										null :
										<button className='bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mr-5' onClick={() => {
											setChangingPic(true);
										}}>
											Change Profile Picture
										</button>
								}

							</div>


						</SettingSection>
						{
							changingPic ?
								<SettingSection icon={User} title={"Choose Profile Picture"}>
									<button className='u-margin-bottom bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mr-5' onClick={() => {
										setChangingPic(false);
										setPreview(null)
									}}>
										Cancel
									</button>

									<div style={{ display: "flex", justifyContent: "space-around" }}>
										<div className="mr-10">
											<Avatar
												width={300}
												height={300}
												onCrop={onCrop}
												onClose={onClose}
												onBeforeFileLoad={onBeforeFileLoad}
												src=""
											/>
										</div>

										<div style={{ width: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
											{
												preview ?
													<img src={preview} alt="Preview" /> :
													<div style={{ width: "100%", height: "100%", backgroundColor: "black" }}>

													</div>
											}
										</div>
									</div>
									<div className="u-center-hrz">
										<button className='u-margin-bottom u-margin-top bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mr-5' onClick={uploadFile}>
											Change Profile Picture
										</button>
									</div>


								</SettingSection> : null
						}

					</main>
				</>
			}


		</div>
	);
};
export default EditProfilePage;

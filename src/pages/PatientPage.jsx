import { useEffect, useState } from "react";
import { User, CircleX, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/common/Header";
import { useAuth } from "../contexts/authContext/index";
import { Navigate } from "react-router-dom";
import { useDarkMode } from "../contexts/darkModeContext";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animation from "../assets/animation/loadingcubes.json";
import moment from "moment";
import DiagnosisTable from "../components/users/DiagnosisTableDetect";
import DiagnosisTable2 from "../components/users/DiagnosisTableAnalysis";
import { Modal } from 'react-responsive-modal';
import EditPatientForm from "../components/forms/EditPatientForm";


const PatientPage = () => {
    console.log("uhifuwhe")
    const { currentUser, userLoggedIn } = useAuth();
    const { isDarkMode } = useDarkMode(); // Use dark mode context
    const { pid } = useParams();
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [detectDiagnoses, setDetectDiagnoses] = useState([]);
    const [analysisDiagnoses, setAnalysisDiagnoses] = useState([]);
    const [open, setOpen] = useState(false);


    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(() => {
        console.log(pid);
        getPatient();
        getDiagnoses();
    }, [])

    const getPatient = async () => {
        setIsLoading(true);
        try {
            const patient = await getDoc(doc(db, "patients", pid));
            setPatient(patient.data())
        } catch (e) {
            toast.error(e.code);
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    const getAge = (birthDate) => {
        const birthMoment = birthDate;
        const currentMoment = moment();
        return currentMoment.diff(birthMoment, "years");
    };

    const getDiagnoses = async () => {
        try {
            const diagnoses = await getDoc(doc(db, "diagnosisSets", pid));
            console.log(diagnoses.data().detect)
            setDetectDiagnoses(diagnoses.data().detect);
            setAnalysisDiagnoses(diagnoses.data().analyze);
        } catch (e) {
            console.log(e)
            toast.error(e)
        } finally {
            setIsLoading(false);
        }
    }

    const deleteDiagnosis = async(pid, did, grade)=>{
        try{
            //remove the document from the rightful collection.
            // check if diagnosis has grade
            setIsLoading(true);
            let collectionString = grade ? "analysisDiagnosis" : "detectDiagnosis";
            await deleteDoc(doc(db, collectionString, did))

            //remove it from the diagnosisSet of the patient
            await updateDoc(doc())
        }catch(e){
            toast.error(e.code);
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    const deletePatient = ()=>{

    }

    // Set dynamic colors based on the mode
    const backgroundColor = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
    const textColor = isDarkMode ? "text-gray-100" : "text-gray-900";
    const secondaryTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
    return (
        <div className={`flex-1 overflow-auto relative z-10 ${backgroundColor}`}>
            {!userLoggedIn ? (
                <Navigate to="/login" replace={true} />
            ) : (
                isLoading ?
                    <div className="u-center-hrz--col">
                        <Lottie animationData={animation} style={{ width: "200px" }} />
                    </div> :
                    patient &&
                    <>
                        <Header
                            title={`Patient: ${patient?.fullName}`}
                            icon={<User style={{ marginRight: "10px" }} color="#0094ff" />}
                        />

                        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                            <motion.div
                                className={`shadow-lg rounded-xl p-6 border ${backgroundColor} ${borderColor}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 1 }}
                            >
                                <h2 className={`bigger-text u-margin-bottom-small ${textColor}`}>Details</h2>
                                <p className={textColor}>Name: {patient.fullName}</p>
                                <p className={`${textColor} capitalize-text`}>Gender: {patient.gender}</p>
                                <p className={textColor}>Age: {getAge(patient.dob)}</p>

                                <p className={textColor}>Last Diagnosis: {
                                    patient.lastDiagnosis ?
                                        moment(patient.lastDiagnosis).format("Do MMMM YYYY, h:mm:ss a") : "Not yet diagnosed"}</p>
                                <div className="u-margin-top-small" style={{display: "flex"}}>
                                    <motion.button
                                        className="bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mr-5"
                                        style={{ display: "flex", alignItems: "center" }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onOpenModal}
                                    >
                                        <Pencil className="mr-2" />
                                        Edit Patient
                                    </motion.button>

                                    <motion.button
                                        className="bg-red-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mr-5"
                                        style={{ display: "flex", alignItems: "center" }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Trash2 className="mr-2" />
                                        Delete Patient
                                    </motion.button>
                                </div>

                            </motion.div>
                        </main>
                        {
                            detectDiagnoses.length !== 0 ?
                                <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                                    <motion.div
                                        className={`shadow-lg rounded-xl p-6 border ${backgroundColor} ${borderColor}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 1 }}
                                    >
                                        <DiagnosisTable diagnoses={detectDiagnoses} />
                                    </motion.div>
                                </main> : null
                        }

                        {
                            analysisDiagnoses.length !== 0 ?
                                <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                                    <motion.div
                                        className={`shadow-lg rounded-xl p-6 border ${backgroundColor} ${borderColor}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                    >
                                        <DiagnosisTable2 diagnoses={analysisDiagnoses} />
                                    </motion.div>
                                </main> : null
                        }
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              modal: `${
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              } backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700`,
            }}
            styles={{
              modal: {
                width: "80%",
              },
            }}
            closeIcon={<CircleX 
				style={isDarkMode ? { color: "white" } : {color:" black"}}
				 />}
          >
            <h2 className="text-2xl font-semibold">
              Edit Patient
            </h2>
            <EditPatientForm closeModal={onCloseModal} getPatient={getPatient} isDarkMode={isDarkMode} pid={pid} fullNameProp={patient.fullName} genderProp={patient.gender} dobProp={patient.dob}/>
          </Modal>
                    </>
            )}
        </div>
    );
};

export default PatientPage;

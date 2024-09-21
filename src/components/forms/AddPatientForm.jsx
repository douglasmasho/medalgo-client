import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../firebase/firebase";
import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import Lottie from "lottie-react";
import animation from "../../assets/animation/loadingcubes.json";
import { nanoid } from 'nanoid'
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";


const AddPatientForm = ({closeModal, getPatients}) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const {currentUser} = useAuth();



  const getAge = (birthDate) => {
    // Create a moment object for the birth date
    const birthMoment = moment(birthDate.getTime());
    // Get the current date
    const currentMoment = moment();
    // Calculate the age in years
    const age = currentMoment.diff(birthMoment, "years");
    return age;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAdding) {
      setIsAdding(true);
      setIsLoading(true);
      try {
        const data = {
          fullName,
          gender,
          dob: startDate.getTime(),
          lastDiagnosis: null
        };
        const pid =  nanoid(12);
        await setDoc(doc(db, "patients", pid), data);
        await updateDoc(doc(db, "users", currentUser.uid), {
          patients: arrayUnion(pid)
        })
        toast.success("Successfully added patient");

      } catch (e) {
        toast.error(e.code);
        console.log(e)
      } finally {
        setIsAdding(false);
        setIsLoading(false);
        setFullName("");
        setGender("");
        setStartDate(new Date());
        getPatients();
        closeModal();
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="u-center-hrz">
          <Lottie animationData={animation} style={{ width: "500px" }} />
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="space-y-4 white-text u-margin-top-small"
          style={{ width: "90%" }}
        >
          <div>
            <label className="text-sm white-text font-bold">Full Name</label>
            <input
              type="text"
              autoComplete="full-name"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
            />
          </div>

          <div>
            <label className="text-sm white-text font-bold">Gender</label>
            <select
              required
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="male" className="black-text">
                Male
              </option>
              <option value="female" className="black-text">
                Female
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm white-text font-bold">
              Date of Birth
            </label>
            <br />
            {/* <input
                        type="date"
                        autoComplete='date-of-birth'
                        required
                        value={dob} onChange={(e) => { setDob(e.target.value) }}
                        className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                    /> */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full mt-2 px-3 py-2 white-text bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
            />
          </div>

          {errorMessage && (
            <span className="text-red-600 font-bold">{errorMessage}</span>
          )}

          <button
            type="submit"
            className=" px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
          >
            Add Patient
          </button>
        </form>
      )}
    </>
  );
};

export default AddPatientForm;

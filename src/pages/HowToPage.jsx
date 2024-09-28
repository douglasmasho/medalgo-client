import { Search, BrainCircuit, View, BadgeHelp } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { useAuth } from "../contexts/authContext/index";
import { Navigate } from "react-router-dom";
import { useDarkMode } from "../contexts/darkModeContext";

const HowToPage = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const { isDarkMode } = useDarkMode(); // Use dark mode context

  // Set dynamic colors based on the mode
  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-800" : "border-gray-300";
  const textColor = isDarkMode ? "white-text" : "text-gray-900";
  const secondaryTextColor = isDarkMode ? "white-text" : "text-gray-600";

  return (
    <div className={`flex-1 overflow-auto relative z-10 ${backgroundColor}`}>
      {!userLoggedIn ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <>
          <Header
            title="Welcome to Medalgo"
            icon={<BadgeHelp style={{ marginRight: "10px" }} color="#0094ff"/>}
          />

          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            <motion.div
              className={`shadow-lg rounded-xl p-6 border ${backgroundColor} ${borderColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <p className={textColor}>
                Welcome to Medalgo, a powerful tool designed to assist medical
                professionals in the detection and classification of brain
                tumors. This application leverages advanced machine learning
                algorithms to analyze MRI scans and identify potential cases of
                high-grade and low-grade gliomas.
              </p>
              <br />
              <h2 className={`bigger-text u-margin-bottom-small ${textColor}`}>
                Features
              </h2>

              <div className="grid grid-3 u-margin-bottom-medium">
                <motion.div
                  className={`overflow-hidden shadow-lg rounded-xl border ${backgroundColor} ${borderColor} center-text`}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <Search
                      style={{ color: "#3B82F6" }}
                      size={100}
                      className="u-margin-bottom-small"
                    />
                    <h3 className={`bigish-text ${textColor}`}>Detect</h3>
                  </div>
                </motion.div>

                <motion.div
                  className={`overflow-hidden shadow-lg rounded-xl border ${backgroundColor} ${borderColor} center-text`}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <BrainCircuit
                      style={{ color: "#3B82F6" }}
                      size={100}
                      className="u-margin-bottom-small"
                    />
                    <h3 className={`bigish-text ${textColor}`}>Grade</h3>
                  </div>
                </motion.div>

                <motion.div
                  className={`overflow-hidden shadow-lg rounded-xl border ${backgroundColor} ${borderColor} center-text`}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <View
                      style={{ color: "#3B82F6" }}
                      size={100}
                      className="u-margin-bottom-small"
                    />
                    <h3 className={`bigish-text ${textColor}`}>Visualize</h3>
                  </div>
                </motion.div>
              </div>

              {/* Detect Section */}
              <h2 className={`bigger-text u-margin-bottom-small ${textColor}`}>
                <Search
                  style={{ color: "#3B82F6", marginRight: "10px" }}
                />
                Detect
              </h2>
              <h3 className={`u-margin-bottom-tiny bigish-text ${textColor}`}>
                Introduction
              </h3>
              <p className={`u-margin-bottom-small ${secondaryTextColor}`}>
                Detect allows you to quickly analyze MRI scans for the presence
                of brain tumors. This feature highlights any detected tumors and
                classifies them into one of three types: glioma, meningioma,
                pituitary, or determines if no tumor is present (healthy).
              </p>

              <h3 className={`u-margin-bottom-tiny bigish-text ${textColor}`}>
                Tutorial
              </h3>
              <ul className={`list u-margin-bottom-medium ${secondaryTextColor}`}>
                <li>
                  Navigate to the{" "}
                  <strong>
                    <Search style={{ color: "#3B82F6", margin: "5px" }} />
                    Detect
                  </strong>{" "}
                  tab.
                </li>
                <li>
                  Click <strong>Upload</strong> and select the MRI image from
                  your device.
                </li>
                <li>Wait a moment while the image is processed.</li>
                <li>
                  View the results: the tumor will be highlighted, and the
                  system will display the tumor type.
                </li>
                <li>
                  Optionally, download the report for further reference or save
                  to patient.
                </li>
              </ul>

              {/* Analyze Section */}
              <h2 className={`bigger-text u-margin-bottom-small ${textColor}`}>
                <BrainCircuit
                  style={{ color: "#3B82F6", marginRight: "10px" }}
                />
                Grade
              </h2>
              <h3 className={`u-margin-bottom-tiny bigish-text ${textColor}`}>
                Introduction
              </h3>
              <p className={`u-margin-bottom-small ${secondaryTextColor}`}>
                Grade helps determine whether a glioma tumor is high-grade
                (HGG) or low-grade (LGG). Upload a .nii file, and Medalgo will
                classify the grade, offering insight for further medical
                evaluation.
              </p>

              <h3 className={`u-margin-bottom-tiny bigish-text ${textColor}`}>
                Tutorial
              </h3>
              <ul className={`list u-margin-bottom-medium ${secondaryTextColor}`}>
                <li>
                  Open the{" "}
                  <strong>
                    <BrainCircuit style={{ color: "#3B82F6", margin: "5px" }} />
                    Grade
                  </strong>{" "}
                  section.
                </li>
                <li>Click <strong>Upload</strong> and select a .nii MRI file from your device.</li>
                <li>Once uploaded, the system will analyze the glioma’s grade.</li>
                <li>
                  The result will show whether the glioma is classified as
                  high-grade (HGG) or low-grade (LGG).
                </li>
                <li>
                  Optionally, download the report for further reference or save
                  to patient.
                </li>
              </ul>

              {/* Visualize Section */}
              <h2 className={`bigger-text u-margin-bottom-small ${textColor}`}>
                <View
                  style={{ color: "#3B82F6", marginRight: "10px" }}
                />
                Visualize
              </h2>
              <h3 className={`u-margin-bottom-tiny bigish-text ${textColor}`}>
                Introduction
              </h3>
              <p className={`u-margin-bottom-small ${secondaryTextColor}`}>
                Visualize lets you explore MRI scans stored in .nii format,
                offering a clear and detailed view of the brain images. You can
                interact with the images and gain a better understanding of the
                scan.
              </p>

              <h3 className={`u-margin-bottom-tiny bigish-text ${textColor}`}>
                Tutorial
              </h3>
              <ul className={`list u-margin-bottom-tiny ${secondaryTextColor}`}>
                <li>
                  Go to the{" "}
                  <strong>
                    <View style={{ color: "#3B82F6", margin: "5px" }} />
                    Visualize
                  </strong>{" "}
                  tab.
                </li>
                <li>Click <strong>Upload</strong> to select your .nii file.</li>
                <li>
                  Use the provided tools to explore different layers and views
                  of the MRI scan.
                </li>
                <li>Zoom in, pan, and rotate the image as needed to get a clear view.</li>
              </ul>
            </motion.div>
          </main>
        </>
      )}
    </div>
  );
};

export default HowToPage;

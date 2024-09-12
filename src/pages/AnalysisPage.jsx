import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { Brain, BrainCircuit } from "lucide-react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Lottie from "lottie-react";
import animation from "../assets/animation/loadingbrain.json";
import PieChartCustom from "../components/charts/PieChartCustom";
import BarGraphCustom from "../components/charts/BarGraphCustom";
import { gradesData } from "../data/information";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

const iconStyle = {
  width: "100px",
};

const convertToData = (object) => {
  const labelArr = [];
  const dataArr = []
  for (const x in object) {
    labelArr.push(x);
    dataArr.push(object[x])
  }
  return ({
    labels: ["Glioma", "Meningioma", "No Tumor", "Pituitary"],
    datasets: [{
      label: "",
      data: dataArr,
      backgroundColor: "#0094ff"
    }]
  })
};

const DetectPage = () => {
  const [files, setFiles] = useState([]);
  const [predictedClass, setPredictedClass] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header
        title="Analyze"
        icon={<BrainCircuit style={{ marginRight: "10px" }} />}
      />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
          {/* Detect Part */}
          <p className="u-margin-bottom">
            Upload a brain MRI image in .nii (t1ce sequence works best) to analzye the class of the tumor and visualize the brain image in 3D. Please note that this feature only available for Gliomas due to data constraints.
          </p>
          <div className="grid grid-2 u-margin-bottom-medium">

            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 center-text">
              <h3 className="bigish-text mt-3">Input</h3>

              <div className="px-4 py-5 sm:p-6 ">
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                name="files"
                // acceptedFileTypes={['.nii']}  // Accept .nii files
                server={{
                    process: (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort,
                    transfer,
                    options
                    ) => {
                    // Prepare form data
                    const formData = new FormData();
                    formData.append("file", file, file.name);  // Append .nii file with its name

                    // Create a new XMLHttpRequest
                    const request = new XMLHttpRequest();

                    // Open the POST request to the FastAPI server
                    request.open("POST", "https://medalgo-grade.onrender.com/predict");

                    // Expecting JSON response from the server
                    request.responseType = "json";

                    // Track upload progress
                    request.upload.onprogress = (e) => {
                        console.log(e);
                        progress(e.lengthComputable, e.loaded, e.total);
                    };

                    // Handle the successful response
                    request.onload = function () {
                        if (request.status >= 200 && request.status < 300) {
                        const response = request.response;  // JSON response from FastAPI
                        load(response);  // Pass response to FilePond's load
                        console.log(response);
                        setPredictedClass(response.prediction)
                        setLoading(false);
                        } else {
                        error("Upload failed");
                        setLoading(false);
                        }
                    };

                    // Handle errors
                    request.onerror = function () {
                        error("Upload failed");
                    };

                    // Send the form data with the .nii file
                    request.send(formData);

                    // Set loading state
                    setLoading(true);

                    return {
                        abort: () => {
                        request.abort();
                        abort();
                        },
                    };
                    },
                }}
                labelIdle='Drag & Drop your .nii file or <span class="filepond--label-action">Browse</span>'
                />


              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700">
              <h3 className="bigish-text mt-3 ml-5 mr-5">Predicted Class</h3>

              <div className="px-4 py-5 sm:p-6">
                {loading ?
                  <div style={{ textAlign: "center" }}>
                    <p>Medalgo is processing your image...</p>
                    <Lottie animationData={animation} />
                  </div>
                  :
                  predictedClass == "" ? (
                    <div className="center-text">
                    <Brain style={{ color: "#3B82F6" }} size={100} className="u-margin-bottom-small"/>
                    </div>
                  ) : (
                    <div>
                        
                     <h3 className="bigger-text capitalize-text">
                        {predictedClass === "HGG" ? "High-Grade Glioma" : "Low-Grade Glioma"}
                     </h3>
                     

                    </div>
                  )
                }

              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="grid grid-2 u-margin-bottom-medium">

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 p-5" style={{maxHeight: "400px", overflowY: "scroll", overflowX: "hidden"}}>
            <p className="">Information Panel</p>
              {
                loading ? 
                <Lottie animationData={animation} /> :
                <div className="">
                {
                  predictedClass === "" ?
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                     <Brain
                        style={{ color: "#3B82F6" }}
                        size={100}
                        className="u-margin-bottom-small"/>
                  </div>
                      :
                   <>
                        <h3 className="bigger-text capitalize-text">{gradesData[predictedClass].name} <span className="blue-text">Information</span></h3>
                        <p className="u-margin-bottom-small">Sources: 
                          {
                            gradesData[predictedClass].sources.map((item, index)=>(<a href={item.link} key={index} target="_blank" style={{color: "#61DBFB"}}> | {item.name}</a>))
                          }
                          </p>
                        <h2 className="u-margin-bottom-small medium-text">What is a {gradesData[predictedClass].name}?</h2>
                        {
                          gradesData[predictedClass].description.split("\n\n").map((para, index)=>(
                            <p className="u-margin-bottom-small" key={index}>{para}</p>
                          ))
                        }

                      <h2 className="u-margin-bottom-small mt-10 medium-text">Causes</h2>
                      <p className="u-margin-bottom-small">{gradesData[predictedClass].causes}</p>

                        <h2 className="u-margin-bottom-small mt-10 medium-text">Symptoms</h2>
                        {
                          gradesData[predictedClass].symptoms.map((item, index)=>(
                            <li className="pl-5" key={index}>{item}</li>
                          ))
                        }
                   </>

                }

              </div>
              }
              
            </div>


            
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 p-5">
              <p className="">Visualization</p>

              
            </div>


          </div>


        </motion.div>
      </main>
    </div>
  );
};
export default DetectPage;

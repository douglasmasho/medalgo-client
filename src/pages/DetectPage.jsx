import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { Search, Brain } from "lucide-react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Lottie from "lottie-react";
import animation from "../assets/animation/loadingbrain.json";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const iconStyle = {
  width: "100px",
};

const DetectPage = () => {
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("https://randomuser.me/api/portraits/men/3.jpg");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [classifyRes, setClassifyRes] = useState({
    predicted_class: 'meningioma',
    class_probabilities: {
      glioma: 0.0000046670269426840605,
      meningioma: 98.36751818656921,
      notumor: 1.632477529346943,
      pituitary: 0.000004770727102254568
    }
  });
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header
        title="Detect"
        icon={<Search style={{ marginRight: "10px" }} />}
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
            Upload a brain MRI image to detect the presence of a tumor and more
            information about the tumor if it exists
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
                      const formData = new FormData();
                      formData.append("file", file);

                      const request = new XMLHttpRequest();
                      const request2 = new XMLHttpRequest();

                      request.open(
                        "POST",
                        "https://medalgo-detect.onrender.com/predict"
                      );

                      request2.open(
                        "POST",
                        "https://medalgo-classify.onrender.com/predict"
                      )

                      request.responseType = "blob";


                      request.upload.onprogress = (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                      };

                      request.onload = function () {
                        if (request.status >= 200 && request.status < 300) {
                          // the load method accepts either a string (id) or an object
                          const blob = request.response;
                          const imgUrl = URL.createObjectURL(blob);
                          load(imgUrl);
                          setUrl(imgUrl);
                          setLoading(false)
                        } else {
                          // Can call the error method if something is wrong, should exit after
                          error("oh no");
                        }
                      };

                      request2.onload = async function () {
                        if (request2.status >= 200 && request2.status < 300) {
                          // the load method accepts either a string (id) or an object
                          const respObj = await JSON.parse(request2.response);
                          setClassifyRes(respObj)
                        } else {
                          // Can call the error method if something is wrong, should exit after
                          error("oh no");
                        }
                      };

                      request.send(formData);
                      request2.send(formData);
                      setLoading(true)
                      setLoading2(true)
                      return {
                        abort: () => {
                          request.abort();
                          request2.abort();
                          abort();

                        },
                      };
                    },
                  }}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 center-text">
              <h3 className="bigish-text mt-3">Output</h3>

              <div className="px-4 py-5 sm:p-6">
                {loading ?
                  <div style={{ textAlign: "center" }}>
                    <p>Medalgo is processing your image...</p>
                    <Lottie animationData={animation} />
                  </div>

                  :
                  url == "" ? (
                    <Brain
                      style={{ color: "#3B82F6" }}
                      size={100}
                      className="u-margin-bottom-small"
                    />
                  ) : (
                    <div>
                      <img src={url} className="u-margin-bottom" alt="" style={{ width: "100%", borderRadius: "20px" }} />
                      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <button className='bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
                          Download Image
                        </button>
                        <button className='bg-blue-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto '>
                          Save to Patient
                        </button>
                      </div>

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
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 p-5">
              <p className="">Major class probabilities</p>
              <h3 className="bigger2-text capitalize-text">{classifyRes.predicted_class} <span className="blue-text">{(classifyRes.class_probabilities[classifyRes.predicted_class]).toFixed(2)}%</span></h3>

              <div className="px-4 py-5 sm:p-6 ">

              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 p-5">
              <h3 className="bigish-text mt-3">Output</h3>

              <div className="px-4 py-5 sm:p-6 ">

              </div>
            </div>
          </div>


        </motion.div>
      </main>
    </div>
  );
};
export default DetectPage;

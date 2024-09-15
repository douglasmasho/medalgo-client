import { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { View } from "lucide-react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Lottie from "lottie-react";
import animation from "../assets/animation/loadingbrain.json";
import PieChartCustom from "../components/charts/PieChartCustom";
import BarGraphCustom from "../components/charts/BarGraphCustom";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import NiiVue from "../Niivue";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

const iconStyle = {
  width: "100px",
};


// const volumes = 

const VisualizePage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [volumes, setVolumes] = useState([
    {url: './hgg.nii'},
  ])

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header
        title="Visualize"
        icon={<View style={{ marginRight: "10px" }} />}
      />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
         <NiiVue volumes={volumes}/>
        </motion.div>
      </main>


    </div>
  );
};
export default VisualizePage;

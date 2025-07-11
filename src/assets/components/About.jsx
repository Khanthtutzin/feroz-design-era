import { motion } from "framer-motion";
import { Dot, School } from "lucide-react";
// Removed Progress from flowbite-react as we're creating a custom one
import ps from '../images/photoshopapp.png'
import ai from '../images/aiapp.png'

// Custom Liquid Progress Bar Component
const LiquidProgressBar = ({ progress, label }) => {
    return (
        <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            {/* Liquid fill */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                style={{ width: `${progress}%` }}
            >
                {/* Percentage text inside the liquid */}
                <span className="text-white font-bold text-sm drop-shadow-sm">
                    {progress}%
                </span>
            </div>
            {/* Label text outside the liquid, centered */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-medium text-sm">
                {label}
            </div>
        </div>
    );
};

export default function About() {
    return (

        <>

            <section className="justify-between mx-auto py-5">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-extrabold text-center text-gray-900 mb-12"
                    id="about"
                >
                    About Me
                </motion.h2>
                <div className="mx-auto px-4 sm:px-6 lg:px-8"> {/* Added padding for better responsiveness */}
                    <div className="grid md:grid-cols-2 gap-x-20 gap-y-10 items-start"> {/* Adjusted gap for better spacing */}
                        {/* Education Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid gap-y-5"
                        >
                            <h1 className="flex font-bold text-3xl text-gray-900">Education </h1>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl text-gray-800">Donato</h3>
                                <ul className="opacity-70 text-gray-700">
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> GDMC</li>
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> MAP</li>
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> MAI</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="flex font-bold text-xl text-gray-800">Design Story</h3>
                                <ul className="opacity-70 text-gray-700">
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> LDMC</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="flex font-bold text-xl text-gray-800">W.S.E.C High School</h3>
                                <ul className="opacity-70 text-gray-700">
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> G1 to G10</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Experiences Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="grid gap-y-5"
                        >
                            <h3 className="font-bold text-3xl text-gray-900">Experiences</h3>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl text-gray-800">New Light Cargo</h3>
                                <ul className="opacity-70 text-gray-700">
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> 2023 - Present (WFH)</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl text-gray-800">Golden Future Education Center</h3>
                                <ul className="opacity-70 text-gray-700">
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> 2024 - Present (WFH)</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl text-gray-800">Freelance</h3>
                                <ul className="opacity-70 text-gray-700">
                                    <li className="flex items-center"> <Dot className="mr-1 text-blue-500" /> 2023 - Present</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Achievements Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="grid gap-y-5 mt-10 md:mt-0" // Added top margin for better separation on smaller screens
                        >
                            <h3 className="font-bold text-3xl text-gray-900">Achievements</h3>
                            <div className="bg-white p-4 rounded-lg shadow-md grid gap-y-4">
                                <h5 className="font-bold text-xl text-gray-800">Top 3 Nominated in MAI</h5>
                                <span className="opacity-75 pl-2 flex items-center text-gray-700"><Dot className="mr-1 text-blue-500" /> Mastering Adobe Illustrator</span>
                                <h5 className="font-bold text-xl text-gray-800">Top 10 Nominated in MAP</h5>
                                <span className="opacity-75 pl-2 flex items-center text-gray-700"><Dot className="mr-1 text-blue-500" /> Mastering Adobe Photoshop</span>
                            </div>
                        </motion.div>

                        {/* Software Skills Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid gap-y-5 mt-10 md:mt-0" // Added top margin for better separation on smaller screens
                        >
                            <h3 className="font-bold text-3xl text-gray-900">Software Skills</h3>
                            <div className="bg-white p-4 rounded-lg shadow-md grid gap-y-4"> {/* Added grid gap for spacing */}
                                <div className="flex items-center">
                                    <img src={ps} className="w-11 h-11 rounded-xl mr-3" />
                                    <div className="flex-1"> {/* Use flex-1 to make the progress bar take remaining space */}
                                        <LiquidProgressBar progress={97} />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <img src={ai} className="w-11 h-11 rounded-xl mr-3" alt="Adobe Illustrator" />
                                    <div className="flex-1">
                                        <LiquidProgressBar progress={90} /> {/* Added a percentage for Illustrator */}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                </div>

            </section>

        </>

    );
}

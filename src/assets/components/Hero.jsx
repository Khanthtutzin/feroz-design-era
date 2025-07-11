import { motion } from "framer-motion";
import pfp from '../images/pfp.webp'
import { Link } from "react-scroll";

export default function Hero() {
    return (
        <section id="home" className="min-h-screen bg-white px-8 md:px-20 py-24 flex flex-col md:flex-row items-center justify-between">
            {/* Text Left */}
            <motion.div
                className="md:w-1/2 space-y-6 max-w-xl"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-7xl font-bold flex items-center gap-2">
                    Design Something Beautiful.
                </h2>
                <div className="bg-white p-7 rounded-lg shadow-md grid gap-y-4">
                    <p className="text-lg leading-relaxed">
                        I'm <strong>Phyo Thura Maung</strong> a professional designer who helps brands communicate with clarity and purpose.
                        By combining creative thinking with a patient, collaborative process, I craft high-quality visuals that connect with audiences and drive results.
                    </p>
                </div>
                <button className="px-6 py-2 border border-black hover:bg-black hover:text-white hover:rounded-3xl transition duration-300">
                    <Link to="projects">View My Works</Link>
                </button>
            </motion.div>

            {/* Image Right */}
            <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                <img
                    src={pfp}
                    alt="Feroz About"
                    className="rounded-[32px] w-full max-w-sm object-cover shadow-lg"
                />
            </motion.div>
        </section>
    );
}

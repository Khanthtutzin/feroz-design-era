import { motion } from "framer-motion";
import cetificate from '../images/cetificate.jpg'


export default function Contact() {
    return (
        <>
            <h1 className="text-6xl text-center font-bold py-10" id="contact">Contact Me</h1>
            <section id="about" className="bg-white px-8 md:px-20 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Text & Contact */}
                <motion.div
                    className="md:w-1/2 space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="">
                        <div className="text-2xl space-y-4">
                            <p>📞 09 756 063 900</p>
                            <p>📨 ferozgraphicdesigner@gmail.com</p>
                            <p>📍 Mandalay, Myanmar</p>
                            <p>💬 @ferozdesignera</p>
                            <p>📘 Feroz Design Era</p>
                            <p>🎵 TikTok: Feroz Design Era</p>
                        </div>
                    </div>
                </motion.div>

                {/* Photo */}
                <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <img
                        src={cetificate}
                        alt="Feroz Portrait"
                        className="rounded-3xl shadow-md max-w-sm"
                    />
                </motion.div>
            </section>
        </>
    );
}

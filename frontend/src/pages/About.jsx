import { motion } from "framer-motion";
import {
  FaRocket,
  FaHandshake,
  FaLightbulb,
  FaBullseye,
  FaStar,
  FaBook
} from "react-icons/fa";
import PublicFooter from "../components/layouts/PublicFooter";

export default function About() {
  const features = [
    {
      icon: <FaRocket size={40} />,
      title: "Mission",
      description:
        "Empower young innovators to solve real-world problems and build practical solutions that can impact industries and communities across India.",
    },
    {
      icon: <FaHandshake size={40} />,
      title: "Collaboration",
      description:
        "Connect institutions, SPOCs, team leaders, and administrators in one digital ecosystem for seamless communication and coordination.",
    },
    {
      icon: <FaLightbulb size={40} />,
      title: "Innovation",
      description:
        "Encourage students to innovate, create, and present groundbreaking ideas addressing the nation's most pressing challenges.",
    },
    {
      icon: <FaBullseye size={40} />,
      title: "Impact",
      description:
        "Transform innovative ideas into implementable solutions that can make a real difference in society and drive technological advancement.",
    },
    {
      icon: <FaStar size={40} />,
      title: "Excellence",
      description:
        "Foster a culture of excellence, creativity, and problem-solving among India's brightest young minds through competitive innovation.",
    },
    {
      icon: <FaBook size={40} />,
      title: "Learning",
      description:
        "Provide a platform for students to learn, grow, and develop practical skills while working on meaningful real-world projects.",
    },
  ];


  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
              About <span className="text-blue-700">Smart India Hackathon</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
              The <strong>Smart India Hackathon (SIH)</strong> is a nationwide initiative by the Government
              of India to promote innovation and problem-solving among students. This portal serves as a
              comprehensive platform for participants, SPOCs, and administrators to collaborate efficiently
              — from problem statement discovery to final submissions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-600 hover:shadow-2xl transition-all"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4">Why Participate?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h4 className="font-bold mb-1">Real-World Impact</h4>
                  <p className="text-blue-100">Work on challenges that matter and create solutions with tangible benefits</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <h4 className="font-bold mb-1">Skill Development</h4>
                  <p className="text-blue-100">Enhance your technical and teamwork skills through hands-on experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏅</span>
                <div>
                  <h4 className="font-bold mb-1">Recognition</h4>
                  <p className="text-blue-100">Gain national recognition and opportunities for your innovative work</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <h4 className="font-bold mb-1">Career Opportunities</h4>
                  <p className="text-blue-100">Connect with industry leaders and explore exciting career paths</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <PublicFooter />
    </>
  );
}

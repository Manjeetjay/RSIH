// Landing.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUniversity,
  FaLightbulb,
  FaBullseye,
  FaBroadcastTower,
  FaRocket,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PublicFooter from "../components/layouts/PublicFooter";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img4 from "../assets/img4.jpg";

export default function Landing() {
  const features = [
    {
      title: "For Administrators",
      description:
        "Manage the entire hackathon lifecycle, from problem statements to final evaluations.",
      icon: FaShieldAlt,
    },
    {
      title: "For SPOCs",
      description:
        "Register your institution, manage teams, and track their progress seamlessly.",
      icon: FaUniversity,
    },
    {
      title: "For Team Leaders",
      description:
        "Browse problems, submit innovative ideas, and showcase your solutions.",
      icon: FaLightbulb,
    },
  ];

  const themes = [
    "Smart Cities",
    "Agriculture & Rural Development",
    "Health & Bio-medical",
    "Robotics & Automation",
    "Education & Learning",
    "Cybersecurity",
    "Sustainability & Environment",
    "IoT, AI & Emerging Tech",
  ];

  const whyParticipate = [
    {
      title: "Innovative & Cost-Effective Solutions",
      description:
        "Get fresh perspectives and creative ideas from young innovators for real-world challenges.",
      icon: FaLightbulb,
    },
    {
      title: "Talent Discovery",
      description:
        "Engage with some of the brightest minds and future leaders from IIMT University and partnering institutes.",
      icon: FaBullseye,
    },
    {
      title: "Brand Visibility",
      description:
        "Showcase your organization to a large academic and innovation-driven audience.",
      icon: FaBroadcastTower,
    },
    {
      title: "Be Part of an Innovation Movement",
      description:
        "Contribute to strengthening India's innovation ecosystem and empowering youth.",
      icon: FaRocket,
    },
  ];

  const bannerImages = [img1, img2, img4];

  return (
    <div className="flex flex-col min-h-screen">

      <section className="relative  w-full overflow-hidden">
        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3500 }}
          loop
          className="absolute inset-0 z-0"
        >

          {bannerImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                className="w-full"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>


        {/* <div className="absolute inset-0 bg-black/30 z-10" /> */}

        {/* Hero Content */}
        {/* <div className="absolute z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-xl"
          >
            IIMT University
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400">
              Regional Hackathon 2025
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-2xl text-gray-200 font-semibold max-w-3xl mb-4"
          >
            Empowering Innovation. Inspiring Young Minds. Building Tomorrow.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-300 max-w-2xl mb-10 text-lg"
          >
            A flagship innovation event designed to bring together talented
            students to solve real-world challenges through collaboration,
            creativity, and cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/spoc-registration">
              <Button variant="primary" size="lg">
                Register as SPOC
              </Button>
            </Link>
            <Link to="/problems">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-200 hover:bg-white hover:text-black"
              >
                View Problem Statements
              </Button>
            </Link>
          </motion.div>
        </div> */}
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-8">
            What is IIMT Regional Hackathon?
          </h2>

          <div className="text-slate-700 text-lg space-y-6 max-w-4xl mx-auto">
            <p>
              The <strong>IIMT University Regional Hackathon</strong> is a
              flagship innovation event designed to bring together talented
              students from engineering, technology, and multiple domains.
            </p>
            <p>
              The hackathon serves as a platform where students collaborate,
              brainstorm, and build impactful solutions addressing critical
              issues in society, industry, and emerging technologies.
            </p>
            <p>
              Through collaboration with experts, government bodies, and
              academic mentors, participants gain industry exposure, hands-on
              experience, and innovative thinking.
            </p>
          </div>
        </div>
      </section>


      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Themes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
            {themes.map((theme, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-xl"
              >
                <p className="text-center font-medium text-slate-800">{theme}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why use this portal?
          </h2>
          <p className="text-center text-slate-600 mb-10">
            Streamlined processes for every stakeholder in the hackathon
            ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                hover
                key={index}
                className="p-6 border-t-4 border-blue-600"
              >
                <feature.icon className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">
            Why Organizations Should Participate?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyParticipate.map((item, index) => (
              <Card hover key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <item.icon className="text-blue-600 text-4xl" />
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-slate-600 mt-2">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

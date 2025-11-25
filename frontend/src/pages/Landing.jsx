import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function Landing() {
  const features = [
    {
      title: "For Administrators",
      description: "Manage the entire hackathon lifecycle, from problem statements to final evaluations.",
      icon: "🛡️",
    },
    {
      title: "For SPOCs",
      description: "Register your institution, manage teams, and track their progress seamlessly.",
      icon: "🏫",
    },
    {
      title: "For Team Leaders",
      description: "Browse problems, submit innovative ideas, and showcase your solutions.",
      icon: "💡",
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
    "IoT, AI & Emerging Tech"
  ];

  const whyParticipate = [
    {
      title: "Innovative & Cost-Effective Solutions",
      description: "Get fresh perspectives and creative ideas from young innovators for real-world challenges.",
      icon: "💡"
    },
    {
      title: "Talent Discovery",
      description: "Engage with some of the brightest minds and future leaders from IIMT University and partnering institutes.",
      icon: "🎯"
    },
    {
      title: "Brand Visibility",
      description: "Showcase your organization to a large academic and innovation-driven audience.",
      icon: "📢"
    },
    {
      title: "Be Part of a Large Innovation Movement",
      description: "Contribute to strengthening India's innovation ecosystem and empowering youth.",
      icon: "🚀"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/90 z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              IIMT University <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
                Regional Hackathon 2025
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-slate-300 text-2xl mb-4 leading-relaxed font-semibold">
              Empowering Innovation. Inspiring Young Minds. Building Tomorrow.
            </p>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed">
              A flagship innovation event designed to bring together talented students to solve real-world challenges through collaboration, creativity, and cutting-edge technology.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/spoc-registration">
                <Button variant="primary" size="lg" className="shadow-lg shadow-blue-500/25">
                  Register as SPOC
                </Button>
              </Link>
              <Link to="/problems">
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500">
                  View Problem Statements
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is IIMT Hackathon Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">What is IIMT Regional Hackathon?</h2>
            <div className="max-w-4xl mx-auto text-slate-700 text-lg leading-relaxed space-y-4">
              <p>
                The <strong>IIMT University Regional Hackathon</strong> is a flagship innovation event designed to bring together talented students from engineering, technology, and various academic disciplines to solve real-world challenges.
              </p>
              <p>
                The hackathon serves as a platform where students collaborate, brainstorm, and build impactful solutions addressing critical issues in society, industry, and emerging technologies. By encouraging practical application of knowledge, the event bridges the gap between classroom learning and real-world problem solving.
              </p>
              <p>
                Through collaboration with industry experts, government agencies, and academic mentors, participants get hands-on exposure to real challenges and innovative thinking.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Themes</h2>
            <p className="text-2xl text-slate-600 font-semibold mb-2">No challenge is too big.</p>
            <p className="text-2xl text-slate-600 font-semibold mb-8">No idea is too small.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {themes.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
              >
                <p className="text-slate-800 font-medium text-center">{theme}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use this portal?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Streamlined processes for every stakeholder in the hackathon ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full border-t-4 border-t-blue-600">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Organizations Should Participate */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Organizations Should Participate?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyParticipate.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Hackathon Impact</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { label: "Participating Students", value: "5000+" },
              { label: "Participating Colleges", value: "100+" },
              { label: "Problem Statements", value: "150+" },
              { label: "Mentors & Experts", value: "50+" },
              { label: "Startups Formed", value: "Multiple" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Process Flow & Timeline</h2>
            <p className="text-slate-600 text-lg">A smooth and structured hackathon journey</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              "Problem Statement Release",
              "Team Registration",
              "Idea Submission & Shortlisting",
              "24/36-Hour Hackathon at IIMT University",
              "Prototype Development & Mentoring Sessions",
              "Judging & Final Presentation",
              "Prize Distribution & Recognition"
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-grow bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                  <p className="text-slate-800 font-semibold">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

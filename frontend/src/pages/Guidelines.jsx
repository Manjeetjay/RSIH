import { motion } from "framer-motion";

export default function Guidelines() {
  const steps = [
    {
      number: "01",
      title: "SPOC Registration",
      description: "Each institution nominates one SPOC (Single Point of Contact) who registers through this portal. The SPOC must provide institutional details and await admin verification before proceeding.",
      icon: "📝",
      color: "blue"
    },
    {
      number: "02",
      title: "Admin Verification",
      description: "Portal administrators review and verify SPOC registrations to ensure authenticity. This typically takes 24-48 hours. SPOCs receive email notifications upon approval.",
      icon: "✅",
      color: "green"
    },
    {
      number: "03",
      title: "Team Formation",
      description: "Verified SPOCs can register multiple teams from their institution. Each team must have a designated Team Leader who will receive login credentials to access the portal.",
      icon: "👥",
      color: "purple"
    },
    {
      number: "04",
      title: "Problem Statement Selection",
      description: "Team Leaders browse available problem statements, review requirements, and select challenges that align with their team's expertise and interests.",
      icon: "🎯",
      color: "sky"
    },
    {
      number: "05",
      title: "Idea Submission",
      description: "Teams develop their solutions and submit detailed proposals including title, abstract, approach, and expected impact. Ensure all submissions meet the deadline requirements.",
      icon: "💡",
      color: "indigo"
    },
    {
      number: "06",
      title: "Evaluation & Selection",
      description: "Administrators and expert panels review all submissions based on innovation, feasibility, impact, and technical merit. Shortlisted teams are notified for the next round.",
      icon: "🏆",
      color: "rose"
    }
  ];

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    sky: "from-sky-500 to-sky-600",
    indigo: "from-indigo-500 to-indigo-600",
    rose: "from-rose-500 to-rose-600"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Participation <span className="text-blue-700">Guidelines</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-500 mx-auto mb-6"></div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Follow these steps to successfully participate in the Smart India Hackathon
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-sky-200 to-sky-300"></div>

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`relative flex items-center ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-8`}
              >
                {/* Content Card */}
                <div className="md:w-5/12 w-full">
                  <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-blue-600 hover:shadow-2xl transition-all">
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[step.color]} flex items-center justify-center text-2xl shadow-lg`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-400 mb-1">STEP {step.number}</div>
                        <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-white shadow-lg z-10"></div>

                {/* Spacer */}
                <div className="md:w-5/12 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4">📌 Important Notes</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-sky-300 text-xl">•</span>
              <span>Ensure all information provided during registration is accurate and verifiable</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-300 text-xl">•</span>
              <span>Teams can only submit one idea per problem statement</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-300 text-xl">•</span>
              <span>Keep track of submission deadlines - late submissions will not be accepted</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-300 text-xl">•</span>
              <span>SPOCs are responsible for coordinating with their institution's teams</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

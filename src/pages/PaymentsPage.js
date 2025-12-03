import { Phone, Wifi, CreditCard, Gift, Send, FileText } from "lucide-react";

const PaymentCard = ({ title, description, icon: Icon, color }) => (
  <div
    className={`p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl bg-gray-100 border border-gray-100`}
  >
    <div
      className={`p-3 rounded-xl mb-4 inline-block`}
      style={{ backgroundColor: color + "1A" }}
    >
      <Icon size={24} className={color} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const PaymentsPage = () => {
  const quickActions = [
    {
      title: "Buy Airtime",
      description:
        "Stay connected with family and friends with instant top-ups.",
      icon: Phone,
      color: "text-blue-500",
    },
    {
      title: "Buy Data",
      description:
        "Enjoy uninterrupted internet access with easy and convinient mobile data top-ups.",
      icon: Wifi,
      color: "text-green-500",
    },
    {
      title: "Pay Bills",
      description:
        "Pay for your internet, cable subscription and other utility bills in one place.",
      icon: CreditCard,
      color: "text-green-500",
    },
    {
      title: "Gift Cards",
      description: "Buy gift cards for yourself or your loved ones.",
      icon: Gift,
      color: "text-yellow-600",
    },
  ];

  const sendAndReceive = [
    {
      title: "Send Money",
      description: "Instantly send money to contacts or bank accounts.",
      icon: Send,
      color: "text-indigo-500",
    },
    {
      title: "Invoices",
      description: "Create and send an invoice to get paid for work done.",
      icon: FileText,
      color: "text-red-500",
    },
  ];
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Payment Menu</h2>

      <section className="mb-10">
        {/* Section 1 Bills, airtime and gift cards  */}
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((option, index) => (
            <PaymentCard
              key={index}
              title={option.title}
              description={option.description}
              icon={option.icon}
              color={option.color}
            />
          ))}
        </div>
      </section>

      {/* Section 2 Send & recieve  */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Send and Recieve
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sendAndReceive.map((option, index) => (
            <PaymentCard
              key={index}
              title={option.title}
              description={option.description}
              icon={option.icon}
              color={option.color}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PaymentsPage;

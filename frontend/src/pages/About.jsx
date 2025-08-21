import { FaEye, FaHeart, FaUsers } from "react-icons/fa";

const aboutCards = [
  {
    title: "Our Mission",
    desc: "To connect readers across Bangladesh with books in Bangla and English, and to celebrate the rich literary heritage of our nation. We aim to make reading accessible and enjoyable for everyone, from Dhaka to Chittagong and beyond.",
    icon: <FaEye className="text-4xl text-primary mb-2" />,
  },
  {
    title: "Our Team",
    desc: "A passionate group of Bangladeshi readers, developers, and designers from all over the country, dedicated to making BookBazar the best place to discover, buy, and discuss books in Bangladesh.",
    icon: <FaUsers className="text-4xl text-primary mb-2" />,
  },
  {
    title: "Our Values",
    desc: "Diversity, inclusivity, and a love for Bangla literature. We celebrate the works of Rabindranath Tagore, Kazi Nazrul Islam, Humayun Ahmed, and many more, while welcoming new voices from every corner of Bangladesh.",
    icon: <FaHeart className="text-4xl text-primary mb-2" />,
  },
];

const About = () => {
  return (
    <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">About BookBazar</h1>
        <p className="mb-8">
          Welcome to BookBazar! We are your trusted platform for discovering, sharing, and discussing books in Bangla and English.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card, idx) => (
            <div key={idx} className="bg-white text-black p-6 rounded-lg shadow-xl">
              {card.icon}
              <h2 className="text-xl font-bold mt-4">{card.title}</h2>
              <p className="mt-2">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
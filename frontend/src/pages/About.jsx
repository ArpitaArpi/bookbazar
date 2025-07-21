import { FaEye, FaHeart, FaUsers } from "react-icons/fa";

const aboutCards = [

  //will fetch the real data later...
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
    <section className="min-h-screen bg-white pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800">About BookBazar</h1>
        <p className="text-lg text-gray-600 text-center mb-16">
          Welcome to BookBazar! We are your trusted platform for discovering, sharing, and discussing books in Bangla and English. From classic Bangladeshi literature to the latest bestsellers, we bring together readers from all walks of life. Join us in celebrating the stories, culture, and creativity of Bangladesh.
        </p>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {aboutCards.map((card, idx) => (
            <div key={idx} className="bg-white w-72 min-h-[320px] rounded-2xl shadow-lg border border-base-200 p-8 flex flex-col items-center text-center mx-auto">
              {card.icon}
              <h2 className="text-xl font-bold mb-2 text-gray-800">{card.title}</h2>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 
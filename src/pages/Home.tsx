import BlogCard from "../components/BlogCard";

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    title: "Quantum Computers: The Processing Power of the Future",
    description:
      "Quantum computers are innovative technology pushing the boundaries of traditional computing and holding the potential to revolutionize...",
    category: "SCIENCE",
    author: "admin",
    date: "April 8, 2024",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    title: "AI in Healthcare: Transforming Patient Outcomes",
    description:
      "Artificial Intelligence is changing the face of healthcare, from diagnosis to treatment planning. Let's dive into its benefits and challenges...",
    category: "TECH",
    author: "admin",
    date: "April 4, 2024",
  },
  {
    id:3,
    image:"https://images.unsplash.com/photo-1523681504355-8b4860f99a58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbnNjaW91c25lc3N8ZW58MHx8MHx8fDA%3D",
    title:"The Human Brain: Unlocking the Secrets of Consciousness",
    description:"Peer into the intricate machinery of the human brain, the most complex organ in the known universe. From deciphering the neural basis of consciousness to unraveling the mysteries ...",
    category:"Nuclear Power",
    author:"admin",
    date:"April 4, 2024"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    title: "The Rise of Electric Vehicles: A Greener Future",
    description:
      "Electric vehicles are gaining popularity as a sustainable alternative to traditional gas-powered cars. Here's how they’re reshaping transportation...",
    category: "ENVIRONMENT",
    author: "editor",
    date: "March 29, 2024",
  },
  {
    id: 5,
    image: "https://plus.unsplash.com/premium_photo-1733342562190-1960519ca29f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "5G Technology: What It Means for You",
    description:
      "5G is more than just faster internet — it’s a game-changer for industries like healthcare, manufacturing, and autonomous driving...",
    category: "TECH",
    author: "guest",
    date: "March 15, 2024",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1621887348744-6b0444f8a058?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lbnRhbCUyMGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Mental Health in the Digital Age",
    description:
      "As technology advances, so does the conversation around mental health. Learn how apps, AI, and digital detoxing are impacting well-being...",
    category: "HEALTH",
    author: "admin",
    date: "March 10, 2024",
  },
];

const Home = () => {
  return (
    <div className="py-10 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-gray-50">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          image={post.image}
          title={post.title}
          description={post.description}
          category={post.category}
          author={post.author}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default Home;

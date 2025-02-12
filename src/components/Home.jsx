import Hero from "./ui/Hero";
import News from "./ui/News";
import Trending from "./ui/Trending";

const Home = ({ search }) => {
  return (
    <div>
      <Hero />
      <News search={search} />
      <Trending  search={search}/>
    </div>
  );
};

export default Home;

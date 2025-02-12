import { useEffect } from "react";
import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import Loading from "./ui/Loading";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
const Tech = ({ search }) => {
  const [techNews, setTechNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const newsPerPage = 9;

  useEffect(() => {
    const API_URL = `/src/api/tech.json`;
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTechNews(data.articles);
      } catch (error) {
        console.log(`Error in fetching data : ${error}`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    fetchNews();
    auth.onAuthStateChanged((currentUser) => setUser(currentUser));
  }, []);
  if (loading) {
    return (
      <div>
        <Loading loadingText={"Tech News"} />
      </div>
    );
  }

  // pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  console.log(indexOfLastNews);
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  console.log(indexOfFirstNews);
  const currentNews = techNews.slice(indexOfFirstNews, indexOfLastNews);
  console.log(currentNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filteredTechNews = currentNews.filter((techItem) =>
    techItem.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="max-w-6xl mx-auto py-8 px-6 text-slate-700 space-y-6 ">
      <h1 className="text-3xl text-center font-bold ">Tech News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-Karla gap-8 ">
        {filteredTechNews.length > 0 ? (
          filteredTechNews.map((techNews, index) => {
            const date = new Date(techNews.publishedAt);
            const formatedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formatedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });
            const handleReadMore = () => {
              if (!user) {
                navigate("/signup");
              } else {
                window.open(techNews.url, "_blank");
              }
            };
            return (
              <div
                key={index}
                className="p-5 shadow-md space-y-6 hover:bg-rose-200 transition-all duration-500"
              >
                <div className="space-y-2 ">
                  <h1 className="sm:text-xl text-[16px] font-black">
                    {techNews.title}
                  </h1>
                  <p className="text-[12px] bg-slate-600 inline-block text-white py-1 px-4">
                    Author : {techNews.author}
                  </p>
                </div>
                <img
                  src={techNews.urlToImage}
                  alt="Latest-News-Image"
                  className="w-full h-40 xxs:h-60 object-cover rounded-md hover:scale-105 hover:rotate-3 transition-all duration-300"
                />
                <p className="text-sm">{techNews.description}</p>
                <div className="flex justify-between text-[12px] ">
                  <p className="flex items-center gap-4">
                    {" "}
                    <MdDateRange className="w-5 h-5 " /> {formatedDate}
                  </p>
                  <p className="flex items-center gap-4">
                    <IoMdTime className="w-5 h-5 " />
                    {formatedTime}
                  </p>
                </div>

                <button
                  onClick={handleReadMore}
                  className="cursor-pointer py-2 px-4 rounded-md bg-red-700 text-white text-sm"
                >
                  Read More
                </button>
              </div>
            );
          })
        ) : (
          <p>No News Found</p>
        )}
      </div>

      <div className=" flex items-center justify-center gap-5 ">
        {Array.from(
          { length: Math.ceil(techNews.length / newsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`h-10 w-10 flex justify-center items-center  
              cursor-pointer ${
                currentPage === index + 1
                  ? "bg-slate-700 text-white"
                  : "border border-slate-700"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default Tech;

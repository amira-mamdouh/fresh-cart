import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function CategoriesSlider() {
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000, // Moves every 3 seconds
    responsive: [
      {
        breakpoint: 1024, // When the screen width is less than 1024px
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600, // When the screen width is less than 600px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480, // When the screen width is less than 480px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Function to fetch all categories from API
  async function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  // Using useQuery to fetch data
  const { data, isLoading, isError } = useQuery(
    "getAllCategories",
    getAllCategories
  );

  // Display Loading component while fetching data
  if (isLoading) {
    return <Loading />;
  }

  // Display error message if an error occurs
  if (isError) {
    return <div>An error occurred. Please try again later.</div>;
  }

  return (
    <div className="row categoriesSlider my-5">
      <Slider {...settings}>
        {data.data.data.map((category, index) => (
          <div key={index} className="text-center">
            <img
              style={{ height: "150px", objectFit: "cover" }}
              className="w-100"
              src={category.image}
              alt={category.slug}
            />
            <h4 className="py-2 h6">{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}

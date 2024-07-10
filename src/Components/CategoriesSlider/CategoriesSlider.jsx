import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };

  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data, isLoading } = useQuery("getAllCategories", getAllCategories);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="row">
      <Slider {...settings}>
        {data.data.data.map((category, index) => (
          <div key={index}>
            <img
              style={{ height: "200px" }}
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

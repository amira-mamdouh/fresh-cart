import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data, isLoading } = useQuery("getAllCategories", getAllCategories);

  if (isLoading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center opacity-100 bg-main-light ">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="row">
      <Slider {...settings}>
        {data.data.data.map((category, index) => (
          <div key={index}>
            <img className="w-100" src={category.image} alt={category.slug} />
            <h4 className="py-2">{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}

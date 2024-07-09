import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";

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

  const { data } = useQuery("getAllCategories", getAllCategories);

  return (
    <div className="row">
      <div className="col-md-9">
        <Slider {...settings}>
          {data.data.data.map((category, index) => {})}
        </Slider>
      </div>
    </div>
  );
}

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <img src={require("../../assets/images/slider-image-1.jpeg")} alt="" />
      </div>
      <div>
        <img src={require("../../assets/images/slider-image-2.jpeg")} alt="" />
      </div>
      <div>
        <img src={require("../../assets/images/slider-image-3.jpeg")} alt="" />
      </div>
      <div>
        <img src={require("../../assets/images/slider-2.jpeg")} alt="" />
      </div>
      <div>
        <img src={require("../../assets/images/grocery-banner.png")} alt="" />
      </div>
      <div>
        <img
          src={require("../../assets/images/grocery-banner-2.jpeg")}
          alt=""
        />
      </div>
    </Slider>
  );
}

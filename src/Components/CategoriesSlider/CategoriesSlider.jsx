import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="row">
      <div className="col-md-9">
        <Slider {...settings}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Slider>
      </div>
    </div>
  );
}

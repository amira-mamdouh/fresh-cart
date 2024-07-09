import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images directly
import sliderImage1 from "../../assets/images/slider-image-1.jpeg";
import sliderImage2 from "../../assets/images/slider-image-2.jpeg";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";
import sliderImage4 from "../../assets/images/slider-2.jpeg";
import groceryBanner1 from "../../assets/images/grocery-banner.png";
import groceryBanner2 from "../../assets/images/grocery-banner-2.jpeg";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="row homeSlider my-5">
      <div className="col-12 col-md-9">
        <Slider {...settings}>
          <div>
            <img
              style={{ height: "350px" }}
              className="w-100"
              src={sliderImage1}
              alt="Slider Img"
            />
          </div>
          <div>
            <img
              style={{ height: "350px" }}
              className="w-100"
              src={sliderImage2}
              alt="Slider Img"
            />
          </div>
          <div>
            <img
              style={{ height: "350px" }}
              className="w-100"
              src={sliderImage3}
              alt="Slider Img"
            />
          </div>
          <div>
            <img
              style={{ height: "350px" }}
              className="w-100"
              src={sliderImage4}
              alt="Slider Img"
            />
          </div>
        </Slider>
      </div>
      <div className="col-0 col-md-3">
        <div>
          <img
            style={{ height: "175px" }}
            className="w-100"
            src={groceryBanner1}
            alt="Slider Img"
          />
        </div>
        <div>
          <img
            style={{ height: "175px" }}
            className="w-100"
            src={groceryBanner2}
            alt="Slider Img"
          />
        </div>
      </div>
    </div>
  );
}

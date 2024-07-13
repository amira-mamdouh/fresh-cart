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

// Component for individual slider items
function ImageSliderItem({ src, alt, height = "350px" }) {
  return (
    <div>
      <img style={{ height }} className="w-100" src={src} alt={alt} />
    </div>
  );
}

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="row homeSlider my-5">
      <div className="col-12 col-md-9">
        <Slider {...settings}>
          <ImageSliderItem src={sliderImage1} alt="Slider Img 1" />
          <ImageSliderItem src={sliderImage2} alt="Slider Img 2" />
          <ImageSliderItem src={sliderImage3} alt="Slider Img 3" />
          <ImageSliderItem src={sliderImage4} alt="Slider Img 4" />
        </Slider>
      </div>
      <div className="col-12 col-md-3 small-disabled">
        <div className="mb-2">
          <img
            style={{ height: "calc(50vw)", maxHeight: "175px" }}
            className="w-100"
            src={groceryBanner1}
            alt="Grocery Banner 1"
          />
        </div>
        <div>
          <img
            style={{ height: "calc(50vw)", maxHeight: "175px" }}
            className="w-100"
            src={groceryBanner2}
            alt="Grocery Banner 2"
          />
        </div>
      </div>
    </div>
  );
}

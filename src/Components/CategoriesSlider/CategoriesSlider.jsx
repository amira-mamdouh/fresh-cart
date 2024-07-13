import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function CategoriesSlider() {
  // إعدادات الـSlider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024, // عند عرض الشاشة أقل من 1024 بكسل
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600, // عند عرض الشاشة أقل من 600 بكسل
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480, // عند عرض الشاشة أقل من 480 بكسل
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // دالة لجلب جميع الفئات من API
  async function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  // استخدام useQuery لجلب البيانات
  const { data, isLoading, isError } = useQuery(
    "getAllCategories",
    getAllCategories
  );

  // عرض مكون Loading في حالة جلب البيانات
  if (isLoading) {
    return <Loading />;
  }

  // عرض رسالة خطأ في حالة حدوث خطأ
  if (isError) {
    return <div>حدث خطأ ما. يرجى المحاولة لاحقاً.</div>;
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

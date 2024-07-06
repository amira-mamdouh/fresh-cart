import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Categories() {
  async function getAllCategories() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
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
    <>
      <div className="container-fluid py-5">
        <div className="row g-5">
          {data.data.data.map((category, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="category">
                <div className="text-center mb-2">
                  <h3 className="py-2">{category.name}</h3>
                </div>
                <img
                  className="w-100"
                  src={category.image}
                  alt={category.slug}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

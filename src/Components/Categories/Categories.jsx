import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Categories() {
  async function getAllCategories() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data, isLoading } = useQuery("getAllCategories", getAllCategories);

  if (isLoading) {
    return <Loading />;
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

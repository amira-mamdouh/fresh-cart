import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Categories() {
  const [allCategories, setAllCategories] = useState(null);

  async function getAllCategories() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setAllCategories(data.data);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {allCategories ? (
        <div className="container-fluid py-5">
          <div className="row g-5">
            {allCategories.map((category, index) => (
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
      ) : (
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
      )}
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Categories() {
  const [allCategories, setAllCategories] = useState(null);

  async function getAllCategories() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setAllCategories(data);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
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

      <div className="container-fluid">
        <div className="row">{}</div>
      </div>
    </>
  );
}

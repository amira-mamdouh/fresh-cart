import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Brands() {
  // Function to fetch all Brands from the API.
  async function getAllBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  // Use the useQuery hook to fetch Brands data.
  const { data, isLoading } = useQuery("getAllBrands", getAllBrands);

  // If the data is still loading, show the Loading component.
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container-fluid p-5">
        <div className="row mt-3 g-3">
          {data.data.data.map((brand, index) => (
            <div key={index} className="main-hover col-12 col-md-2">
              <div className="product text-center">
                {/* <h3 className="mt-2 h6 text-main">{brand.name}</h3> */}
                <img className="w-100" src={brand.image} alt={brand.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

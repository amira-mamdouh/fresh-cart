import { Oval } from "react-loader-spinner";

export default function Loading() {
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
    </>
  );
}

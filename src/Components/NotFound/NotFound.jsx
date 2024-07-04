import Img from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <div className="container">
        <div className="p-5 text-center">
          <img className="w-75 m-auto" src={Img} alt="Not Found" />
        </div>
      </div>
    </>
  );
}

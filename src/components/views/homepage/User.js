// components
import FormUser from "./user/FormUser.js";
import CardUser from "./user/CardUser.js";

export default function User() {

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <FormUser /> 
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardUser />
        </div>
      </div>
    </>
  );
}

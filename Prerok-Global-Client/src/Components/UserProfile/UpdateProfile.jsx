
import { useForm } from "react-hook-form";
import { axiosPublic, axiosSecure } from "../../api/axiosInstances";

import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../../api/imageUpload";

const UpdateProfile = () => {
  const { user } = useAuth();

  const { register, handleSubmit } = useForm();

  const { data: users ,  refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user/get-user/${user?.email}`);
      return res.data;
    },
  });
  console.log(users);


  const onSubmit = async (data) => {
    console.log(data);

    const { data: imageFile } = await imageUpload(data?.image[0]);
    console.log(imageFile);

    const userData = {
      name: data?.name,
      dateOFBirth: data?.dateOFBirth,

      district: data?.district,
      division: data?.division,
      email: data?.email,
      gender: data?.gender,
      image: imageFile.display_url,
      postcode: data?.postcode,

      roadNumber: data?.roadNumber,
      state: data?.state,
      upazilla: data?.upazilla,
      village: data?.village,
    };
    console.log(userData);

    const response = await axiosSecure.put(`/api/users/update-user/${user?.email}`, userData)
    console.log(response.data)

  };

  return (
    <div className=" w-3/4 md:w-3/6 mx-auto mt-20 bg-gray-50 p-2 rounded-md shadow-md ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* avatar  */}
        <div>
          <div className="w-3/4 flex justify-center items-center mx-auto">
            <div className="avatar online">
              <div className="w-24 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div className=" p-4 bg-white w-full  m-auto rounded-lg">
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
              <div className="flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    {...register("image")}
                    type="file"
                    className="file-input file-input-bordered file-input-warning file-input-xs w-full max-w-xs"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* main container  */}
        <div className="p-4 flex gap-5 flex-col md:flex-row ">
          {/* section 1  */}
          <div className="w-full">
            {/* name field  */}
            <label className="form-control w-full  my-5">
              <div className="label">
                <span className="label-text"> User Name </span>
              </div>
              <input
                {...register("name")}
                defaultValue={users?.name}
                type="text"
                placeholder="Name"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* email field  */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Email </span>
              </div>
              <input
                {...register("email")}
                defaultValue={users?.email}
                type="email"
                placeholder="Email"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* mobile  */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Mobile </span>
              </div>
              <input
                {...register("mobileNumber")}
                defaultValue={users?.mobileNumber}
                type="number"
                placeholder="Phone"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* select gender  */}
            <div>
              <div className="label">
                <span className="label-text">Gender </span>
              </div>
              <select
                {...register("gender")}
                defaultValue={users?.gender}
                className="select select-warning w-full "
              >
                <option disabled selected>
                  Select Gender{" "}
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* date of birth  */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Date OF Birth </span>
              </div>
              <input
                {...register("dateOFBirth")}
                defaultValue={users?.dateOfBirth}
                type="date"
                placeholder="Date Of Birth"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* Country  */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Country </span>
              </div>
              <input
                {...register("country")}
                defaultValue={users?.country}
                type="text"
                placeholder="Country"
                className="input input-bordered input-warning w-full"
              />
            </label>
          </div>

          {/* section 2  */}
          <div className="w-full">
            {/* state  */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">State </span>
              </div>
              <input
                {...register("state")}
                defaultValue={users?.state}
                type="text"
                placeholder="State"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* post code  */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Post Code </span>
              </div>
              <input
                {...register("postcode")}
                defaultValue={users?.postcode}
                type="number"
                placeholder="Post Code"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* Division */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Division </span>
              </div>
              <input
                {...register("division")}
                defaultValue={users?.division}
                type="text"
                placeholder="Division"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* District     */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">District </span>
              </div>
              <input
                {...register("district")}
                defaultValue={users?.district}
                type="text"
                placeholder="District"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* Upazilla     */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Upazilla </span>
              </div>
              <input
                {...register("upazilla")}
                defaultValue={users?.upazilla}
                type="text"
                placeholder="Upazilla"
                className="input input-bordered input-warning w-full"
              />
            </label>

            {/* Village     */}
            <label className="form-control w-full my-5">
              <div className="label">
                <span className="label-text">Village </span>
              </div>
              <input
                {...register("village")}
                defaultValue={users?.village}
                type="text"
                placeholder="Village"
                className="input input-bordered input-warning w-full"
              />
            </label>
          </div>
        </div>

        {/* Road Number & House Number     */}
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Road Number & House Number </span>
          </div>
          <input
            {...register("roadNumber")}
            defaultValue={users?.roadNumber}
            type="text"
            placeholder="Road No & House No"
            className="input input-bordered input-warning w-full"
          />
        </label>

        <button className="btn"> Submit</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
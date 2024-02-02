import CreateAddressModal from "../../../../Components/AddressBookPage/CreateAddressModal";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../../api/axiosInstances";
import Loading from "../../../../Components/Shared/Loading/Loading";
import { MdEdit, MdDelete } from 'react-icons/md';

const AddressBook = () => {
    const { user } = useAuth();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["usersData", "address-book", user?.email],
        queryFn: async () => {
            const { data: userData } = await axiosSecure.get(`/api/user/get-user/${user?.email}`);
            const { data: allAddress } = await axiosSecure.get(`/api/addressbook/get-all-address/${userData._id}`)
            const allData = { userData, allAddress };
            return allData;
        },
    });


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between px-5">
                <h1 className="text-2xl font-semibold text-amber-500">
                    Address Book
                </h1>

                <CreateAddressModal refetch={refetch} id={data.userData?._id}></CreateAddressModal>
            </div>
            <div className="flex flex-col justify-center items-center my-10">
                {
                    data?.allAddress.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto p-2 gap-6">
                            {
                                data?.allAddress?.map(address => <div key={address._id} className="bg-gray-50  md:flex justify-between p-3 px-5 shadow-md rounded-md">
                                    {/* user info */}
                                    <div className="space-y-2 w-full">
                                        <div className="flex justify-between">
                                            <p className="text-black font-semibold text-xl">{address.name}</p>
                                            {/* edit and delete button  */}
                                            <div className="flex gap-3 items-center justify-end right-3 top-3">
                                                <button className="text-xl font-semibold inline cursor-pointer"><MdEdit></MdEdit></button>
                                                <button className="text-xl font-semibold inline cursor-pointer"><MdDelete></MdDelete></button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <p className="text-gray-500 font-medium">Phone: {address.phone} </p>
                                            <p className="text-gray-500 font-medium">Email: {address.email} </p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <p className="text-gray-500 font-medium">Country: {address.country} </p>
                                            <p className="text-gray-500 font-medium">Postal Code: {address.postal_code} </p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <p className="text-gray-500 font-medium">District: {address.district} </p>
                                            <p className="text-gray-500 font-medium">Division: {address.division} </p>
                                        </div>

                                        <p className="text-gray-500 font-medium">Adreess: {address.address} </p>

                                    </div>
                                </div>

                                )
                            }
                        </div>
                        :
                        <div className="text-center my-10">
                            <p className="my-3 text-gray-500">Save your delivery address here </p>
                            <CreateAddressModal refetch={refetch} id={data.userData?._id}></CreateAddressModal>
                        </div>
                }

            </div>
        </div >
    );
};

export default AddressBook;
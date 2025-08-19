import { useNavigate, useParams } from "react-router";
import FeaturesContainer from "../../components/reuse/FeaturesContainer";
import TableComponent from "../../components/reuse/TableComponent";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useFetchServicesDetails,
  type IServiceDetail,
} from "../../hooks/serviceDetails/useFetchServicesDetails";
import useDeleteServiceDetails from "../../hooks/serviceDetails/useDeleteServiceDetails";

const AllServicesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: servicesDetailsData, isLoading } = useFetchServicesDetails(
    Number(id)
  );

  const { mutate: DeleteServiceDetailsMutate, isPending } =
    useDeleteServiceDetails();

  const columns = [
    {
      title: "ID",
      key: "id",
      render: (_: any, record: IServiceDetail) => (
        <span className="text-slate-700 font-medium">{record.id}</span>
      ),
    },
    {
      title: "Service ID",
      key: "service_id",
      render: (_: any, record: IServiceDetail) => (
        <span className="text-slate-700 font-medium">{record.service_id}</span>
      ),
    },
    {
      title: "Title [AR]",
      key: "titleAr",
      render: (_: any, record: IServiceDetail) => (
        <span className="text-slate-700 font-medium">{record.title?.ar}</span>
      ),
    },
    {
      title: "Title [EN]",
      key: "titleAr",
      render: (_: any, record: IServiceDetail) => (
        <span className="text-slate-700 font-medium">{record.title?.en}</span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: IServiceDetail) => (
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          <button
            onClick={() =>
              navigate(`/updateserviceDetails/${record.id}`, {
                state: { servicedetails: record },
              })
            }
            className="group relative inline-flex items-center justify-center w-9  text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <EditOutlined className="text-base group-hover:scale-110 transition-transform duration-200" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => DeleteServiceDetailsMutate(record.id)}
            className="group relative inline-flex items-center justify-center w-9 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <DeleteOutlined className="text-base group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <FeaturesContainer>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden backdrop-blur-sm">
        {/* Header Section */}
        <div className="relative px-8 py-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--mainColor)] to-[var(--secondaryColor)] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14-7l2 2m0 0l2 2m-2-2v6m-6 3a3 3 0 01-3-3V5a3 3 0 116 0v8.5"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  All Services Details
                </h2>
              </div>
              <button
                type="button"
                className=" bg-gradient-to-br from-[var(--mainColor)] to-[var(--secondaryColor)] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                onClick={() => navigate(`/addserviceDetails/${id}`)}
              >
                Add Service Details
              </button>
            </div>
            <p className="text-slate-600 text-sm font-medium">
              Manage and organize your services Details listings.
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-transparent pointer-events-none"></div>
          <div className="relative p-8">
            <TableComponent
              columns={columns}
              data={servicesDetailsData?.service_details || []}
              loading={isLoading || isPending}
            />
          </div>
        </div>
      </div>
    </FeaturesContainer>
  );
};

export default AllServicesDetails;

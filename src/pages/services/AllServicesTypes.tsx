import FeaturesContainer from "../../components/reuse/FeaturesContainer";
import TableComponent from "../../components/reuse/TableComponent";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddServiceTypeModal from "../../components/once/AddServiceTypeModal";
import { useState } from "react";
import { useFetchServicesTypes } from "../../hooks/servicesTypes/useServiceTypes";
import useDeleteServiceTypes from "../../hooks/servicesTypes/useDeleteServiceTypes";
import UpdateServiceTypeModal from "../../components/once/UpdateServiceTypeModal";

const ServicesTypes = () => {
  const { data: servicesTypesData, isLoading } = useFetchServicesTypes();
  const [addModalopen, setAddModalOpen] = useState(false);
  const [UpdateModalopen, setUpdateModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<any | null>(
    null
  );

  const { mutate: DeleteServiceTypeMutate, isPending } =
    useDeleteServiceTypes();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name[en]",
      key: "type",
      render: (_: any, record: any) => (
        <span className="text-slate-700 font-medium">{record.name.en}</span>
      ),
    },
    {
      title: "Name[ar]",
      key: "titleAr",
      render: (_: any, record: any) => (
        <span className="text-slate-700 font-medium">{record.name.ar}</span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          <button
            onClick={() => {
              setSelectedServiceType(record); // 👈 save row data
              setUpdateModalOpen(true);
            }}
            className="group relative inline-flex items-center justify-center w-9  text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <EditOutlined className="text-base group-hover:scale-110 transition-transform duration-200" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => DeleteServiceTypeMutate(record.id)}
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
                  All Service types
                </h2>
              </div>
              <button
                type="button"
                className=" bg-gradient-to-br from-[var(--mainColor)] to-[var(--secondaryColor)] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                onClick={() => setAddModalOpen(true)}
              >
                Add Service type
              </button>
            </div>
            <p className="text-slate-600 text-sm font-medium">
              Manage and organize your service types listings.
            </p>
          </div>
        </div>

        <AddServiceTypeModal
          open={addModalopen}
          onClose={() => {
            setAddModalOpen(false);
          }}
        />

        <UpdateServiceTypeModal
          open={UpdateModalopen}
          onClose={() => setUpdateModalOpen(false)}
          // 👇 pass selected data into modal
          serviceType={selectedServiceType}
        />

        {/* Table Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-transparent pointer-events-none"></div>
          <div className="relative p-8">
            <TableComponent
              columns={columns}
              data={servicesTypesData || []}
              loading={isLoading || isPending}
            />
          </div>
        </div>
      </div>
    </FeaturesContainer>
  );
};

export default ServicesTypes;

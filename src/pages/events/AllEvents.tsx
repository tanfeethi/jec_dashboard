import { useState } from "react";
import FeaturesContainer from "../../components/reuse/FeaturesContainer";
import TableComponent from "../../components/reuse/TableComponent";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDeleteEvent } from "../../hooks/events/deleteEvent";
import { useFetchEvents } from "../../hooks/events/allEvents";

const AllEvents = () => {
    const [page, setPage] = useState(1);
    const { data: eventsData, isLoading } = useFetchEvents();
    const { mutate: deleteEventMutate, isPending } = useDeleteEvent();
    const navigate = useNavigate();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Image",
            key: "image",
            render: (_: any, record: any) => (
                <img
                    src={record.image}
                    alt="Event"
                    className="w-16 h-16 object-cover rounded-md border"
                />
            ),
        },
        {
            title: "Title (EN)",
            dataIndex: ["title", "en"],
            key: "title_en",
        },
        {
            title: "Title (AR)",
            dataIndex: ["title", "ar"],
            key: "title_ar",
        },
        {
            title: "Actions",
            key: "action",
            render: (_: any, record: any) => (
                <div className="flex items-center gap-3">
                    {/* Edit Button */}
                    <button
                        onClick={() =>
                            navigate(`/events/edit/${record.id}`, { state: { event: record } })
                        }
                        className="group relative inline-flex items-center justify-center w-9 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        <EditOutlined className="text-base group-hover:scale-110 transition-transform duration-200" />
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Edit
                        </span>
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={() => deleteEventMutate({ id: record.id })}
                        className="group relative inline-flex items-center justify-center w-9 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        <DeleteOutlined className="text-base group-hover:scale-110 transition-transform duration-200" />
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Delete
                        </span>
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
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                                    All Events
                                </h2>
                            </div>
                            <button
                                onClick={() => navigate("add")}
                                className=" bg-gradient-to-br from-[var(--mainColor)] to-[var(--secondaryColor)] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                            >
                                Add Event
                            </button>
                        </div>
                        <p className="text-slate-600 text-sm font-medium">
                            Manage and organize your event listings.
                        </p>
                    </div>
                </div>

                {/* Table Container */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-transparent pointer-events-none"></div>
                    <div className="relative p-8">
                        <TableComponent
                            columns={columns}
                            data={eventsData || []}
                            loading={isLoading || isPending}
                            pagination={{
                                total: eventsData?.length || 0,
                                pageSize: 15,
                                current: page,
                                onChange: (p) => setPage(p),
                            }}
                        />
                    </div>
                </div>
            </div>
        </FeaturesContainer>
    );
};

export default AllEvents;
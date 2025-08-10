import { useLocation } from "react-router";

const FeaturesContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Get the last path segment
  const segments = location.pathname.split("/").filter(Boolean);
  const featureName = segments[segments.length - 1] || "feature";

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-center capitalize mb-6">
        {featureName} Table
      </h2>
      {children}
    </div>
  );
};

export default FeaturesContainer;

const Home = () => {
  return (
    <div className=" bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col xl:h-screen">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className=" mx-auto text-center">
          {/* Success Indicator */}
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Login Successful - Welcome Back</span>
          </div>

          {/* Welcome Message */}
          <h2 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Welcome to Your Professional Dashboard
          </h2>

          <p className="text-2xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            You have successfully accessed your comprehensive website management
            platform
          </p>

          <div className="text-lg text-slate-500 leading-relaxed mx-auto">
            Your dashboard is ready and fully operational. Take complete control
            of your digital presence with enterprise-grade tools designed for
            modern businesses. Manage, optimize, and scale your website content
            with professional precision and efficiency.
          </div>

          {/* Credit Section */}
          <div className="mt-10 p-4 bg-white/50 rounded-lg border border-slate-200  mx-auto">
            <p className="text-sm text-slate-600">
              This dashboard was crafted by the{" "}
              <span className="font-semibold text-slate-700">
                JEC Front-End Team
              </span>{" "}
              to provide you with maximum flexibility in rehandling your website
              data with ease and precision.
            </p>
          </div>

          {/* Status Information */}
          <div className="mt-12 flex items-center justify-center space-x-1 xl:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">
                System Operational
              </span>
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">
                All Services Active
              </span>
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="text-sm text-slate-500">Dashboard v2.1.0</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Spin } from "antd";
import MainLayout from "../components/layout/MainLayout";
import ProtectedLayout from "../components/layout/ProtectedLayout";

// Lazy load all pages
const Login = lazy(() => import("../pages/login/Login"));
const Home = lazy(() => import("../pages/home/Home"));

// Blogs
const AllBlogs = lazy(() => import("../pages/blogs/AllBlogs"));
const AddBlog = lazy(() => import("../pages/blogs/AddBlog"));
const UpdateBlog = lazy(() => import("../pages/blogs/UpdateBlog"));

// Services
const AllServices = lazy(() => import("../pages/services/AllServices"));
const AddServices = lazy(() => import("../pages/services/AddServices"));
const UpdateService = lazy(() => import("../pages/services/UpdateService"));

// Sliders
const AllSliders = lazy(() => import("../pages/sliders/AllSliders"));
const AddSliders = lazy(() => import("../pages/sliders/AddSliders"));
const UpdateSlider = lazy(() => import("../pages/sliders/UpdateSlider"));

// Testimonials
const AllTestimonials = lazy(
  () => import("../pages/testimonials/AllTestimonials")
);
const AddTestimonials = lazy(
  () => import("../pages/testimonials/AddTestimonials")
);
const UpdateTestimonials = lazy(
  () => import("../pages/testimonials/UpdateTestimonials")
);

// Clients
const AllClients = lazy(() => import("../pages/clients/AllClients"));
const AddClient = lazy(() => import("../pages/clients/AddClient"));
const UpdateClient = lazy(() => import("../pages/clients/UpdateClient"));

// Reviews
const AllReviews = lazy(() => import("../pages/reviews/AllReviews"));
const AddReviews = lazy(() => import("../pages/reviews/AddReviews"));
const UpdateReview = lazy(() => import("../pages/reviews/UpdateReview"));

// Events
const AllEvents = lazy(() => import("../pages/events/AllEvents"));
const AddEvent = lazy(() => import("../pages/events/AddEvent"));
const UpdateEvent = lazy(() => import("../pages/events/UpdateEvent"));

// FAQs
const AllFaqs = lazy(() => import("../pages/faqs/AllFaqs"));
const AddFaq = lazy(() => import("../pages/faqs/AddFaq"));
const UpdateFaq = lazy(() => import("../pages/faqs/UpdateFaq"));

// Projects
const AllProjects = lazy(() => import("../pages/projects/AllProjects"));
const AddProjects = lazy(() => import("../pages/projects/AddProjects"));
const UpdateProject = lazy(() => import("../pages/projects/UpdateProjects"));

// Static Pages
const AllStaticPages = lazy(
  () => import("../pages/staticPages/AllStaticPages")
);
const UpdateStaticPages = lazy(
  () => import("../pages/staticPages/UpdateStaticPages")
);

// Teams
const AllTeams = lazy(() => import("../pages/teams/AllTeams"));
const AddTeam = lazy(() => import("../pages/teams/AddTeam"));
const UpdateTeam = lazy(() => import("../pages/teams/UpdateTeam"));

// Settings
const AllSettings = lazy(() => import("../pages/settings/AllSettings"));
const UpdateSettings = lazy(() => import("../pages/settings/UpdateSettings"));

const Loading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <Spin size="large" />
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            {/* Blogs */}
            <Route path="blogs" element={<AllBlogs />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="blogs/edit/:id" element={<UpdateBlog />} />

            {/* Services */}
            <Route path="services" element={<AllServices />} />
            <Route path="services/add" element={<AddServices />} />
            <Route path="services/edit/:id" element={<UpdateService />} />

            {/* Sliders */}
            <Route path="sliders" element={<AllSliders />} />
            <Route path="sliders/add" element={<AddSliders />} />
            <Route path="sliders/edit/:id" element={<UpdateSlider />} />

            {/* Testimonials */}
            <Route path="testimonials" element={<AllTestimonials />} />
            <Route path="testimonials/add" element={<AddTestimonials />} />
            <Route
              path="testimonials/edit/:id"
              element={<UpdateTestimonials />}
            />

            {/* Clients */}
            <Route path="clients" element={<AllClients />} />
            <Route path="clients/add" element={<AddClient />} />
            <Route path="clients/edit/:id" element={<UpdateClient />} />

            {/* Reviews */}
            <Route path="reviews" element={<AllReviews />} />
            <Route path="reviews/add" element={<AddReviews />} />
            <Route path="reviews/edit/:id" element={<UpdateReview />} />

            {/* Events */}
            <Route path="events" element={<AllEvents />} />
            <Route path="events/add" element={<AddEvent />} />
            <Route path="events/edit/:id" element={<UpdateEvent />} />

            {/* FAQs */}
            <Route path="faqs" element={<AllFaqs />} />
            <Route path="faqs/add" element={<AddFaq />} />
            <Route path="faqs/edit/:id" element={<UpdateFaq />} />

            {/* Projects */}
            <Route path="projects" element={<AllProjects />} />
            <Route path="projects/add" element={<AddProjects />} />
            <Route path="projects/edit/:id" element={<UpdateProject />} />

            {/* Static Pages */}
            <Route path="static-pages" element={<AllStaticPages />} />
            <Route path="static-pages/edit" element={<UpdateStaticPages />} />

            {/* Teams */}
            <Route path="teams" element={<AllTeams />} />
            <Route path="teams/add" element={<AddTeam />} />
            <Route path="teams/edit/:id" element={<UpdateTeam />} />

            {/* Settings */}
            <Route path="settings" element={<AllSettings />} />
            <Route path="settings/edit" element={<UpdateSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

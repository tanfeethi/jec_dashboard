import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Spin } from "antd";
import MainLayout from "../components/layout/MainLayout";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import AddServices from "../pages/services/AddServices";
import AddSliders from "../pages/sliders/AddSliders";
import AddBlog from "../pages/blogs/AddBlog";
import AddTestimonials from "../pages/testimonials/AddTestimonials";
import AddReviews from "../pages/reviews/AddReviews";
import AddFaq from "../pages/faqs/AddFaq";
import UpdateService from "../pages/services/UpdateService";
import UpdateSlider from "../pages/sliders/UpdateSlider";
import UpdateBlog from "../pages/blogs/UpdateBlog";
import UpdateTestimonials from "../pages/testimonials/UpdateTestimonials";
import UpdateReview from "../pages/reviews/UpdateReview";
import UpdateFaq from "../pages/faqs/UpdateFaq";
import UpdateStaticPages from "../pages/staticPages/UpdateStaticPages";
import UpdateSettings from "../pages/settings/UpdateSettings";
import AddProjects from "../pages/projects/AddProjects";
import UpdateProject from "../pages/projects/UpdateProjects";

// Lazy load all pages
const Login = lazy(() => import("../pages/login/Login"));
const Home = lazy(() => import("../pages/home/Home"));
const AllBlogs = lazy(() => import("../pages/blogs/AllBlogs"));
const AllServices = lazy(() => import("../pages/services/AllServices"));
const AllSliders = lazy(() => import("../pages/sliders/AllSliders"));
const AllTestimonials = lazy(
  () => import("../pages/testimonials/AllTestimonials")
);
const AllReviews = lazy(() => import("../pages/reviews/AllReviews"));
const AllFaqs = lazy(() => import("../pages/faqs/AllFaqs"));
const AllProjects = lazy(() => import("../pages/projects/AllProjects"));
const AllStaticPages = lazy(
  () => import("../pages/staticPages/AllStaticPages")
);
const AllSettings = lazy(() => import("../pages/settings/AllSettings"));

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
            <Route path="blogs" element={<AllBlogs />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="blogs/edit/:id" element={<UpdateBlog />} />

            <Route path="services" element={<AllServices />} />
            <Route path="services/add" element={<AddServices />} />
            <Route path="services/edit/:id" element={<UpdateService />} />

            <Route path="sliders" element={<AllSliders />} />
            <Route path="sliders/add" element={<AddSliders />} />
            <Route path="sliders/edit/:id" element={<UpdateSlider />} />

            <Route path="testimonials" element={<AllTestimonials />} />
            <Route path="testimonials/add" element={<AddTestimonials />} />
            <Route
              path="testimonials/edit/:id"
              element={<UpdateTestimonials />}
            />

            <Route path="reviews" element={<AllReviews />} />
            <Route path="reviews/add" element={<AddReviews />} />
            <Route path="reviews/edit/:id" element={<UpdateReview />} />

            <Route path="faqs" element={<AllFaqs />} />
            <Route path="faqs/add" element={<AddFaq />} />
            <Route path="faqs/edit/:id" element={<UpdateFaq />} />

            <Route path="projects" element={<AllProjects />} />
            <Route path="projects/add" element={<AddProjects />} />
            <Route path="projects/edit/:id" element={<UpdateProject />} />

            <Route path="static-pages" element={<AllStaticPages />} />
            <Route path="static-pages/edit" element={<UpdateStaticPages />} />

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

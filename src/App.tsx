/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Otp from "./pages/ForgetPassword/Otp";
import OtpSignup from "./pages/Signup/Otp";
import Signup from "./pages/Signup/Signup";
import Information from "./pages/Signup/Information";
import ListCourses from "./pages/ListCourses/ListCourses";
import CourseItem from "./pages/CourseItem/CourseItem";
import VideoCourse from "./pages/VideoCourse/VideoCourse";
import Assingments from "./pages/Assingments/Assingments";
import MyLearning from "./pages/MyLearning/MyLearning";
import Cart from "./pages/Cart/Cart";
import LoginTeacher from "./pages/Teacher/Login/Login";
import Header from "./pages/Teacher/Header/Header";

import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/500.css";
import "@fontsource/alegreya/600.css";
import "@fontsource/alegreya/700.css";
import "@fontsource/alegreya/800.css";
import "@fontsource/alegreya/900.css";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Teacher/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateCourse from "./pages/Teacher/CreateCourse/CreateCourse";
import Settings from "./pages/Profile/Settings";
import Setting from "./pages/Teacher/Settings/Setting";
import MainCourse from "./pages/Teacher/TeacherCourse/MainCourse";
import MainExam from "./pages/Teacher/Exam/MainExam";
import ResultExam from "./pages/ResultExam/ResultExam";
import Payment from "./pages/Payment/Payment";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import SidebarAdmin from "./components/Sidebar/SidebarAdmin";
import DashboardAdminTeacher from "./pages/Admin/DashboardAdminTeacher";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFail from "./pages/Payment/PaymentFail";
import CourseDetail from "./pages/CourseItem/CourseDetail";
import TeacherCourseDetail from "./pages/Teacher/TeacherCourse/TeacherCourseDetail";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import RequireVideo from "./components/RequireVideo/RequireVideo";
import MessageTeacher from "./pages/Teacher/TeacherMessage/MessageTeacher";
import DashboardCheckCourses from "./pages/Admin/DashboardCheckCourses";
import MainQuiz from "./pages/Teacher/Quiz/MainQuiz";
import Blog from "./pages/Blog/Blog";
import DetailBlog from "./pages/DetailBlog/DetailBlog";
import BlogTeacher from "./pages/Teacher/Blog/BlogTeacher";
import BlogAdmin from "./pages/Admin/BlogCheck/BlogAdmin";
import Banner from "./pages/Admin/Banner/Banner";
import Exam from "./pages/Assingments/Exam";
import Statistic from "./components/Statistic/Statistic";
function App() {
  const [loading, setLoading] = useState(true);
  const pathname = useLocation();
  console.log(pathname);

  useEffect(() => {
    if (pathname.pathname.includes("teacher") === false) {
      setLoading(true);
      const loadings = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(loadings);
    } else {
      setLoading(false);
    }
  }, [pathname]);
  return (
    <div>
      {pathname.pathname.includes("teacher") === true && (
        <>
          <div className="h-screen">
            <div
              className={`grid h-full ${
                pathname.pathname !== "/teacher"
                  ? "grid-cols-[300px_1fr]"
                  : "grid-cols-1"
              }`}
            >
              {pathname.pathname !== "/teacher" && (
                <div className="bg-[#1D2026] shadow-[0px_-1px_0px_0px_#363B47] h-screen fixed w-[300px] top-0 left-0">
                  <Sidebar />
                </div>
              )}
              <div
                className={`bg-[#F5F7FA] h-full ${
                  pathname.pathname !== "/teacher"
                    ? "w-[calc(100vw-300px)] left-[300px]"
                    : "w-full"
                } relative`}
              >
                <div className="h-full">
                  {!loading ? (
                    <>
                      {pathname.pathname !== "/teacher" &&
                        pathname.pathname !== "/admin/teacher" && (
                          // <Header />
                          <div></div>
                        )}
                      <Routes>
                        <Route path="/teacher" element={<LoginTeacher />} />
                        <Route
                          path="/teacher/dashboard"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <Dashboard />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/create-course"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <CreateCourse />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/setting/:id"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <Setting />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/courses"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <MainCourse />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/exam"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <MainExam />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/quiz"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <MainQuiz />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/courses/:id"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <TeacherCourseDetail />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/message"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              {/* <MessageTeacher/> */}
                              <div></div>
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/teacher/blog"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <BlogTeacher />
                            </RequireAuth>
                          }
                        />
                      </Routes>
                    </>
                  ) : (
                    <div className="pt-[100px] pb-[60px] px-[24px] flex justify-center h-full items-center">
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {pathname.pathname.includes("admin") === true && (
        <>
          <div className="h-full">
            <div className={"grid grid-cols-[300px_1fr]"}>
              <div className="bg-[#1D2026] shadow-[0px_-1px_0px_0px_#363B47] h-full fixed w-[300px] top-0 left-0">
                <SidebarAdmin />
              </div>
              <div
                className={
                  "bg-[#F5F7FA] max-h-full w-[calc(100vw-300px)] left-[300px] relative"
                }
              >
                <div className="h-full">
                  {!loading ? (
                    <>
                      <Routes>
                        <Route
                          path="/admin/student"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <DashboardAdmin />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/admin/teaches"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <DashboardAdminTeacher />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/admin/check-courses"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <DashboardCheckCourses />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/admin/blog"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <BlogAdmin />
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/admin/statistic"
                          element={
                            <RequireAuth redirectTo="/teacher">
                              <Statistic />
                            </RequireAuth>
                          }
                        />
                      </Routes>
                    </>
                  ) : (
                    <div className="pt-[100px] pb-[60px] px-[24px] flex justify-center h-full items-center">
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {pathname.pathname.includes("teacher") === false &&
        pathname.pathname.includes("admin") === false && (
          <>
            {!pathname.pathname.includes("assignment") &&
              !pathname.pathname.includes("teacher") &&
              !pathname.pathname.includes("signup/user") &&
              !pathname.pathname.includes("success") &&
              !pathname.pathname.includes("fail") && <Navbar />}

            <div className="h-full">
              <Routes>
                {/* <Navbar/> */}
                <Route path="/" element={<Homepage />} />
                <Route path="login" element={<Login />} />
                <Route path="forgetpassword" element={<ForgetPassword />} />
                <Route path="forgetpassword/otp" element={<Otp />} />
                <Route path="signup" element={<Signup />} />
                <Route
                  path="signup/otp"
                  element={
                    <RequireAuth redirectTo="/signup">
                      <OtpSignup />
                    </RequireAuth>
                  }
                />
                <Route
                  path="signup/user"
                  element={
                    <RequireAuth redirectTo="/signup">
                      <Information />
                    </RequireAuth>
                  }
                />
                <Route path="courses" element={<ListCourses />} />
                <Route path="courses/:idcourse" element={<CourseItem />} />
                <Route
                  path="courses/:idcourse/video"
                  element={
                    <RequireAuth redirectTo="/login">
                      <RequireVideo redirectTo="/courses">
                        <VideoCourse />
                      </RequireVideo>
                    </RequireAuth>
                  }
                />
                <Route
                  path="/exam"
                  element={
                    <RequireAuth redirectTo="/login">
                      <Exam />
                    </RequireAuth>
                  }
                />
                <Route
                  path="courses/:idcourse/assignment"
                  element={
                    <RequireAuth redirectTo="/login">
                      <Assingments />
                    </RequireAuth>
                  }
                />
                <Route
                  path="courses/:idcourse/result-exam"
                  element={
                    <RequireAuth redirectTo="/login">
                      <ResultExam />
                    </RequireAuth>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <RequireAuth redirectTo="/login">
                      <Cart />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile/:id"
                  element={
                    <RequireAuth redirectTo="/login">
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/cart/payment"
                  element={
                    <RequireAuth redirectTo="/login">
                      <Payment />
                    </RequireAuth>
                  }
                />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:idblog" element={<DetailBlog />} />
                {/* <Route
                  path="/cart/payment/success"
                  element={<PaymentSuccess />}
                />
                <Route path="/cart/payment/fail" element={<PaymentFail />} /> */}
              </Routes>
            </div>

            {!pathname.pathname.includes("assignment") &&
              !pathname.pathname.includes("teacher") &&
              !pathname.pathname.includes("admin") &&
              !pathname.pathname.includes("login") &&
              !pathname.pathname.includes("signup") &&
              !pathname.pathname.includes("forgetpassword") &&
              !pathname.pathname.includes("success") &&
              !pathname.pathname.includes("fail") && (
                <div className="">
                  <Footer />
                </div>
              )}
          </>
        )}
    </div>
  );
}

export default App;

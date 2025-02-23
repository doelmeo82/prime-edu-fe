import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/appHooks";
import { updateTabCourse } from "../../store/reducers/courseTabSlice";
import { LocalStorage } from "../../utils/LocalStorage";
import {
  selectAuthUserId,
  selectUserInfo,
  updateIsLogged,
  updateUserId,
} from "../../store/reducers/authSlice";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../store/actions/user.action";

const Username = () => {
  const dispatch = useAppDispatch();
  const userId: any = useSelector(selectUserInfo);
  console.log(userId);

  const navigate = useNavigate();
  const handleClickToCourseTab = (index: number) => {
    dispatch(updateTabCourse(index));
  };
  const handleLogout = () => {
    LocalStorage.clearToken();
    dispatch(updateIsLogged(false));
    dispatch(updateUserId({}));
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  const getUserInfoDetail = async () => {
    const res = await dispatch(getUserInfo({}));
    if (res.meta.requestStatus === "fulfilled" && res.payload) {
      console.log(res);
    }
  };
  const handleTeacher = () => {
    LocalStorage.clearToken();
    dispatch(updateIsLogged(false));
    dispatch(updateUserId({}));
    setTimeout(() => {
      navigate("/teacher");
    }, 500);
  };
  useEffect(() => {
    getUserInfoDetail();
  }, []);
  return (
    <div className="title_learn text-[14px] cursor-pointer relative text-[#272829]">
      <div className="cursor-pointer">
        <div className="w-[30px] h-[30px] bg-[#272829] flex justify-center items-center rounded-full">
          <h1 className="text-white uppercase">
            {userId?.username?.slice(0, 2)}
          </h1>
        </div>
      </div>

      <div className="modal_title_learn absolute top-[100%] right-[50%] w-[300px] h-fit bg-white border-[1px] border-[#272829]">
        <div className="px-2 py-3 divide-y-[1px]">
          <div className="grid grid-cols-[80px_1fr] gap-x-2 items-center pb-3">
            <img
              src={
                userId?.avatar ??
                "https://images.pexels.com/photos/9449708/pexels-photo-9449708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt=""
              className="w-[80px] h-[80px] rounded-full border-[1px]"
            />
            <div>
              <h1 className="text-base font-medium">{userId?.username}</h1>
              <span className="text-[12px] text-[#ACADAE]">
                {userId?.email}
              </span>
            </div>
          </div>
          <div className="flex flex-col py-3 gap-y-2">
            <Link
              to={`/profile/${userId?._id}`}
              className="text-[14px] font-semibold text-[#61677A] hover:text-[#272829] transition-all ease-in-out duration-200"
              onClick={() => handleClickToCourseTab(0)}
            >
              My learning
            </Link>
            <Link
              to={`/profile/${userId?._id}`}
              className="text-[14px] font-medium text-[#61677A] hover:text-[#272829] transition-all ease-in-out duration-200"
              onClick={() => handleClickToCourseTab(1)}
            >
              Wish list
            </Link>
          </div>
          <div className="flex flex-col py-3 gap-y-2">
            <Link
              to=""
              className="text-[14px] font-medium text-[#61677A] hover:text-[#272829] transition-all ease-in-out duration-200"
            >
              Notifications
            </Link>
            <Link
              to=""
              className="text-[14px] font-medium text-[#61677A] hover:text-[#272829] transition-all ease-in-out duration-200"
            >
              Messages
            </Link>
          </div>
          <div className="flex flex-col py-3 gap-y-2">
            <Link
              to={`/profile/${userId?._id}`}
              className="text-[14px] font-medium text-[#61677A] hover:text-[#272829] transition-all ease-in-out duration-200"
            >
              Account settings
            </Link>
            <div
              onClick={handleTeacher}
              className="text-[14px] font-medium text-[#61677A] hover:text-[#272829] transition-all ease-in-out duration-200"
            >
              Go to teacher site
            </div>
            <div
              onClick={handleLogout}
              className="text-[14px] font-medium text-[#61677A] hover:text-[#272829] transition-all ease-in-out duration-200"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Username;

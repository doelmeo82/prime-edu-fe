import React from "react";
import CoursesNewset from "./CoursesNewset";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/reducers/authSlice";
const MyCourses = () => {
  const userInfo: any = useSelector(selectUserInfo);

  return (
    <div>
      <div className="mb-[24px] flex justify-between items-center">
        <h1 className="font-semibold text-[24px] text-[#1D2026] ">
          Start learning,{" "}
          <span className="text-[#FF6636]">{userInfo?.fullname}</span>
        </h1>
        <div className="cursor-pointer flex text-[#FF6636] bg-[#FFEEE8] gap-x-[12px] w-[200px] py-3 px-5 justify-center items-center w-[">
          <button>More</button>
          <HiOutlineArrowSmRight />
        </div>
      </div>
      <CoursesNewset />
    </div>
  );
};

export default MyCourses;

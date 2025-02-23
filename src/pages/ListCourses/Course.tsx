import React, { useState } from "react";
import imgSub from "../../image/Homepage/R.jpeg";
import { CiShoppingCart } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineClockCircle,
  AiFillHeart,
} from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { formatMoney } from "../../utils/lib";
import { useAppDispatch } from "../../hooks/appHooks";
import {
  addToCart,
  deleteCart,
  getCart,
} from "../../store/actions/cart.action";
import useQueryParams from "../../hooks/useSearchParams";
import { LocalStorage } from "../../utils/LocalStorage";
import { VscGoToFile } from "react-icons/vsc";
import { getWistList, postWishList } from "../../store/actions/wishlist.action";
import {
  selectCartList,
  selectCartListSub,
  selectIsBuyNow,
  updateCartSub,
  updateIsBuyNow,
} from "../../store/reducers/cartSlice";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { paymentCart } from "../../store/actions/payment.action";
const Course = ({ item, getListCourse }: any) => {
  const cartList: any = useSelector(selectCartList);
  const cartListSub: any = useSelector(selectCartListSub);
  const isBuyNow = useSelector(selectIsBuyNow);
  const userId = LocalStorage.getUserId();
  const navigate = useNavigate();
  const queryParam = useQueryParams(
    {
      search: "",
      categoryId: "",
      subCategoryId: "",
      startPrice: "",
      endPrice: "",
      page: 1,
      userId: "",
      startDuration: "",
      endDuration: "",
    },
    window.location.href
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const pathname = useLocation();
  const handleDetailCourse = () => {
    navigation(`${pathname.pathname}/${item._id}`);
  };
  const addCart = async (id: any) => {
    const payload = {
      courseId: id,
    };
    const res = await dispatch(addToCart(payload));
    if (res.payload && res.meta.requestStatus === "fulfilled") {
      console.log("🚀 ~ file: SidebarCourse.tsx:31 ~ addCart ~ res:", res);
    }
  };
  const getCartList = async () => {
    const response = await dispatch(getCart({}));
    if (response.meta.requestStatus === "fulfilled" && response.payload) {
      console.log(response);
    }
  };
  const getWishLists = async () => {
    const response = await dispatch(getWistList({}));
    if (response.meta.requestStatus === "fulfilled" && response.payload) {
      console.log(response);
    }
  };
  const addToMyCart = () => {
    addCart(item?._id);
    setTimeout(() => {
      getListCourse({
        ...queryParam.queryParams,
      });
      getCartList();
    }, 500);
  };
  const postAddWishList = async (id: any) => {
    const payload = {
      courseId: id,
    };
    const res = await dispatch(postWishList(payload));
    if (res.payload && res.meta.requestStatus === "fulfilled") {
      getListCourse({
        ...queryParam.queryParams,
      });
      getWishLists();
    }
  };
  const handleCart = () => {
    navigate("/cart");
  };
  const handleBuy = async () => {
    dispatch(updateIsBuyNow(true));
    dispatch(updateCartSub(item));
    const payload = {
      paymentMethod: "vnpay",
      items: [
        {
          courseId: item?._id,
          price: item?.price,
        },
      ],
    };
    const res: any = await dispatch(paymentCart(payload));
    if (res.payload && res.meta.requestStatus === "fulfilled") {
      window.open(res.payload.data);
    }
    // setTimeout(() => {
    //   navigate("/cart/payment");
    // }, 500);
  };
  return (
    <div className="course_re text-[#1D2026]">
      <div className="flex justify-between gap-x-5 flex-col lg:flex-row">
        <div
          className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-[15px]  cursor-pointer flex-1"
          onClick={handleDetailCourse}
        >
          <img
            src={item?.thumbnail_url}
            alt=""
            className="w-[250px] h-[180px] object-cover flex-1"
          />
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[20px] font-semibold text-[#272829]">
              {item?.courseName}
            </h1>
            {/* <p className="font-normal text-[14px]">
              {parse(item?.description)}
            </p> */}
            <div className="flex gap-3 items-center flex-wrap">
              <div className="px-[6px] py-[4px] text-[12px] font-medium text-[#993D20] bg-[#FFEEE8] w-fit">
                {item?.category.categoryName}
              </div>

              {/* <span className="text-[12px] font-normal px-[6px] py-[4px] text-[#15711F] bg-[#E1F7E3] w-fit">
                55 hours học, 12 chuyên đề
              </span> */}
            </div>
            <div className="flex gap-x-6">
              {/* <div className="flex gap-x-2">
                <BsPeople className="text-[20px] text-[#564FFD]" />
                <span className="text-[14px] font-medium text-[#4E5566]">
                  236{" "}
                  <span className="text-[#8C94A3] font-normal">Student</span>
                </span>
              </div> */}
              <div className="flex gap-x-2">
                <AiOutlineClockCircle className="text-[20px] text-[#23BD33]" />
                <span className="text-[#8C94A3] font-normal text-[14px]">
                  {Math.floor(+item?.totalDuration / 60)} hours studying
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          {/* <h1 className="text-right text-[20px] font-semibold mb-1 text-[#FF6636] w-fit">
            {formatMoney(item?.price)}
            <span>VND</span>
          </h1> */}
          {userId && (
            <div className="flex gap-x-3 text-white flex-wrap gap-y-5 justify-end">
              {item?.isPaid ? (
                <button
                  onClick={() => navigate(`/courses/${item?._id}`)}
                  className="flex items-center gap-x-2 px-[12px] py-[6px] bg-[#FF6636] rounded-md"
                >
                  <VscGoToFile />
                  <span>Start learning</span>
                </button>
              ) : (
                <>
                  <div
                    onClick={() => postAddWishList(item?._id)}
                    className="w-[35px] cursor-pointer h-[35px] border-[1px] border-[#FF6636] rounded-full flex justify-center items-center"
                  >
                    {item?.isBookmark ? (
                      <AiFillHeart className="text-[22px] text-[#FF6636]" />
                    ) : (
                      <AiOutlineHeart className="text-[22px] text-[#FF6636]" />
                    )}
                  </div>
                  <button
                    onClick={handleBuy}
                    className="flex items-center gap-x-2 px-[12px] py-[6px] bg-[#FF6636] rounded-md"
                  >
                    <IoBagCheckOutline />
                    <span>Start learning</span>
                  </button>
                </>
              )}
              {/* {item?.isPaid === false && (
                <>
                  {item?.isAddToCart ? (
                    <button
                      onClick={handleCart}
                      className="flex items-center gap-x-2 px-[12px] py-[6px] bg-[#FF6636] rounded-md"
                    >
                      <CiShoppingCart />
                      <span>Xem giỏ hàng</span>
                    </button>
                  ) : (
                    <button
                      onClick={addToMyCart}
                      className="flex items-center gap-x-2 px-[12px] py-[6px] bg-[#FF6636] rounded-md"
                    >
                      <CiShoppingCart />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                  )}
                </>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;

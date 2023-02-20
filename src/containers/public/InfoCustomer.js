import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import icons from "../../ultils/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../../store/actions";
import { InFoUser, ItemsImg } from "../../components";
import EditInfoUser from "../../components/EditInfoUser";
import avatar from "../../assets/avatar.png";
import { path } from "../../ultils/constant";

const InfoCustomer = () => {
  const { currentData } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [dataOrder, setDataOrder] = useState([]);

  const { AiOutlineHome, AiTwotoneEdit } = icons;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(action.getCurrent());
    dispatch(action.getOrder());
    dispatch(action.getCurrent());
  };

  useEffect(() => {
    fectchOrder();
  }, [orders]);

  const fectchOrder = () => {
    let data = orders?.filter((items) => items?.userId === currentData?.id);
    setDataOrder(data);
  };
  return (
    <div className="bg-[#f1f1f1] w-full">
      <div className="py-1 shadow-lg ">
        <div className="w-[80%] mx-auto text-[13px] flex items-center gap-1">
          <AiOutlineHome color="red" />
          Trang chủ / Tài khoản
        </div>
      </div>
      <div className="w-[80%] md:max-lg:w-[96%] sm:max-md:w-full mx-auto items-center mt-5 bg-[#f1f1f1]">
        <div className="flex  sm:max-md:flex-col   gap-5 sm:max-md:gap-1">
          <div className="flex flex-col gap-5 sm:max-md:gap-4 w-[70%] sm:max-md:w-[96%] sm:max-md:mx-auto items-start">
            <div className="flex gap-5 justify-center items-center w-full">
              <Link
                to={"/" + path.ORDERTRACK}
                className="w-1/2 p-5 bg-white  flex flex-col gap-2 justify-center items-center relative shadow-10% rounded-xl"
              >
                <img
                  src="./img/checklist.png"
                  alt="checklist"
                  className="object-cover w-7 h-7 "
                />
                <span className="font-semibold text-[14px] sm:max-md:text-[11px]">
                  Lịch sử đơn hàng
                </span>
                <span>
                  {dataOrder?.length > 0 &&
                    dataOrder
                      .filter((item) => item.status !== 0)
                      .map((iCount, index) => {
                        let count = index + 1;
                        return (
                          <span
                            key={index}
                            className="absolute top-[40%] right-[45%] text-center bg-red-600 rounded-xl w-[20px] h-[20px] leading-[20px] text-white text-[9px] "
                          >
                            {count}
                          </span>
                        );
                      })}
                </span>
              </Link>
              <div className="w-1/2 p-5 bg-white  flex flex-col gap-2 justify-center items-center relative shadow-10% rounded-xl">
                <span className="w-8 h-8">
                  {currentData?.avatar && currentData?.avatar !== "0" ? (
                    <ItemsImg images={JSON.parse(currentData?.avatar)} />
                  ) : (
                    <img src={avatar} alt="avatar" />
                  )}
                </span>
                <span className="font-semibold text-[14px] sm:max-md:text-[11px]">
                  Xin chào {currentData?.firstName + currentData?.lastName}
                </span>
              </div>
            </div>
            <div className="w-full p-5 mb-5 bg-white  flex flex-col justify-start items-start relative shadow-10% rounded-xl">
              <span className=" flex gap-2 font-semibold text-[16px] capitalize text-red-600">
                <span>thông tin cá nhân</span>
                <button
                  className=" text-green-500 px-2 rounded-lg"
                  onClick={() => setModal(true)}
                >
                  <AiTwotoneEdit />
                </button>
              </span>
              <span>
                Họ và tên:
                <span className="text-stone-600 px-2">
                  {currentData?.firstName + currentData?.lastName}
                </span>
              </span>
              <span>
                Email:
                <span className="text-stone-600 px-2">
                  {currentData?.email}
                </span>
              </span>
              <span>
                Số điện thoại:
                <span className="text-stone-600 px-2">
                  {currentData?.phone}
                </span>
              </span>
              <span>
                Địa chỉ:
                <span className="text-stone-600 px-2">
                  {currentData?.address ? currentData?.address : "không có"}
                </span>
              </span>
            </div>
            <EditInfoUser
              modal={modal}
              setModal={setModal}
              dataEdit={currentData}
            />
          </div>
          <div className="w-[30%] sm:max-md:w-[96%] sm:max-md:mx-auto">
            <InFoUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCustomer;

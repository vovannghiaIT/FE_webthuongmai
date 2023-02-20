import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import ItemsImg from "./ItemsImg";
import { Link } from "react-router-dom";

const ItemsProduct = ({
  sale,
  contextleft,
  contextright,
  name,
  images,
  pricesale,
  price,

  slug,
  onClick,
}) => {
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  var PhoneHot = 2;
  var LapTopHot = 5;
  //PanginateProduct
  const [itemOffsetProductleft, setItemOffsetProductleft] = useState(0);
  const [itemsPerPageProductleft, setItemsPerPageProductleft] = useState(8);

  const endOffsetProductleft = itemOffsetProductleft + itemsPerPageProductleft;
  const currentItemsProductleft = products
    .filter((item) => item?.status === 1 && item?.categoryId === PhoneHot)
    .slice(itemOffsetProductleft, endOffsetProductleft);
  //PanginateProduct
  const [itemOffsetProductright, setItemOffsetProductright] = useState(0);
  const [itemsPerPageProductright, setItemsPerPageProductright] = useState(8);

  const endOffsetProductright =
    itemOffsetProductright + itemsPerPageProductright;
  const currentItemsProductright = products
    .filter((item) => item.status === 1 && item.categoryId === LapTopHot)
    .slice(itemOffsetProductright, endOffsetProductright);

  return (
    <>
      {!contextleft && !contextright && (
        <Link
          to={"/productdetail/" + slug}
          className={`shadow-25% flex gap-2 flex-col p-2 w-full h-full min-w-[120px] bg-white rounded-md overflow-hidden cursor-pointer `}
          onClick={onClick}
        >
          <ItemsImg images={images} homeItem />

          {sale && (
            <div className="uppercase text-[10px] bg-[#ff8a97] rounded-xl py-[1px] text-center text-white">
              Đã bán: 35
            </div>
          )}
          <h3 className="font-semibold sm:max-md:text-[12px]">{name}</h3>
          <div className="flex gap-2">
            {pricesale === 0 ? (
              <>
                <p className="text-red-500 text-[15px] text-center font-medium">
                  {price}đ
                </p>
              </>
            ) : (
              <>
                <p className="text-red-500 text-[15px] font-medium">
                  {pricesale}đ
                </p>
                <p className="text-gray-400 line-through text-[14px]">
                  {price}đ
                </p>
              </>
            )}
          </div>
        </Link>
      )}

      {contextleft &&
        currentItemsProductleft?.length > 0 &&
        currentItemsProductleft.map((items, index) => {
          return (
            <Link
              to={"productdetail/" + items?.slug}
              className={`shadow-25% flex gap-2 flex-col p-2 w-full  h-full  bg-white rounded-md overflow-hidden cursor-pointer`}
              key={index}
            >
              <ItemsImg images={JSON.parse(items?.images)} homeItem />

              {sale && (
                <div className="uppercase text-[10px] bg-[#ff8a97] rounded-xl py-[1px] text-center text-white">
                  Đã bán: 35
                </div>
              )}
              <h3 className="font-semibold">{items.name}</h3>
              <div className="flex gap-2 items-center justify-center">
                {items.pricesale === 0 ? (
                  <>
                    <p className="text-red-500 text-[15px] text-center font-medium">
                      {items.price}đ
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-red-500 text-[15px] font-medium">
                      {items.pricesale}đ
                    </p>
                    <p className="text-gray-400 line-through text-[14px]">
                      {items.price}đ
                    </p>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      {contextright &&
        currentItemsProductright?.length > 0 &&
        currentItemsProductright.map((items, index) => {
          return (
            <Link
              to={"productdetail/" + items?.slug}
              className={`shadow-25% flex gap-2 flex-col p-2  w-full h-full  bg-white rounded-md overflow-hidden cursor-pointer`}
              key={index}
            >
              <ItemsImg images={JSON.parse(items?.images)} homeItem />

              {sale && (
                <div className="uppercase text-[10px] bg-[#ff8a97] rounded-xl py-[1px] text-center text-white">
                  Đã bán: 35
                </div>
              )}
              <h3 className="font-semibold">{items.name}</h3>
              <div className="flex gap-2 items-center justify-center">
                {items.pricesale === 0 ? (
                  <>
                    <p className="text-red-500 text-[15px] text-center font-medium">
                      {items.price}đ
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-red-500 text-[15px] font-medium">
                      {items.pricesale}đ
                    </p>
                    <p className="text-gray-400 line-through text-[14px]">
                      {items.price}đ
                    </p>
                  </>
                )}
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default ItemsProduct;

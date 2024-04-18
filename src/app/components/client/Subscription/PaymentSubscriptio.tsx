import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { PaymentCardIcon } from "public/assets/icons/billingIcons";
import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";

const cardsData = [
  {
    title: "Credit card",
    lastDigits: "2020",
    name: "Visa",
    type: "visa",
  },
  {
    title: "Bank Accounts",
    lastDigits: "1428",
    name: "HDFC bank",
    type: "bank",
  },
];

function PaymentMethods() {
  const theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  useEffect(() => {
    console.log("isOpenAddModal ==> ", isOpenAddModal);
  }, [isOpenAddModal]);
  return (
    <>
      <div className="shadow-sm bg-white rounded-lg py-24 ">
        <div className="flex justify-between flex-wrap gap-y-[32px] ">
          {cardsData.map((card, index) => (
            <>
              <div className="w-[49%]  ">
                <Typography
                  variant="h6"
                  className="mb-4 text-[20px] font-600 text-[#0A0F18] py-20"
                >
                  {card.title}
                </Typography>
                <div
                  className="p-16 pe-20 rounded-[10px] bg-bgGrey basis-full lg:basis-[calc(50%_-_16px)]"
                  key={index}
                >
                  <div className="flex items-center gap-[1.8rem]">
                    <div className="w-[86px] h-[68px] rounded-8 bg-white flex items-center justify-center shrink-0">
                      {card.type === "visa" ? (
                        <img
                          src="/assets/images/pages/billing/visa.svg"
                          className="max-w-[64px]"
                          alt="visa"
                        />
                      ) : (
                        <img
                          src="/assets/icons/BankIcon.svg"
                          className="max-w-[54px]"
                          alt="master"
                        />
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-10 grow">
                      <div>
                        <h4 className="text-title text-xl font-700 mb-8">
                          **** **** **** {card.lastDigits}
                        </h4>
                        <p className="text-lg text-title_light">{card.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default PaymentMethods;

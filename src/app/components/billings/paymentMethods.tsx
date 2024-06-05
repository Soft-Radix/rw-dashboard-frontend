import { Button, IconButton, useTheme } from "@mui/material";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { PaymentCardIcon } from "public/assets/icons/billingIcons";
import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import AddCard from "./AddCard";

const cardsData = [
  {
    lastDigits: "2020",
    name: "Visa",
    type: "visa",
  },
  {
    lastDigits: "1428",
    name: "Master Card",
    type: "master",
  },
];

function PaymentMethods() {
  const theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  useEffect(() => {
    console.log("isOpenAddModal ==> ", isOpenAddModal);
  }, [isOpenAddModal]);
  return (
    <div className="shadow-sm bg-white rounded-lg p-24">
      <div className="flex items-center justify-between mb-20">
        <h5 className="text-title text-xl font-600 flex items-center gap-12">
          <PaymentCardIcon className="text-secondary" /> Payment Methods
        </h5>
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 whitespace-nowrap"
          aria-label="Add User"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
        >
          <PlusIcon color={theme.palette.secondary.main} className="shrink-0" />
          Add Card
        </Button>
      </div>
      <div className="flex justify-between flex-wrap gap-y-[32px]">
        {cardsData.map((card, index) => (
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
                    src="/assets/images/pages/billing/mastercard.svg"
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
                <div className="flex items-center gap-10 pe-20">
                  <IconButton className="shrink-0">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton className="shrink-0">
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddCard isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </div>
  );
}

export default PaymentMethods;

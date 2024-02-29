import { Button, useTheme } from "@mui/material";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { PaymentCardIcon } from "public/assets/icons/billingIcons";
import React from "react";

function PaymentMethods() {
  const theme = useTheme();
  return (
    <div>
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
          >
            <PlusIcon
              color={theme.palette.secondary.main}
              className="shrink-0"
            />
            Add Card
          </Button>
        </div>
        <div className="flex">
          <div className="p-16 pe-20 rounded-[10px] bg-bgGrey basis-1/2">
            <div className="w-[86px] h-[68px] rounded-8 bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;

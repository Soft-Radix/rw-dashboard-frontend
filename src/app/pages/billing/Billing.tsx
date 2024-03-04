import { Button, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import TitleBar from "src/app/components/TitleBar";
import BillingAddresses from "src/app/components/billings/billingAddress";
import BillingHistory from "src/app/components/billings/billingHistory";
import PaymentMethods from "src/app/components/billings/paymentMethods";

export default function Billing() {
  return (
    <div>
      <TitleBar title="Billing" />
      <div className="px-28 mb-[3rem]">
        <div className="shadow-sm bg-white rounded-lg p-24">
          <div className="flex flex-wrap items-center justify-between gap-12">
            <div>
              <h4 className="text-lg font-600 mb-8">
                Active until Dec 09, 2024
              </h4>
              <p className="text-para">
                We will send you a notification upon Subscription expiration
              </p>
            </div>
            <div className="flex gap-[18px]">
              <Button
                variant="outlined"
                color="secondary"
                className="h-[40px] text-[16px] flex gap-8 whitespace-nowrap"
                aria-label="Add User"
                size="large"
              >
                Cancel Subscription
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="h-[40px] text-[16px] flex gap-8 whitespace-nowrap"
                aria-label="Add User"
                size="large"
              >
                Upgrade Plan
              </Button>
            </div>
          </div>
          <div className="my-24">
            <h4 className="text-lg font-600 mb-8">
              <span className="text-secondary">$24.99</span> / Month
            </h4>
            <p className="text-para">
              We will send you a notification upon Subscription expiration
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-[3rem]">
            <div className="basis-full lg:basis-1/2 bg-bgGrey p-16 rounded-[10px] flex flex-col justify-center">
              <h4 className="font-500 text-title_light">
                Users 86 of 100 used
              </h4>
              <div className="h-4 rounded-[10px] bg-[#EDEDFC] mt-8 mb-6">
                <div className="w-[80%] h-full bg-secondary rounded-[10px]" />
              </div>
              <p className="text-para_light">
                14 Users remaining until your plan requires update
              </p>
            </div>
            <div className="basis-full lg:basis-1/2 bg-[#FFCE7166] py-16 px-20 rounded-[10px] border-2 border-dashed border-[#FFCE71]">
              <div className="h-full flex items-center gap-14">
                <span className="shrink-0">
                  <img
                    className="max-w-[5rem]"
                    src="/assets/images/pages/billing/warning_sign.svg"
                    alt="warning"
                  />
                </span>
                <div>
                  <h4 className="text-lg font-600 mb-4">
                    We need your attention
                  </h4>
                  <p className="text-para_light">
                    Your payment was declined. To start using tools, please{" "}
                    <span className="font-600 text-secondary underline cursor-pointer">
                      Add Payment Method.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------------------- Payment Methods ------------------------ */}
        <div className="my-24">
          <PaymentMethods />
        </div>
        <div className="my-24">
          <BillingAddresses />
        </div>
        <div className="my-24">
          <BillingHistory />
        </div>
      </div>
    </div>
  );
}

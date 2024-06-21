import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
// import { subscriptionDetails } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { EditIcon, LastPayment } from "public/assets/icons/common";
import { Timericon } from "public/assets/icons/subscription";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import TitleBar from "src/app/components/TitleBar";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import CancelButtonPage from "./CancelButtonPage";
import ItemTable from "./ItemTable";
import PaymentSubscriptio from "./PaymentSubscriptio";
import SubLogTable from "./SubLogTable";
import { subscriptionDetails } from "app/store/Client";
import { getAdjustedDate } from "src/utils";
import moment from "moment";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: 0 }}
    >
      {value === index && (
        <Box sx={{ paddingTop: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SubscriptionDetails() {
  const theme: Theme = useTheme();
  const { subscription_id } = useParams();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [value, setValue] = useState(0);
  const [rows, setRows] = useState<any>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!subscription_id) return null;

    const fetchData = async () => {
      try {
        const payload = {
          client_id: subscription_id,
        };
        //@ts-ignore
        const res = await dispatch(subscriptionDetails(payload));
        // setList(res?.payload?.data?.data?.list);
        setRows(res?.payload?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const StatusMapping = (status) => {
    if (status == 0) {
      return "Pending";
    } else if (status == 1) {
      return "Completed";
    } else if (status == 2) {
      return "Paused";
    } else if (status == 3) {
      return "Expired";
    } else if (status == 4) {
      return "Cancelled";
    }
  };

  const FutureDate = getAdjustedDate(
    new Date(rows?.subscription_start_date),
    Number(rows?.billing_frequency)
  );

  const renderAddress = (row) => {
    // console.log(row, "rowssss");
    const addressComponents = [
      row?.address,
      row?.address2,
      row?.city,
      row?.state,
      row?.country,
      row?.zipcode,
    ].filter(Boolean); // Filter out any falsy values (null, undefined, empty string)

    return addressComponents.length > 0 ? addressComponents.join(", ") : "N/A";
  };

  console.log("======tytyty===", rows);
  return (
    <>
      <TitleBar title="Subscriptions Details"></TitleBar>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm py-[2rem]">
          <div className="flex items-center justify-between pb-12 px-20 ">
            <Typography className="text-[20px] font-600 text-[#0A0F18] w-full">
              Client Information
            </Typography>
            <div className="flex  flex-col sm:flex-row  w-full justify-end gap-20">
              <CancelButtonPage />
              <Button
                variant="outlined"
                color="secondary"
                className="font-600 text-[16px] px-44"
              >
                Pause
              </Button>
            </div>
          </div>
          <Box sx={{ width: "100%", padding: 2 }}>
            <Grid container className="h-auto p-0 mb-[30px] ">
              <Grid item xs={12} sm={12} md={12} className="p-0  ">
                <div className="flex flex-col  gap-10 bg-[#FFFFFF] h-auto rounded-12 ">
                  <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative ">
                    <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[126px] rounded-full overflow-hidden">
                      <img
                        src="/assets/images/avatars/male-21.jpg"
                        alt=""
                        className="h-[100px] w-[100px] rounded-full"
                      />
                    </div>
                    <div className="pt-20">
                      {/* <div className="flex rounded-full py-[1rem] px-[2rem] text-secondary bg-secondary_bg w-max gap-[20px] text-lg font-600 items-center absolute right-[2rem] top-[2rem]">
                        Edit
                        <EditIcon fill="#4F46E5" />
                      </div> */}

                      <div className="flex items-center gap-40 mb-10">
                        <span className="text-[24px] text-[#111827] font-semibold inline-block">
                          {rows?.userName ? rows?.userName : "N/A"}
                        </span>
                        <Button
                          variant="outlined"
                          className={`h-20 rounded-3xl  border-none sm:min-h-24 leading-none ${StatusMapping(
                            rows?.status
                          )}`}
                        >
                          {/* {`${
                            // rows?.status == 0 || rows?.status == 1 ? "In " : ""
                          } */}
                          {StatusMapping(rows?.status)}
                          {/* kkjkj */}
                        </Button>
                      </div>
                      <div className="flex text-[2rem] text-para_light flex-col sm:flex-row gap-8 ">
                        <div className="flex items-center pr-20 gap-2">
                          <span>
                            <Timericon />
                          </span>
                          <span>
                            {rows?.subscription_start_date
                              ? rows?.subscription_start_date
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex">
                          <img
                            src="../assets/icons/ic_outline-email.svg"
                            className="mr-4"
                          />
                          <span>{rows?.email ? rows?.email : "N/A"}</span>
                        </div>
                        <div className="flex items-center sm:px-20">
                          <span>
                            <img
                              src="../assets/icons/ph_phone.svg"
                              className="mr-4"
                            />{" "}
                          </span>
                          <span>
                            {rows?.phone_number ? rows?.phone_number : "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-baseline w-full py-20 gap-20 flex-col sm:flex-row">
                        <div className="flex flex-col items-start gap-14">
                          <span className="text-[1.8rem] text-title font-500">
                            Company Name
                          </span>
                          <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                            <img
                              src="../assets/icons/tech.svg"
                              className="mr-4"
                            />
                            <span>
                              {rows?.company_name ? rows?.company_name : "N/A"}
                            </span>
                          </span>
                        </div>
                        <div className="flex flex-col pr-10 gap-7 ">
                          <div className="flex flex-col items-start gap-14">
                            <span className="text-[1.8rem] text-title font-500">
                              Address
                            </span>
                            <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                              <img
                                src="../assets/icons/loaction.svg"
                                className="mr-4"
                              />
                              <p style={{ wordBreak: "break-all" }}>
                                {/* {accManagerDetail?.address || "N/A"} */}
                                {renderAddress(rows)}
                              </p>
                              <span>
                                {/* {rows?.address ? rows?.address : "N/A"} */}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item lg={12} className="basis-full mt-[30px]"></Grid>
            </Grid>
            <Typography
              variant="h6"
              className="mb-4 text-[20px] font-600 text-[#0A0F18] py-20 px-20"
            >
              Credit card
            </Typography>
            {/* <PaymentSubscriptio /> */}
            <Grid container spacing="26px" className="">
              <Grid item lg={6} className="basis-full">
                {" "}
                {/* <PaymentSubscriptio />
                 */}
                <div className=" ">
                  <div
                    className="p-16 pe-20 rounded-[10px] bg-bgGrey basis-full lg:basis-[calc(50%_-_16px)]"
                    // key={index}
                  >
                    {rows?.card ? (
                      <div className="flex items-center gap-[1.8rem]">
                        <div className="w-[86px] h-[68px] rounded-8 bg-white flex items-center justify-center shrink-0">
                          <img
                            src={`/assets/images/pages/billing/${
                              rows?.card == "visa"
                                ? "visa.svg"
                                : rows?.card == "mastercard"
                                  ? "mastercard.svg"
                                  : "card.svg"
                            }`}
                            className="max-w-[64px]"
                            alt={rows?.card}
                          />
                        </div>
                        <div className="flex items-start justify-between gap-10 grow">
                          <div>
                            <h4 className="text-title text-xl font-700 mb-8">
                              **** **** **** {rows?.card_last_digit}
                            </h4>
                            <p className="text-lg text-title_light">
                              {rows?.card}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item lg={6} className="basis-full">
                <Link to="/change-password" className="contents">
                  <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-bgGrey">
                    <div>
                      <Typography
                        component="h4"
                        className="mb-8 text-2xl text-title font-600"
                      >
                        Last payment amount and date
                      </Typography>
                      <p className="text-para_light">
                        <span className="text-secondary">
                          ${rows?.total_price}
                        </span>
                        , {rows?.subscription_start_date}
                      </p>
                    </div>
                    <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                      <LastPayment />
                    </div>
                  </div>
                </Link>
              </Grid>
              <Grid item lg={6} className="basis-full">
                <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-bgGrey ">
                  <div>
                    <Typography
                      component="h4"
                      className="mb-8 text-2xl text-title font-600"
                    >
                      Next payment amount and date
                    </Typography>
                    <p className="text-para_light">
                      <span className="text-secondary">
                        ${rows?.total_price},{" "}
                      </span>
                      {!FutureDate ? "Paid" : moment(FutureDate).format("LL")}
                    </p>
                  </div>
                  <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                    <LastPayment />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <ItemTable rows={rows} />
      <SubLogTable />
      <AddAgentModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isEditing={false}
      />
    </>
  );
}

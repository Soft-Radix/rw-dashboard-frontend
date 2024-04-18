import React from 'react'
import { Button, Box, Grid, Checkbox, Typography, TableCell, Tab, Tabs, TableRow, Theme, IconButton } from "@mui/material";
import { ArrowRightCircleIcon, EditIcon, LastPayment } from 'public/assets/icons/common';
import { Link } from 'react-router-dom';

interface ProfileProps {
    setIsOpenEditModal: (prev: boolean) => void,
    setIsOpenChangePassModal: (prev: boolean) => void,

}
export default function Profile({ setIsOpenEditModal,
    setIsOpenChangePassModal }: ProfileProps) {
    return (
        <>
            <Grid container className="h-auto p-0 mb-[30px] px-[2rem]">
                <Grid item xs={12} sm={12} md={12} className="p-0 ">
                    <div className="flex flex-col  gap-10 bg-[#FFFFFF] h-auto rounded-12 ">
                        <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative">
                            <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[126px] rounded-full overflow-hidden">
                                <img
                                    src="/assets/images/avatars/male-21.jpg"
                                    alt=""
                                    className="h-[100px] w-[100px] rounded-full"
                                />
                            </div>
                            <div className="pt-20">
                                <div className="edit_profile_btn"
                                    onClick={() => setIsOpenEditModal(true)}
                                >
                                    Edit
                                    <EditIcon fill="#4F46E5" />
                                </div>

                                <div className="flex items-center gap-40 mb-10">

                                    <span className="text-[24px] text-[#111827] font-semibold inline-block">
                                        Alexandra
                                    </span>
                                    <Button
                                        variant="outlined"
                                        className="h-20 rounded-3xl  text-[#FF5F15] bg-[#ffe2d5] border-none sm:min-h-24 leading-none"
                                    >
                                        In Progress
                                    </Button>
                                </div>
                                <div className="flex text-[2rem] text-para_light ">
                                    <div className="flex">
                                        <img src="../assets/icons/ic_outline-email.svg" className="mr-4" />
                                        <span >
                                            info456@gmail.com
                                        </span>
                                    </div>
                                    <div className="flex items-center px-20">
                                        <span><img src="../assets/icons/ph_phone.svg" className="mr-4" /> </span>
                                        <span>+1 2513652150</span>
                                    </div>
                                </div>

                                <div className="flex items-baseline justify-between w-full py-20 gap-31">
                                    <div className="flex flex-col pr-10 gap-7 ">
                                        <span className="text-[1.8rem] text-title font-500 w-max">Status</span>
                                        <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex " >
                                            <img src="../assets/icons/circle.svg" className="mr-4" />
                                            Active
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-start w-8/12 gap-7">
                                        <span className="text-[1.8rem] text-title font-500">Company Name</span>
                                        <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex " >
                                            <img src="../assets/icons/tech.svg" className="mr-4" />
                                            Tech 23.com
                                        </span>
                                    </div>

                                </div>
                                <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31">
                                    <div className="flex flex-col pr-10 gap-7 ">
                                        <span className="text-[1.8rem] text-title font-500 w-max">Address</span>
                                        <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex " >
                                            <img src="../assets/icons/loaction.svg" className="mr-4" />
                                            Akshya Nagar 1st Block 1st Cross, Rammurthy, Bangalore-560016
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid item lg={12} className="basis-full mt-[30px]">
                    <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-secondary_bg">
                        <div className="flex gap-[20px] items-end justify-center">
                            <div className="bg-secondary h-[54px] w-[54px] min-w-[54px] rounded-8 flex items-center justify-center"><img src="../assets/icons/lock.svg" /></div>
                            <div>
                                <Typography
                                    component="h4"
                                    className="mb-8 text-2xl text-title font-600"
                                >
                                    Change Password
                                </Typography>
                                <p className="text-para_light">
                                    For security purposes, if you wish to change your password, please click here to change.
                                </p>
                            </div>
                        </div>
                        <div className="shrink-0 w-[5rem] aspect-square flex items-center  justify-center cursor-pointer rounded-lg border-borderColor"
                            onClick={() => setIsOpenChangePassModal(true)}
                        >
                            <ArrowRightCircleIcon />
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing="26px" className="px-[2rem]">
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
                                    <span className="text-secondary">$230</span>, Feb 23, 2024
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
                                <span className="text-secondary">$230</span>, Feb 23, 2024
                            </p>
                        </div>
                        <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                            <LastPayment />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}


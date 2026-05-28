import { FaMale, FaFemale, FaChild, FaHome, FaTshirt, } from "react-icons/fa";
import { GiLargeDress, GiAmpleDress, } from "react-icons/gi";
import { TbJacket } from "react-icons/tb";
import { MdCheckroom, MdOutlineBedroomChild, } from "react-icons/md";
import { PiShirtFoldedFill, } from "react-icons/pi";

export const MENUDATA = [
    {
        name: "Men",
        icons: <FaMale />,
        dropdownMenu: [
            {
                name: "TopWear",
                icons: <FaTshirt />,
                list: [
                    {name: "T-shirt",slug: "/t-shirt",icons: <PiShirtFoldedFill />,},
                    {name: "T-shirt",slug: "/t-shirt",icons: <PiShirtFoldedFill />,},
                    {name: "T-shirt",slug: "/t-shirt",icons: <PiShirtFoldedFill />,},
                    {name: "T-shirt",slug: "/t-shirt",icons: <PiShirtFoldedFill />,},
                    {name: "T-shirt",slug: "/t-shirt",icons: <PiShirtFoldedFill />,},
                    {
                        name: "Casual Shirts",
                        slug: "/casual-shirts",
                        icons: <MdCheckroom />,
                    },
                    {
                        name: "Formal Shirts",
                        slug: "/formal-shirts",
                        icons: <MdCheckroom />,
                    },
                    {
                        name: "Jacket",
                        slug: "/jacket",
                        icons: <TbJacket />,
                    },
                    {
                        name: "Suits",
                        slug: "/suits",
                        icons: <FaMale />,
                    },
                ],
            },
        ],
    },

    {
        name: "Women",
        icons: <FaFemale />,
        dropdownMenu: [
            {
                name: "Ethnic Wear",
                icons: <GiLargeDress />,
                list: [
                    {
                        name: "Kurtis",
                        slug: "/kurtis",
                        icons: <GiAmpleDress />,
                    },
                    {
                        name: "Sarees",
                        slug: "/sarees",
                        icons: <GiLargeDress />,
                    },
                ],
            },
        ],
    },

    {
        name: "Kids",
        icons: <FaChild />,
        dropdownMenu: [
            {
                name: "Kids Wear",
                icons: <MdOutlineBedroomChild />,
                list: [
                    {
                        name: "Boys Clothing",
                        slug: "/boys",
                        icons: <FaMale />,
                    },
                    {
                        name: "Girls Clothing",
                        slug: "/girls",
                        icons: <FaFemale />,
                    },
                ],
            },
        ],
    },

    {
        name: "Home & Living",
        icons: <FaHome />,
        dropdownMenu: [
            {
                name: "Home Decor",
                icons: <FaHome />,
                list: [
                    {
                        name: "Bedsheets",
                        slug: "/bedsheets",
                        icons: <FaHome />,
                    },
                    {
                        name: "Curtains",
                        slug: "/curtains",
                        icons: <FaHome />,
                    },
                ],
            },
        ],
    },
];
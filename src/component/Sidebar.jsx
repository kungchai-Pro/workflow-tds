import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaFileInvoice,
    FaFileSignature,
    FaAlignLeft,
    FaExclamationTriangle,
    FaFileImport,
    FaTasks,
    FaFileMedical
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    var IsUstate = sessionStorage.getItem("Ustate");
    var menuItem = [];
    if (IsUstate == 1) {
        menuItem = [
            {
                path: "/home",
                name: "หน้าหลัก",
                icon: <FaTh />
            },
            {
                path: "/ListjournalPrepress",
                name: "สถานะงาน ",
                icon: <FaAlignLeft />
            },
            {
                path: "/Groupdepartment",
                name: "รอตรวจสอบ",
                icon: <FaTasks />
            },
            {
                path: "/JournalListnew",
                name: "รายงานใหม่",
                icon: <FaFileInvoice />
            }, {
                path: "/CreateJournal",
                name: "สร้างเอกสาร",
                icon: <FaFileSignature />
            },

        ]
    }
    else if (IsUstate == 2) {
        menuItem = [
            {
                path: "/home",
                name: "หน้าหลัก",
                icon: <FaTh />
            },
            {
                path: "/Groupdepartment",
                name: "รอดำเนินการ",
                icon: <FaAlignLeft />
            },
            {
                path: "/JournalTosend",
                name: "รอตรวจสอบ",
                icon: <FaTasks />
            },
            {
                path: "/StatusflowReject",
                name: "รายการแจ้งแก้ไข",
                icon: <FaExclamationTriangle />
            },

            {
                path: "/StatusflowReceive",
                name: "รายงานใหม่",
                icon: <FaFileImport />
            },
            {
                path: "/createCansizeType",
                name: "New Cansize",
                icon: <FaFileMedical />
            }

        ]
    }
    else if (IsUstate == 3) {
        menuItem = [
            {
                path: "/home",
                name: "หน้าหลัก",
                icon: <FaTh />
            },
            {
                path: "/Groupdepartment",
                name: "สถานะดำเนินการ",
                icon: <FaAlignLeft />
            },
            {
                path: "/JournalTosend",
                name: "รอนุมัติ",
                icon: <FaTasks />
            },
            {
                path: "/StatusflowReject",
                name: "รายการแจ้งแก้ไข",
                icon: <FaExclamationTriangle />
            },
            {
                path: "/StatusflowReceive",
                name: "รายงานใหม่",
                icon: <FaFileImport />
            },
        ]
    }
    else if (IsUstate >= 4) {
        menuItem = [
            {
                path: "/home",
                name: "หน้าหลัก",
                icon: <FaTh />
            },
            {
                path: "/Groupdepartment",
                name: "สถานะดำเนินการ",
                icon: <FaAlignLeft />
            },
            {
                path: "/JournalTosend",
                name: "รอนุมัติ",
                icon: <FaTasks />
            },
            {
                path: "/StatusflowReceive",
                name: "รายงานใหม่",
                icon: <FaFileImport />
            },


        ]
    }


    return (
        <div className="container-sidebar">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
                        <img src={require('../img/30516.jpg')} style={{ width: '100%', height: 'auto', borderRadius: 3 }} /></h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminRoute from "./../../Route/RouteDetails";
// import logo from "./../../assets/images/logo.png";
import profilePhoto from "../../assets/images/profile.png";
import API from "../../Api/Api";
import { useDispatch } from "react-redux";
import { NavbarMenuData } from "../../Redux/slice";
import logo1 from "./../../assets/images/logo1.png";
import profileImg from "./../../assets/images/profileu.png";
import Dropdown from "react-bootstrap/Dropdown";
import MenuNavbar from "./Navbar/MenuNavbar";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";

// import notificationImg from "../../assets/images/Notific.png";

// const AppLayout = React.memo(function AppLayout(props) {

const AppLayout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  // console.log("TajurbaAdmin_priviledge_data", TajurbaAdmin_priviledge_data);

  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("TajurbaAdminToken");
    localStorage.removeItem("TajurbaAdminUser");
    localStorage.removeItem("TajurbaAdmin_priviledge_data");
    localStorage.removeItem("userLocation");
    localStorage.removeItem("attendanceStatus");
    navigate(`../${AdminRoute?.Auth?.Login}`);
  };

  // Try
  // const items = [
  //   {
  //     key: "1",
  //     icon: <AppstoreOutlined />,
  //     // label: "Dashboard",
  //     path: "/dashboard",
  //     label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
  //   },

  //   {
  //     key: "2",
  //     className: "navLi",
  //     icon: <AppstoreOutlined />,
  //     label: "Content Creation",
  //     style: { paddingLeft: "0px" },
  //     children: [
  //       {
  //         key: "21",
  //         label: "Creator",
  //         className: "subUl",
  //         style: { paddingLeft: "0px" },
  //         // style: "padding-left:0px !important",
  //         children: [
  //           {
  //             key: "211",
  //             className: "subUlLi",
  //             //label: "Create New",
  //             path: "/create-new-content-creation",
  //             label: (
  //               <NavLink to={"/create-new-content-creation"}>
  //                 Create New
  //               </NavLink>
  //             ),
  //           },
  //           {
  //             key: "212",
  //             className: "subUlLi",
  //             // label: "Draft",
  //             path: "/draft",
  //             label: <NavLink to={"/draft"}>Draft</NavLink>,
  //           },
  //           {
  //             key: "213",
  //             className: "subUlLi",
  //             // label: "Submitted",
  //             path: "/submitted",
  //             label: <NavLink to={"/submitted"}>Submitted</NavLink>,
  //           },
  //         ],
  //       },
  //       {
  //         key: "22",
  //         // label: "Moderator",
  //         className: "subUlModerator",
  //         path: "/moderator",
  //         label: (
  //           <NavLink style={{ display: "block" }} to={"/moderator"}>
  //             Moderator
  //           </NavLink>
  //         ),
  //         children: [],
  //       },
  //     ],
  //   },
  //   {
  //     key: "3",
  //     icon: <AppstoreOutlined />,
  //     label: "Community",

  //     className: "navLi",
  //     style: { paddingLeft: "0px" },
  //     children: [
  //       {
  //         // key: "31",
  //         // label: "Community",
  //         // className: "subUl",
  //         // path: "/community",
  //         // label: <NavLink to={"/community"}>Community</NavLink>,
  //         key: "31",
  //         // label: "Moderator",
  //         className: "subUlModerator",
  //         path: "/community",
  //         label: (
  //           <NavLink style={{ display: "block" }} to={"/community"}>
  //             Community
  //           </NavLink>
  //         ),
  //         children: [],
  //       },
  //       {
  //         key: "32",
  //         // label: "Activity Management",
  //         className: "subUlModerator",
  //         path: "/activity-management",
  //         label: (
  //           <NavLink style={{ display: "block" }} to={"/activity-management"}>
  //             Activity Management
  //           </NavLink>
  //         ),
  //         children: [],
  //       },
  //     ],
  //   },
  //   {
  //     key: "4",
  //     icon: <AppstoreOutlined />,
  //     // label: "Subscription Plans",
  //     path: "/subscription-plans",
  //     label: <NavLink to={"/subscription-plans"}>Subscription Plans</NavLink>,
  //   },
  //   {
  //     key: "5",
  //     icon: <AppstoreOutlined />,
  //     className: "navLi",
  //     label: "User Management",
  //     style: { paddingLeft: "0px" },
  //     children: [
  //       {
  //         key: "51",
  //         // label: "Consumer",
  //         className: "subUlModerator",
  //         path: "/consumers",
  //         label: (
  //           <NavLink style={{ display: "block" }} to={"/consumers"}>
  //             Consumer
  //           </NavLink>
  //         ),
  //         children: [],
  //       },
  //       {
  //         key: "52",
  //         // label: "My Team",
  //         path: "/my-team",
  //         className: "subUlModerator",
  //         label: (
  //           <NavLink style={{ display: "block" }} to={"/my-team"}>
  //             My Team
  //           </NavLink>
  //         ),
  //         children: [],
  //       },
  //       {
  //         key: "53",
  //         // label: "Roles",
  //         path: "/roles",
  //         className: "subUlModerator",
  //         label: (
  //           <NavLink style={{ display: "block" }} to={"/roles"}>
  //             Roles
  //           </NavLink>
  //         ),
  //         children: [],
  //       },
  //     ],
  //   },
  //   {
  //     key: "6",
  //     icon: <AppstoreOutlined />,
  //     // label: "Events",
  //     path: "/events",
  //     label: <NavLink to={"/events"}>Events</NavLink>,
  //   },
  //   {
  //     key: "7",
  //     icon: <AppstoreOutlined />,
  //     // label: "Events",
  //     path: "/feed",

  //     label: <NavLink to={"/feed"}>Feed</NavLink>,
  //   },
  //   {
  //     key: "8",
  //     icon: <AppstoreOutlined />,
  //     // label: "All Transactions",
  //     path: "/all-transactions",
  //     label: <NavLink to={"/all-transactions"}>All Transactions</NavLink>,
  //   },
  // ];

  const items = [
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Dashboard" && ele?.is_active
        ).map((ele, index) => ({
          key: "1",
          icon: <AppstoreOutlined />,
          path: "/dashboard",
          label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
        }))
      : []),

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Leave Management" && ele?.is_active
        ).map((ele, index) => ({
          key: "2",
          className: "navLi",
          icon: <AppstoreOutlined />,
          label: "Leave Management",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Create Leave" &&
                      submenuItem?.is_active
                  )
                  // .map((submenuItem, submenuItemIndex) => ({
                  //   key: "21",
                  //   label: "Creator",
                  //   className: "subUl",
                  //   style: { paddingLeft: "0px" },
                  //   // children: [
                  //   //   ...(submenuItem &&
                  //   //   submenuItem?.submenuChild &&
                  //   //   submenuItem?.submenuChild?.length &&
                  //   //   submenuItem?.submenuChild[0]?.is_active
                  //   //     ? {
                  //   //         key: "211",
                  //   //         className: "subUlLi",
                  //   //         path: "/create-new-content-creation",
                  //   //         label: (
                  //   //           <NavLink to="/create-new-content-creation">
                  //   //             Create New
                  //   //           </NavLink>
                  //   //         ),
                  //   //       }
                  //   //     : []),
                  //   //   ...(submenuItem &&
                  //   //   submenuItem?.submenuChild &&
                  //   //   submenuItem?.submenuChild?.length &&
                  //   //   submenuItem?.submenuChild[1]?.is_active
                  //   //     ? {
                  //   //         key: "212",
                  //   //         className: "subUlLi",
                  //   //         path: "/draft",
                  //   //         label: <NavLink to="/draft">Draft</NavLink>,
                  //   //       }
                  //   //     : []),
                  //   //   ...(submenuItem &&
                  //   //   submenuItem?.submenuChild &&
                  //   //   submenuItem?.submenuChild?.length &&
                  //   //   submenuItem?.submenuChild[2]?.is_active
                  //   //     ? {
                  //   //         key: "213",
                  //   //         className: "subUlLi",
                  //   //         path: "/submitted",
                  //   //         label: (
                  //   //           <NavLink to="/submitted">Submitted</NavLink>
                  //   //         ),
                  //   //       }
                  //   //     : []),
                  //   // ]
                  //   children: [
                  //     ...(submenuItem &&
                  //     submenuItem?.submenuChild &&
                  //     submenuItem?.submenuChild?.length &&
                  //     submenuItem?.submenuChild[0]?.is_active
                  //       ? [
                  //           {
                  //             key: "211",
                  //             className: "subUlLi",
                  //             path: "/create-new-content-creation",
                  //             label: (
                  //               <NavLink to="/create-new-content-creation">
                  //                 Create New
                  //               </NavLink>
                  //             ),
                  //           },
                  //         ]
                  //       : []),
                  //     ...(submenuItem &&
                  //     submenuItem?.submenuChild &&
                  //     submenuItem?.submenuChild?.length &&
                  //     submenuItem?.submenuChild[1]?.is_active
                  //       ? [
                  //           {
                  //             key: "212",
                  //             className: "subUlLi",
                  //             path: "/draft",
                  //             label: <NavLink to="/draft">Draft</NavLink>,
                  //           },
                  //         ]
                  //       : []),
                  //     ...(submenuItem &&
                  //     submenuItem?.submenuChild &&
                  //     submenuItem?.submenuChild?.length &&
                  //     submenuItem?.submenuChild[2]?.is_active
                  //       ? [
                  //           {
                  //             key: "213",
                  //             className: "subUlLi",
                  //             path: "/submitted",
                  //             label: (
                  //               <NavLink to="/submitted">Submitted</NavLink>
                  //             ),
                  //           },
                  //         ]
                  //       : []),
                  //   ],
                  // }))
                  .map((submenuItem) => ({
                    key: "21",
                    // label: "Moderator",
                    className: "subUlModerator",
                    path: "/create-leave",
                    label: (
                      <NavLink style={{ display: "block" }} to="/create-leave">
                        Create Leave
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Leave Credits" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "22",
                    // label: "Moderator",
                    className: "subUlModerator",
                    path: "/leave-credit-create",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/leave-credit-create"}
                      >
                        Leave Credits
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),

    ////

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Community" && ele?.is_active
        ).map((ele, index) => ({
          key: "3",
          icon: <AppstoreOutlined />,
          label: "Community",

          className: "navLi",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Community" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "31",
                    className: "subUlModerator",
                    path: "/community",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/community"}>
                        Community
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Activity Management" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "32",
                    // label: "Activity Management",
                    className: "subUlModerator",
                    path: "/activity-management",
                    label: (
                      <NavLink
                        style={{ display: "block" }}
                        to={"/activity-management"}
                      >
                        Activity Management
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),

    ///

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Apply Leave" && ele?.is_active
        ).map((ele, index) => ({
          key: "4",
          icon: <AppstoreOutlined />,
          // label: "Subscription Plans",
          path: "/leave-apply",
          label: <NavLink to={"/leave-apply"}>Leave</NavLink>,
        }))
      : []),

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "User Management" && ele?.is_active
        ).map((ele, index) => ({
          key: "5",
          icon: <AppstoreOutlined />,
          className: "navLi",
          label: "User Management",
          style: { paddingLeft: "0px" },
          children: [
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Consumer" &&
                      submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "51",
                    // label: "Consumer",
                    className: "subUlModerator",
                    path: "/consumers",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/consumers"}>
                        Consumer
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "My Team" && submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "52",
                    // label: "My Team",
                    path: "/my-team",
                    className: "subUlModerator",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/my-team"}>
                        Create User
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
            ...(ele && ele?.submenu?.length
              ? ele?.submenu
                  .filter(
                    (submenuItem) =>
                      submenuItem?.title === "Roles" && submenuItem?.is_active
                  )
                  .map((submenuItem) => ({
                    key: "53",
                    // label: "Roles",
                    path: "/roles",
                    className: "subUlModerator",
                    label: (
                      <NavLink style={{ display: "block" }} to={"/roles"}>
                        Roles
                      </NavLink>
                    ),
                    children: [],
                  }))
              : []),
          ],
        }))
      : []),
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Events" && ele?.is_active
        ).map((ele, index) => ({
          key: "6",
          icon: <AppstoreOutlined />,
          // label: "Events",
          path: "/events",
          label: <NavLink to={"/events"}>Events</NavLink>,
        }))
      : []),
    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "Create Holiday" && ele?.is_active
        ).map((ele, index) => ({
          key: "7",
          icon: <AppstoreOutlined />,
          // label: "Events",
          path: "/create-holiday",

          label: <NavLink to={"/create-holiday"}>Create Holiday</NavLink>,
        }))
      : []),

    ...(TajurbaAdmin_priviledge_data
      ? TajurbaAdmin_priviledge_data?.filter(
          (ele) => ele?.title === "All Transactions" && ele?.is_active
        ).map((ele, index) => ({
          key: "8",
          icon: <AppstoreOutlined />,
          // label: "All Transactions",
          path: "/all-transactions",
          label: <NavLink to={"/all-transactions"}>All Transactions</NavLink>,
        }))
      : []),

    // ...(TajurbaAdmin_priviledge_data
    //   ? TajurbaAdmin_priviledge_data?.filter(
    //       (ele) => ele?.title === "Leave Management" && ele?.is_active
    //     ).map((ele, index) => ({
    //       key: "2",
    //       className: "navLi",
    //       icon: <AppstoreOutlined />,
    //       label: "Leave Management",
    //       style: { paddingLeft: "0px" },
    //       children: [
    //         ...(ele && ele?.submenu?.length
    //           ? ele?.submenu
    //               .filter(
    //                 (submenuItem) =>
    //                   submenuItem?.title === "Create" && submenuItem?.is_active
    //               )
    //               .map((submenuItem, submenuItemIndex) => ({
    //                 key: "21",
    //                 label: "Create",
    //                 className: "subUl",
    //                 style: { paddingLeft: "0px" },
    //                 children: [
    //                   ...(submenuItem &&
    //                   submenuItem?.submenuChild &&
    //                   submenuItem?.submenuChild?.length &&
    //                   submenuItem?.submenuChild[0]?.is_active
    //                     ? [
    //                         {
    //                           key: "211",
    //                           className: "subUlLi",
    //                           path: "/create-new-content-creation",
    //                           label: (
    //                             <NavLink to="/create-new-content-creation">
    //                               Create New
    //                             </NavLink>
    //                           ),
    //                         },
    //                       ]
    //                     : []),
    //                   ...(submenuItem &&
    //                   submenuItem?.submenuChild &&
    //                   submenuItem?.submenuChild?.length &&
    //                   submenuItem?.submenuChild[1]?.is_active
    //                     ? [
    //                         {
    //                           key: "212",
    //                           className: "subUlLi",
    //                           path: "/draft",
    //                           label: <NavLink to="/draft">Draft</NavLink>,
    //                         },
    //                       ]
    //                     : []),
    //                   ...(submenuItem &&
    //                   submenuItem?.submenuChild &&
    //                   submenuItem?.submenuChild?.length &&
    //                   submenuItem?.submenuChild[2]?.is_active
    //                     ? [
    //                         {
    //                           key: "213",
    //                           className: "subUlLi",
    //                           path: "/submitted",
    //                           label: (
    //                             <NavLink to="/submitted">Submitted</NavLink>
    //                           ),
    //                         },
    //                       ]
    //                     : []),
    //                 ],
    //               }))
    //           : []),
    //         ...(ele && ele?.submenu?.length
    //           ? ele?.submenu
    //               .filter(
    //                 (submenuItem) =>
    //                   submenuItem?.title === "Credit" &&
    //                   submenuItem?.is_active
    //               )
    //               .map((submenuItem) => ({
    //                 key: "22",
    //                 // label: "Moderator",
    //                 className: "subUlModerator",
    //                 path: "/credit",
    //                 label: (
    //                   <NavLink style={{ display: "block" }} to={"/credit"}>
    //                     Credit
    //                   </NavLink>
    //                 ),
    //                 children: [],
    //               }))
    //           : []),
    //       ],
    //     }))
    //   : []),
  ];
  console.log(items);

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  function searchItemByPath(items, path) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = searchItemByPath(item.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  const searchTerm = "/" + location.pathname.split("/")?.[1];
  const result = searchItemByPath(items, searchTerm);

  //console.log("result", result, result?.key);

  function getMenuKeys(key) {
    //console.log("key", key);
    let group = key.slice(0, -1);
    let resultForMenus = [];
    do {
      resultForMenus.push(group);
      group = group.slice(0, -1);
      // console.log("group", group);
    } while (group != "");
    return resultForMenus;
  }

  const openKey = result ? getMenuKeys(result?.key?.toString()) : [""];

  const defaultSelectedKeys = [result?.key?.toString()];
  // console.log("openKey", openKey);

  const ShowMenubar = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState([
      localStorage.getItem("stateOpenKeys"),
    ]);
    const [selectedMenu, setSelectedMenu] = useState(
      localStorage.getItem("selectedMenu")
    );

    useEffect(() => {
      localStorage.setItem("selectedMenu", selectedMenu);
      //  console.log("selectedMenu", selectedMenu);
    }, [selectedMenu]);

    useEffect(() => {
      localStorage.setItem("stateOpenKeys", stateOpenKeys);
      // console.log("stateOpenKeys", stateOpenKeys);
    }, [stateOpenKeys]);

    const levelKeys = getLevelKeys(items);

    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(
        (key) => stateOpenKeys.indexOf(key) === -1
      );
      if (latestOpenKey) {
        const keys = stateOpenKeys.concat(latestOpenKey);
        setStateOpenKeys(keys);
        localStorage.setItem("stateOpenKeys", keys);
      } else {
        setStateOpenKeys([]);
      }
    };

    return (
      <Menu
        mode="inline"
        defaultOpenKeys={openKey}
        defaultSelectedKeys={defaultSelectedKeys}
        // defaultOpenKeys={["2", "3", "3", "5"]}
        // openKeys={stateOpenKeys}
        items={items}
        onOpenChange={onOpenChange}
        style={
          {
            // width: 256,
          }
        }
      ></Menu>
    );
  };

  return (
    <>
      <body data-layout="detached" data-topbar="colored">
        <div className="container-fluid">
          <div id="layout-wrapper">
            <header id="page-topbar">
              <div className="navbar-header">
                <div className="container-fluid">
                  <div className="float-end">
                    <div className="dropdown d-inline-block d-lg-none ms-2">
                      <button
                        type="button"
                        className="btn header-item noti-icon waves-effect"
                        id="page-header-search-dropdown"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="mdi mdi-magnify" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-search-dropdown"
                      >
                        <form className="p-3">
                          <div className="m-0">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search ..."
                                aria-label="Recipient's username"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  <i className="mdi mdi-magnify" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="dropdown d-inline-block notificatiDropdown">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          className="btn header-item noti-icon me-2"
                        >
                          <i className="fa fa-solid fa-bell notificationBellIcon"></i>
                        </Dropdown.Toggle>
                        {/* <Dropdown.Menu>
                                       <div className="p-3 orangrBg">
                                          <div className="row align-items-center">
                                             <div className="col">
                                                <h5 className="m-0 textBlack fw-bold">Notifications</h5>
                                             </div>
                                             <div className="col-auto">
                                                <a href="#!" className="small textBlack">
                                                   View All
                                                </a>
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div className="notification-text p-3 pb-0">
                                             <div className="d-flex align-items-start">
                                                <div className="avatar-xs me-3">
                                                   <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                   
                                                      <img src="" className="img-fluid notificatonImgStyle" />
                                                   </span>
                                                </div>
                                                <div className="flex-1">
                                                   <div className="font-size-12 text-muted">
                                                      <p className="mb-1">
                                                         Lorem ipsum dolor sit amet elit porttitor, consectetur adipiscing elit.
                                                         Aenean porttitor massa justo.
                                                      </p>
                                                      <small>2 week ago</small>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="row d-flex justify-content-end">
                                                <NavLink to="/" className="btn w-auto me-4 notificationBtn">
                                                   Read More
                                                </NavLink>
                                             </div>
                                             <hr />
                                          </div>

                                          <div className="notification-text p-3 pb-0">
                                             <div className="d-flex align-items-start">
                                                <div className="avatar-xs me-3">
                                                   <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                      <img src="" className="img-fluid notificatonImgStyle" />
                                                   </span>
                                                </div>
                                                <div className="flex-1">
                                                   <div className="font-size-12 text-muted">
                                                      <p className="mb-1">
                                                         Lorem ipsum dolor sit amet elit porttitor, consectetur adipiscing elit.
                                                         Aenean porttitor massa justo.
                                                      </p>
                                                      <small>2 week ago</small>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="row d-flex justify-content-end">
                                                <NavLink to="/" className="btn w-auto me-4 notificationBtn">
                                                   Read More
                                                </NavLink>
                                             </div>
                                             <hr />
                                          </div>

                                          <div className="notification-text p-3 pb-0">
                                             <div className="d-flex align-items-start">
                                                <div className="avatar-xs me-3">
                                                   <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                      <img src="" className="img-fluid notificatonImgStyle" />
                                                   </span>
                                                </div>
                                                <div className="flex-1">
                                                   <div className="font-size-12 text-muted">
                                                      <p className="mb-1">
                                                         Lorem ipsum dolor sit amet elit porttitor, consectetur adipiscing elit.
                                                         Aenean porttitor massa justo.
                                                      </p>
                                                      <small>2 week ago</small>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="row d-flex justify-content-end">
                                                <NavLink to="/" className="btn w-auto me-4 notificationBtn">
                                                   Read More
                                                </NavLink>
                                             </div>
                                             <hr />
                                          </div>
                                       </div>
                                    </Dropdown.Menu> */}
                      </Dropdown>
                    </div>

                    <div className="dropdown d-inline-block">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          className="p-0 border-0"
                        >
                          <img
                            className="rounded-circle header-profile-user"
                            src={adminObject?.image || profilePhoto}
                            alt="Header Avatar"
                          />
                          <span className="d-none d-xl-inline-block ms-1 profileBg">
                            My Profile
                            <i className="fa fa-thin fa-chevron-down d-none d-xl-inline-block ms-2"></i>
                          </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="px-5 py-3">
                          <div className="avtarProfile text-center">
                            <img
                              src={adminObject?.image || profilePhoto}
                              alt=""
                              className="avatar-md mx-auto rounded-circle"
                            />
                            <h5 className="mb-0 mt-4 textBlack fw-bold">
                              {adminObject?.first_name}
                            </h5>
                            <small className="greyLight">
                              {adminObject?.role_details?.name}
                            </small>
                            <br />
                            <NavLink
                              // to="/my-profile"
                              to={`../${AdminRoute?.MyProfile?.MyProfile?.replace(
                                ":id",
                                adminObject?.user_id
                              )}`}
                              className="btn profileBtn rounded-pill mt-4 font-size-12"
                            >
                              View Profile
                            </NavLink>
                          </div>
                          <span
                            onClick={() => {
                              handleClickLogout();
                            }}
                            className="dropdown-item mt-3 text-center defaultGrey"
                          >
                            <svg
                              width="15.534"
                              height="15.476"
                              viewBox="0 0 15.534 15.476"
                              className="me-2"
                            >
                              <g
                                id="Group_14167"
                                data-name="Group 14167"
                                transform="translate(7637.795 -13948)"
                              >
                                <path
                                  id="Path_10393"
                                  data-name="Path 10393"
                                  d="M0,1.672C.024,1.581.047,1.49.073,1.4A1.907,1.907,0,0,1,1.859.008C3.815,0,5.771,0,7.727,0a.628.628,0,0,1,.655.616.637.637,0,0,1-.6.666,2.009,2.009,0,0,1-.212.008q-2.744,0-5.489,0a1.259,1.259,0,0,0-.343.038.6.6,0,0,0-.433.559c0,.055,0,.111,0,.167q0,5.679,0,11.357a1.091,1.091,0,0,0,.036.328.586.586,0,0,0,.531.428,2.133,2.133,0,0,0,.227.009H7.581a1.519,1.519,0,0,1,.316.024.643.643,0,0,1-.11,1.264c-.025,0-.05,0-.076,0-1.956,0-3.912,0-5.868-.007A1.913,1.913,0,0,1,.032,13.9.689.689,0,0,0,0,13.8V1.672"
                                  transform="translate(-7637.795 13948)"
                                  fill="#acaeaf"
                                />
                                <path
                                  id="Path_10394"
                                  data-name="Path 10394"
                                  d="M143.908,88.675a1,1,0,0,1-.136-.1q-1.3-1.276-2.591-2.555a.666.666,0,0,1-.22-.7.643.643,0,0,1,.975-.358,1.352,1.352,0,0,1,.183.158l3.755,3.707a.666.666,0,0,1-.005,1.085c-1.248,1.232-2.5,2.459-3.741,3.7a.662.662,0,1,1-.912-.933c.866-.835,1.715-1.687,2.571-2.532.035-.034.067-.071.127-.135h-7.351a1.359,1.359,0,0,1-.3-.02.646.646,0,0,1-.484-.681.639.639,0,0,1,.6-.582c.075-.005.151-.006.227-.006h7.274l.034-.056"
                                  transform="translate(-7768.412 13866.363)"
                                  fill="#acaeaf"
                                />
                              </g>
                            </svg>
                            Log out
                          </span>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {/* LOGO */}
                    <div
                      className="navbar-brand-box me-0"
                      style={{ width: "fit-content" }}
                    >
                      <a href="index.html" className="logo logo-light">
                        <span className="log">
                          <img src={logo1} style={{ width: "40px" }} />
                        </span>
                      </a>
                    </div>
                    <h4 className="text-white mb-0">Mentify</h4>
                    <button
                      type="button"
                      className="btn btn-sm px-3 font-size-16 header-item toggle-btn waves-effect"
                      id="vertical-menu-btn"
                    >
                      <i className="fa fa-fw fa-bars" />
                    </button>
                  </div>
                </div>
              </div>
            </header>
            <div className="vertical-menu">
              <div className="">
                {/*- Sidemenu */}
                {/* Left Menu Start */}
                {/* <div id="sidebar-menu">
                           <ul className="metismenu list-unstyled mb-5" id="side-menu">
                              <li>
                                 <NavLink to="/dashboard" className="waves-effect activeSideTab">
                                    <span className="dashIcons me-3">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.4" viewBox="0 0 17.4 17.4">
                                          <path
                                             id="Icon_material-dashboard"
                                             data-name="Icon material-dashboard"
                                             d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                             transform="translate(-3.8 -2.8)"
                                             strokeWidth="1.4"
                                          />
                                       </svg>
                                    </span>
                                    <span>Dashboard</span>
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink className="has-arrow waves-effect">
                                    <div className="d-flex justify-content-between ">
                                       <div className="text-center">
                                          <span className="dashIcons me-3">
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="17.4"
                                                height="17.4"
                                                viewBox="0 0 17.4 17.4"
                                             >
                                                <path
                                                   id="Icon_material-dashboard"
                                                   data-name="Icon material-dashboard"
                                                   d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                                   transform="translate(-3.8 -2.8)"
                                                   strokeWidth="1.4"
                                                />
                                             </svg>
                                          </span>
                                          <span>Content Creation</span>
                                       </div>
                                       <i class="fa fa-thin fa-chevron-down"></i>
                                    </div>
                                 </NavLink>

                                 <ul className="me-xl-3">
                                    <li className="position-relative navbarLink navbarLink1">
                                       <NavLink className="orangrBg ms-3">
                                          <div
                                             className={`navbar-toggler ${
                                                expanded ? "collapsed d-flex justify-content-between " : ""
                                             }`}
                                             onClick={handleToggle}
                                          >
                                             Creator
                                             <i class="fa fa-solid fa-chevron-down"></i>
                                          </div>
                                       </NavLink>

                                       <ul className="subList" id="collapseExample1">
                                          <li className="mt-2">
                                             <NavLink to="/create-new-content-creation" className="orangrBg">
                                                Create New
                                             </NavLink>
                                          </li>
                                          <li>
                                             <NavLink to="/draft" className="">
                                                Draft
                                             </NavLink>
                                          </li>

                                          <li>
                                             <NavLink to="/submitted" className="">
                                                {" "}
                                                Submitted
                                             </NavLink>
                                          </li>
                                       </ul>
                                    </li>
                                    <li className="dropdown navbarLink navbarLink2">
                                       <NavLink to="/moderator" className=" ms-3">
                                          <div className="d-flex justify-content-between ">Moderator</div>
                                       </NavLink>
                                    </li>
                                 </ul>
                              </li>
                              <li>
                                 <NavLink to="/community" className="has-arrow waves-effect">
                                    <div className="d-flex justify-content-between ">
                                       <div className="text-center">
                                          <span className="dashIcons me-3">
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="17.4"
                                                height="17.4"
                                                viewBox="0 0 17.4 17.4"
                                             >
                                                <path
                                                   id="Icon_material-dashboard"
                                                   data-name="Icon material-dashboard"
                                                   d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                                   transform="translate(-3.8 -2.8)"
                                                   strokeWidth="1.4"
                                                />
                                             </svg>
                                          </span>
                                          <span>Community</span>
                                       </div>
                                       <i class="fa fa-thin fa-chevron-down"></i>
                                    </div>
                                 </NavLink>

                                 <ul className="me-xl-3">
                                    <li className="dropdown navbarLink navbarLink1">
                                       <NavLink to="/community" className="orangrBg ms-3">
                                          <div className="d-flex justify-content-between ">Community</div>
                                       </NavLink>
                                    </li>
                                    <li className="dropdown navbarLink navbarLink2">
                                       <NavLink to="/activity-management" className=" ms-3">
                                          <div className="d-flex justify-content-between ">Activity Management</div>
                                       </NavLink>
                                    </li>
                                 </ul>
                              </li>
                              <li>
                                 <NavLink to="/subscription-plans" className="has-arrow waves-effect">
                                    <span className="dashIcons me-3">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.4" viewBox="0 0 17.4 17.4">
                                          <path
                                             id="Icon_material-dashboard"
                                             data-name="Icon material-dashboard"
                                             d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                             transform="translate(-3.8 -2.8)"
                                             strokeWidth="1.4"
                                          />
                                       </svg>
                                    </span>
                                    <span>Subscription Plans</span>
                                 </NavLink>
                              </li>

                              <li>
                                 <NavLink to="/consumers" className="has-arrow waves-effect">
                                    <div className="d-flex justify-content-between ">
                                       <div className="text-center">
                                          <span className="dashIcons me-3">
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="17.4"
                                                height="17.4"
                                                viewBox="0 0 17.4 17.4"
                                             >
                                                <path
                                                   id="Icon_material-dashboard"
                                                   data-name="Icon material-dashboard"
                                                   d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                                   transform="translate(-3.8 -2.8)"
                                                   strokeWidth="1.4"
                                                />
                                             </svg>
                                          </span>
                                          <span>User Management</span>
                                       </div>
                                       <i class="fa fa-thin fa-chevron-down"></i>
                                    </div>
                                 </NavLink>

                                 <ul className="me-xl-3">
                                    <li className="dropdown navbarLink navbarLink1">
                                       <NavLink to="/consumers" className="orangrBg ms-3">
                                          <div className="d-flex justify-content-between ">Consumers</div>
                                       </NavLink>
                                    </li>
                                    <li className="dropdown navbarLink navbarLink2">
                                       <NavLink to="/my-team" className=" ms-3">
                                          <div className="d-flex justify-content-between ">My Team</div>
                                       </NavLink>
                                    </li>
                                    <li className="dropdown navbarLink3">
                                       <NavLink to="/roles" className=" ms-3">
                                          <div className="d-flex justify-content-between ">Roles</div>
                                       </NavLink>
                                    </li>
                                 </ul>
                              </li>

                              <li>
                                 <NavLink to="/events" className="has-arrow waves-effect">
                                    <span className="dashIcons me-3">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.4" viewBox="0 0 17.4 17.4">
                                          <path
                                             id="Icon_material-dashboard"
                                             data-name="Icon material-dashboard"
                                             d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                             transform="translate(-3.8 -2.8)"
                                             strokeWidth="1.4"
                                          />
                                       </svg>
                                    </span>
                                    <span>Events </span>
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink to="/feed" className="has-arrow waves-effect">
                                    <span className="dashIcons me-3">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.4" viewBox="0 0 17.4 17.4">
                                          <path
                                             id="Icon_material-dashboard"
                                             data-name="Icon material-dashboard"
                                             d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                             transform="translate(-3.8 -2.8)"
                                             strokeWidth="1.4"
                                          />
                                       </svg>
                                    </span>
                                    <span>Feed</span>
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink to="/all-transactions" className="has-arrow waves-effect">
                                    <span className="dashIcons me-3">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.4" viewBox="0 0 17.4 17.4">
                                          <path
                                             id="Icon_material-dashboard"
                                             data-name="Icon material-dashboard"
                                             d="M4.5,11.648h6.519V3.5H4.5Zm0,7.852h6.519V14.611H4.5Zm9.481,0H20.5V11.352H13.981Zm0-16V8.389H20.5V3.5Z"
                                             transform="translate(-3.8 -2.8)"
                                             strokeWidth="1.4"
                                          />
                                       </svg>
                                    </span>
                                    <span>All Transactions</span>
                                 </NavLink>
                              </li>
                           </ul>
                        </div> */}

                {/* Dynamic Navbar */}
                {/* <DynamicMenu menu={menu} /> */}
                {/* Sidebar */}
                <div className="mt-4" id="sidebar">
                  <ShowMenubar />
                </div>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      </body>

      {/* Modal 1 */}
      {/* Model 1 ends */}
      {/* <Outlet /> */}
    </>
  );
};

export default AppLayout;

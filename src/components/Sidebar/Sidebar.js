import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  Directions as DistanceIcon,
  ArrowBack as ArrowBackIcon,
  Commute as CabIcon,
  AccountCircle as DriverIcon,
  LocationCity as CityIcon,
  LibraryBooks as FareIcon,
  Payment as PaymentIcon,
  ViewList as ViewQueryIcon,
  Receipt as BookingIcon,
  SettingsEthernet as CmsIocn,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";


// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";


const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Driver",
    link: "/app/driver",
    icon: <DriverIcon />,
    children: [
      { label: "Add Driver", link: "/app/driver" },
      { label: "View Driver", link: "/app/driverList" },
    ],  
  },
  {
    id: 2,
    label: "Cabs",
    link: "/app/cabsCategory",
    icon: <CabIcon />,
    children: [
      { label: "Add Cab Category", link: "/app/cabsCategory" },
      { label: "Add Cab", link: "/app/cabs" },
    ],  
  },
  {
  id: 3,
  label: "City",
  link: "/app/City",
  icon: <CityIcon />,
  children: [
    { label: "Add City", link: "/app/City" },
    { label: "View All City", link: "/app/viewCity" },
    { label: "Add Air/Bus/Rail Stand", link: "/app/addAirBusRail" },
    { label: "View Air/Bus/Rail Stand", link: "/app/viewAirBusRail" },
   
  ],  
},
{
  id: 7,
  label: "Distance", link: "/app/distance", icon: <DistanceIcon />,
},


  {
    id: 4,
    label: "Fare Management",
    link: "/app/fare",
    icon: <FareIcon />,
    children: [
      { label: "Add Fare", link: "/app/fare" },
      { label: "View Fare", link: "/app/fareView" },
    ],
  },
  { id: 5, label: "Booking List", link: "/app/booking", icon: <TableIcon />,

  children: [
    { label: "New Booking", link: "/app/booking" },
    { label: "Active Booking", link: "/app/ui/charts" },
    { label: "Current Booking", link: "/app/ui/maps" },
    { label: "Running Booking", link: "/app/ui/maps" },
    { label: "Request for Cancelling", link: "/app/ui/maps" },
    { label: "Cancelled Booking", link: "/app/ui/maps" },
    { label: "Done Booking", link: "/app/ui/maps" },
    { label: "Creat Manual Booking", link: "/app/ui/maps" },
  ],

},
  {
    id: 6,
    label: "Finance",
    link: "/app/finance/Payment",
    icon: <PaymentIcon />,
  },
  {
    id: 8,
    label: "CMS",
    link: "/app/cms/AboutUs",
    icon: <CmsIocn />,
    children: [
      { label: "About Us", link: "/app/cms/AboutUs" },
      { label: "Cancellation", link: "/app/ui/charts" },
      { label: "Privicy Policy", link: "/app/ui/maps" },
      { label: "Turms & Condition", link: "/app/ui/maps" },
      { label: "Contact us", link: "/app/ui/maps" },
    ],
  },
  {
    id: 9,
    label: "View Request",
    link: "/app/request",
    icon: <ViewQueryIcon />,
    children: [
      { label: "Attach Taxi", link: "/app/request/AttachTaxiRequest" },
      { label: "All Query", link: "/app/request/ViewEnquiry" },
    ],
  },
  {
    id: 10,
    label: "Billing",
    link: "/app/ui",
    icon: <BookingIcon />,
    children: [
      { label: "Creat Bill", link: "/app/ui/icons" },
      { label: "View Bill", link: "/app/ui/charts" },
      { label: "Invoice Report", link: "/app/ui/charts" },
    ],
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
      
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);

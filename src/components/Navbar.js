"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import {
  IoSettingsOutline,
  IoBookOutline,
  IoCompassOutline,
} from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LuPhone } from "react-icons/lu";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Accordion,
  Combobox,
  Menu,
  Skeleton,
  useCombobox,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "@/store/collegeCategorySlice";
import { COLLEGE_CATEGORIES } from "@/utils/nav_data";
import { cn } from "@/utils";
import { useTour } from "@reactour/tour";
import { GoQuestion } from "react-icons/go";
import { useLocalStorage } from "@mantine/hooks";
import { sendGAEvent } from "@next/third-parties/google";
import { useUserInfo } from "@/utils/hooks";

const MENU_ITEMS = [
  {
    name: "HOME", // name was discover.. but was asked to change to home, but it never really redirects to this "home"
    icon: <IoCompassOutline size={22} />,
    to: "/discover",
  },
  {
    name: "CUTOFF",
    icon: <GoSearch strokeWidth={0.4} />,
    to: "/home",
  },
  {
    name: "COLLEGES",
    icon: <IoBookOutline />,
    to: "/colleges",
    subcategoryFrom: "engineering",
  },
  {
    name: "CHOICE LIST",
    icon: <TbReportAnalytics strokeWidth={2} size={18} />,
    to: "/report",
  },
  {
    name: "CONTACT",
    icon: <LuPhone strokeWidth={2} />,
    to: "/contact",
  },
];

const Vr = ({ mt }) => {
  return (
    <div
      className={`h-[1px] w-full bg-black/40 opacity-60 ${mt && "mt-auto"}`}
    ></div>
  );
};

const Navbar = ({ modalOpen, logoutOpen }) => {
  const currentPathName = usePathname();
  const currentSubCategoryType = useSearchParams().get("t");

  const { data: session, status: hasSessionLoaded } = useSession();
  // console.log("🚀 ~ Nav ~ session:", session);

  const dispatch = useDispatch();
  const selectedCollegeCategory = useSelector((state) => state.collegeCategory);

  const { loading, userInfo } = useUserInfo();

  const collegeCategorySelect = useCombobox({
    onDropdownClose: () => collegeCategorySelect.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      eventSource == "keyboard"
        ? collegeCategorySelect.selectActiveOption()
        : collegeCategorySelect.updateSelectedOptionIndex("active");
    },
  });

  const collegeCategoryDisplay = useMemo(
    () => COLLEGE_CATEGORIES.find((c) => c.value === selectedCollegeCategory),
    [selectedCollegeCategory],
  );

  const { setIsOpen, setCurrentStep } = useTour();
  const [hasNavTourBeenPlayed, setHasNavTourBeenPlayed] = useLocalStorage({
    key: "hasNavTourPlayed",
    defaultValue: "false",
  });
  /* Disabling modal opening if not name found has been disabled for now bcs this "client" component apparently runs on server too
   * when in server it does not know session, hence return null/undefind so modal opens .. hence its annoying
   */
  // useEffect(() => {
  //   if (!session?.user?.name) modalOpen()
  // },[])

  useEffect(() => {
    const hasTourBeenPlayed = localStorage.getItem("hasNavTourPlayed");
    let timeoutForOpen;
    if (!hasTourBeenPlayed || hasTourBeenPlayed !== "true") {
      timeoutForOpen = setTimeout(() => {
        setIsOpen(true);
        setCurrentStep(0);
      }, 1000);
    }

    return () => clearTimeout(timeoutForOpen);
  }, []);

  return (
    <>
      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 z-50 flex max-h-16 w-full items-center justify-around bg-white px-2 py-2 shadow shadow-black/40 md:hidden">
        {MENU_ITEMS.slice(0, 4).map((menu, i) =>
          menu.subcategoryFrom ? (
            <Menu key={Math.random()} width={125} shadow="lg" withArrow>
              <Menu.Target>
                <button
                  href={menu.to}
                  // key={i}
                  className={cn(
                    "flex h-full flex-col items-center justify-center gap-1 rounded p-1.5 md:hidden",
                    { "bg-slate-100": currentPathName === menu.to },
                  )}
                >
                  {menu.icon}
                  <p className="text-xs text-black/50">{menu.name}</p>
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{collegeCategoryDisplay.name}</Menu.Label>
                <>
                  {collegeCategoryDisplay.subcategories.map((subCat, l) => (
                    <Menu.Item
                      disabled={collegeCategoryDisplay.disabled}
                      key={subCat.value}
                    >
                      <Link
                        // key={l+38}
                        href={{
                          pathname: "/colleges",
                          query: {
                            t: subCat.value,
                          },
                        }}
                        prefetch={false}
                      >
                        {subCat.name}
                      </Link>
                    </Menu.Item>
                  ))}
                </>
                {/* {COLLEGE_CATEGORIES.map((collegeCategory, k) => ( */}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link
              href={menu.to}
              key={Math.random()}
              className={cn(
                "flex h-full flex-col items-center justify-center gap-1 rounded p-1.5 md:hidden",
                {
                  "bg-slate-100":
                    currentPathName == "/report/generate" &&
                    menu.to == "/report"
                      ? true
                      : currentPathName === menu.to,
                },
              )}
            >
              {menu.icon}
              <p className="text-xs text-black/50">{menu.name}</p>
            </Link>
          ),
        )}

        {/* Profile button */}
        <button
          className={cn(
            "h-fullmd:hidden flex flex-col items-center justify-center gap-1 p-1.5",
          )}
        >
          <Skeleton
            height={"30%"}
            visible={hasSessionLoaded === "loading"}
            width={"120%"}
            radius={5}
          >
            <Menu
              shadow="lg"
              withArrow
              offset={{ mainAxis: 10, crossAxis: -20 }}
            >
              <Menu.Target>
                <div className="flex h-full flex-col items-center justify-center rounded p-1.5 md:hidden">
                  <Image
                    src={session?.user?.image || "/profile-4.png"}
                    alt="profile image"
                    width={24}
                    height={24}
                  />
                  <p className="max-w-16 truncate text-sm text-black/50">
                    {session?.user?.name?.split(" ")[0] || "User"}
                  </p>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Profile</Menu.Label>
                <Menu.Item onClick={modalOpen}>
                  <div className="flex items-center gap-1">
                    <IoSettingsOutline className="cursor-pointer text-black" />
                    Settings
                  </div>
                </Menu.Item>
                <Menu.Label> </Menu.Label>
                <Menu.Item onClick={logoutOpen}>
                  <p className="text-red-400">Logout</p>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Skeleton>
        </button>

        {/* Contact floating button */}
        <Link
          href={MENU_ITEMS[4].to}
          className={cn(
            "absolute bottom-20 right-4 flex flex-col items-center justify-center gap-1 rounded-full bg-white p-3 shadow shadow-black/10 md:hidden",
            { "bg-slate-100": currentPathName === "contact" },
          )}
        >
          {MENU_ITEMS[4].icon}
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:flex md:h-screen md:w-72 md:flex-col md:items-center md:bg-white">
        {/* Profile Section */}
        <div className="flex w-full flex-col items-center justify-center gap-4 p-10">
          <div className="grid h-20 w-20 place-items-center">
            <Skeleton visible={hasSessionLoaded === "loading"} circle>
              <Image
                src={session?.user?.image || "/profile-4.png"}
                alt="profile image"
                width={200}
                height={200}
              />
            </Skeleton>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Skeleton
              visible={hasSessionLoaded === "loading"}
              radius={5}
              // height={24}
              // width={86}
            >
              <h4 className="w-fit text-ellipsis">
                Hi, {session?.user?.name?.split(" ")[0] || "User"}
              </h4>
            </Skeleton>
            <IoSettingsOutline
              onClick={modalOpen}
              size={20}
              className="cursor-pointer text-black"
            />
          </div>
        </div>

        <Vr />

        {/* College Type selection */}
        <div className="collge-type-selector relative mt-3 grid place-items-center p-1">
          <Combobox
            store={collegeCategorySelect}
            resetSelectionOnOptionHover
            withinPortal={false}
            shadow="md"
            transitionProps={{
              transition: "pop",
            }}
            onOptionSubmit={(v) => {
              sendGAEvent("event", "college_type", {
                college_type: v,
                user: userInfo.firstName + "-" + userInfo.mobile,
              });
              dispatch(selectCategory(v));
              collegeCategorySelect.updateSelectedOptionIndex("active");
              collegeCategorySelect.closeDropdown();
            }}
            styles={{
              width: "80%",
            }}
          >
            <Combobox.Target targetType="button">
              <button
                className="flex w-48 items-center justify-between rounded-sm bg-gray-100 p-2 outline outline-1 outline-gray-100"
                onClick={() => collegeCategorySelect.toggleDropdown()}
              >
                <span className="flex items-center gap-2">
                  {collegeCategoryDisplay.icon}
                  {collegeCategoryDisplay.name}
                </span>
                <Combobox.Chevron />
              </button>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>
                {COLLEGE_CATEGORIES.filter(
                  (cateogry) => cateogry.value !== selectedCollegeCategory,
                ).map((cateogry, j) => (
                  <Combobox.Option
                    disabled={cateogry.disabled}
                    className="flex items-center gap-2 text-balance"
                    key={Math.random()}
                    value={cateogry.value}
                    active={cateogry.value === selectedCollegeCategory}
                  >
                    {cateogry.icon}
                    {cateogry.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <GoQuestion
            onClick={() => {
              setHasNavTourBeenPlayed(false);
              setIsOpen(true);
              setCurrentStep(0);
            }}
            className="absolute -right-1 top-0 cursor-pointer opacity-60"
          />
        </div>

        {/* Menu Section */}
        <div className="flex w-full flex-col gap-1 overflow-x-hidden py-4">
          {MENU_ITEMS.map((menu, o) =>
            menu.subcategoryFrom ? (
              <Accordion
                chevronPosition="right"
                key={Math.random()}
                variant="filled"
                unstyled
                chevron={menu.icon}
                defaultValue={currentSubCategoryType}
              >
                <Accordion.Item
                  value={currentSubCategoryType ?? "a"}
                  className={`${
                    currentPathName == menu.to ? "bg-blue-50" : ""
                  }`}
                >
                  <Accordion.Control
                    className={`flex w-full items-center gap-2 py-4 pl-14 font-medium ${
                      currentPathName == menu.to
                        ? "rounded-s-md bg-blue-50 shadow-sm shadow-black/10"
                        : ""
                    }`}
                  >
                    {menu.name}
                  </Accordion.Control>
                  {collegeCategoryDisplay.subcategories.map((category) => (
                    <Accordion.Panel
                      key={Math.random()}
                      className={`${
                        currentSubCategoryType == category.value
                          ? "rounded-sm bg-blue-100"
                          : ""
                      }`}
                    >
                      <Link
                        key={Math.random()}
                        href={{
                          pathname: "/colleges",
                          query: { t: category.value },
                        }}
                        prefetch={false}
                        className={`ml-20 flex items-center gap-2 py-1 font-normal`}
                      >
                        ↪ {category.name}
                      </Link>
                    </Accordion.Panel>
                  ))}
                </Accordion.Item>
              </Accordion>
            ) : (
              <Link
                key={Math.random()}
                href={menu.to}
                prefetch={false}
                className={`ml-10 flex items-center gap-2 py-4 pl-4 font-medium ${
                  currentPathName == menu.to
                    ? "rounded-s-md bg-blue-50 shadow-sm shadow-black/30"
                    : ""
                }`}
              >
                {menu.icon}
                {menu.name}
              </Link>
            ),
          )}
        </div>

        <Vr mt />

        {/* Logout */}
        <div className="flex p-5">
          <button
            onClick={logoutOpen}
            className="flex items-center gap-2 font-medium text-red-400"
          >
            <MdLogout size={18} />
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

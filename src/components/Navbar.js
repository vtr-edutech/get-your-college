"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
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
import { Accordion, Combobox, Menu, Skeleton, useCombobox } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "@/store/collegeCategorySlice";
import { COLLEGE_CATEGORIES } from "@/utils/nav_data";
import { cn } from "@/utils";

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
      className={`w-full bg-black/40 h-[1px] opacity-60 ${mt && "mt-auto"}`}
    ></div>
  );
};

const Navbar = ({ modalOpen, logoutOpen }) => {
  const currentPathName = usePathname();
  const currentSubCategoryType = useSearchParams().get('t');

  const { data: session, status: hasSessionLoaded } = useSession();
  console.log("🚀 ~ Nav ~ session:", session);
  
  const dispatch = useDispatch();
  const selectedCollegeCategory = useSelector((state) => state.collegeCategory);

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
    [selectedCollegeCategory]
  );

  /* Disabling modal opening if not name found has been disabled for now bcs this "client" component apparently runs on server too
   * when in server it does not know session, hence return null/undefind so modal opens .. hence its annoying 
  */
  // useEffect(() => {
  //   if (!session?.user?.name) modalOpen() 
  // },[])

  return (
    <>
      {/* Mobile Nav */}
      <div className='fixed left-0 flex max-h-16 md:hidden justify-around items-center w-full bottom-0 z-50 px-2 py-2 shadow shadow-black/40 bg-white'>
        {MENU_ITEMS.slice(0, 4).map((menu, i) =>
          menu.subcategoryFrom ? (
            <Menu key={i+87} width={125} shadow='lg' withArrow>
              <Menu.Target>
                <button
                  href={menu.to}
                  // key={i}
                  className={cn(
                    "flex gap-1 flex-col items-center justify-center p-1.5 h-full rounded md:hidden",
                    { "bg-slate-100": currentPathName === menu.to }
                  )}
                >
                  {menu.icon}
                  <p className='text-xs text-black/50'>{menu.name}</p>
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                {COLLEGE_CATEGORIES.map((collegeCategory, k) => (
                  <>
                    <Menu.Label key={k+10}>{collegeCategory.name}</Menu.Label>
                    {collegeCategory.subcategories.map((subCat, l) => (
                      <Menu.Item disabled={collegeCategory.disabled} key={subCat.value}>
                        <Link
                          // key={l+38}
                          href={{
                            pathname: "/colleges",
                            query: {
                              t: subCat.value,
                            },
                          }}
                          onClick={() =>
                            dispatch(selectCategory(collegeCategory.value))
                          }
                          prefetch={false}
                        >
                          {subCat.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link
              href={menu.to}
              key={i+873}
              className={cn(
                "flex gap-1 flex-col items-center justify-center p-1.5 h-full rounded md:hidden",
                {
                  "bg-slate-100": currentPathName == '/report/generate' && menu.to == "/report"? true: currentPathName === menu.to,
                }
              )}
            >
              {menu.icon}
              <p className='text-xs text-black/50'>{menu.name}</p>
            </Link>
          )
        )}

        {/* Profile button */}
        <button
          className={cn(
            "flex gap-1 flex-col items-center justify-center p-1.5 h-fullmd:hidden"
          )}
        >
          <Skeleton
            height={"30%"}
            visible={hasSessionLoaded === "loading"}
            width={"120%"}
            radius={5}
          >
            <Menu shadow='lg' withArrow offset={{mainAxis: 10, crossAxis: -20}}>
              <Menu.Target>
                <div className='flex flex-col items-center justify-center p-1.5 h-full rounded md:hidden'>
                  <Image
                    src={session?.user?.image || "/profile-4.png"}
                    alt='profile image'
                    width={24}
                    height={24}
                  />
                  <p className='text-sm text-black/50'>
                    {session?.user?.name || "User"}
                  </p>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Profile</Menu.Label>
                <Menu.Item onClick={modalOpen}>
                  <div className='flex items-center gap-1'>
                    <IoSettingsOutline className='text-black cursor-pointer' />
                    Settings
                  </div>
                </Menu.Item>
                <Menu.Label> </Menu.Label>
                <Menu.Item onClick={logoutOpen}>
                  <p className='text-red-400'>Logout</p>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Skeleton>
        </button>

        {/* Contact floating button */}
        <Link
          href={MENU_ITEMS[4].to}
          className={cn(
            "flex absolute right-4 shadow shadow-black/10 rounded-full bottom-20 gap-1 bg-white flex-col items-center justify-center p-3 md:hidden",
            { "bg-slate-100": currentPathName === "contact" }
          )}
        >
          {MENU_ITEMS[4].icon}
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className='hidden md:flex-col md:flex md:h-screen md:items-center md:w-72 md:bg-white md:fixed md:top-0 md:left-0'>
        {/* Profile Section */}
        <div className='flex flex-col gap-4 justify-center items-center p-10 w-full'>
          <div className='grid place-items-center w-20 h-20'>
            <Skeleton visible={hasSessionLoaded === "loading"} circle>
              <Image
                src={session?.user?.image || "/profile-4.png"}
                alt='profile image'
                width={200}
                height={200}
              />
            </Skeleton>
          </div>
          <div className='flex gap-2 items-center justify-center '>
            <Skeleton
              visible={hasSessionLoaded === "loading"}
              radius={5}
              // height={24}
              // width={86}
            >
              <h4 className='text-ellipsis w-fit'>
                Hi, {session?.user?.name || "User"}
              </h4>
            </Skeleton>
            <IoSettingsOutline
              onClick={modalOpen}
              size={20}
              className='text-black cursor-pointer'
            />
          </div>
        </div>

        <Vr />

        {/* College Type selection */}
        <div className='p-1 mt-3 grid place-items-center'>
          <Combobox
            store={collegeCategorySelect}
            resetSelectionOnOptionHover
            withinPortal={false}
            onOptionSubmit={(v) => {
              dispatch(selectCategory(v));
              collegeCategorySelect.updateSelectedOptionIndex("active");
              collegeCategorySelect.closeDropdown();
            }}
            styles={{
              width: "80%",
            }}
          >
            <Combobox.Target targetType='button'>
              <button
                className='w-48 outline outline-1 outline-gray-100 rounded-sm bg-gray-100 p-2 flex justify-between items-center'
                onClick={() => collegeCategorySelect.toggleDropdown()}
              >
                <span className='flex gap-2 items-center'>
                  {collegeCategoryDisplay.icon}
                  {collegeCategoryDisplay.name}
                </span>
                <Combobox.Chevron />
              </button>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>
                {COLLEGE_CATEGORIES.filter(
                  (cateogry) => cateogry.value !== selectedCollegeCategory
                ).map((cateogry, j) => (
                  <Combobox.Option
                    disabled={cateogry.disabled}
                    className='flex items-center gap-2 text-balance'
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
        </div>

        {/* Menu Section */}
        <div className='flex flex-col gap-1 py-4 w-full overflow-x-hidden'>
          {MENU_ITEMS.map((menu, o) =>
            menu.subcategoryFrom ? (
              <Accordion
                chevronPosition='right'
                key={Math.random()}
                variant='filled'
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
                    className={`flex w-full font-medium gap-2 items-center pl-14 py-4 ${
                      currentPathName == menu.to
                        ? "bg-blue-50 rounded-s-md shadow-sm shadow-black/10"
                        : ""
                    }`}
                  >
                    {menu.name}
                  </Accordion.Control>
                  {collegeCategoryDisplay.subcategories.map((category) => (
                    <Accordion.Panel
                      key={category.value}
                      className={`${
                        currentSubCategoryType == category.value
                          ? "bg-blue-100 rounded-sm"
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
                        className={`font-normal flex gap-2 items-center py-1 ml-20`}
                      >
                        ↪ {category.name}
                      </Link>
                    </Accordion.Panel>
                  ))}
                </Accordion.Item>
              </Accordion>
            ) : (
              <Link
                key={o}
                href={menu.to}
                prefetch={false}
                className={`font-medium flex gap-2 items-center pl-4 py-4 ml-10 ${
                  currentPathName == menu.to
                    ? "bg-blue-50 rounded-s-md shadow-sm shadow-black/30"
                    : ""
                }`}
              >
                {menu.icon}
                {menu.name}
              </Link>
            )
          )}
        </div>

        <Vr mt />

        {/* Logout */}
        <div className='flex p-5'>
          <button
            onClick={logoutOpen}
            className='flex gap-2 text-red-400 font-medium items-center'
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

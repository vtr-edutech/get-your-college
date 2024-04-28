"use client";
import Button from "@/components/ui/Button";
import { setUserData } from "@/store/userInfoSlice";
import { ALL_DISTRICT } from "@/utils/collegeDistrictData";
import { useUserInfo } from "@/utils/hooks";
import { Checkbox, Combobox, useCombobox } from "@mantine/core";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const boardOfStudies = [
  { value: "TN", label: "TN (Samacheer Kalvi)" },
  { value: "CBSE", label: "CBSE (Central Govt.)" },
  { value: "ICSE", label: "ICSE" },
  { value: "AP", label: "AP (Andhra Pradhesh)" },
  { value: "OTHER", label: "OTHER (Please mention)" },
];
const higherSecGroup = [
  { label: "PHY | CHE | STATS | MATHS", value: "101" },
  { label: "PHY | CHE | COMP SCI | MATHS", value: "102" },
  { label: "PHY | CHE | BIO | MATHS", value: "103" },
  { label: "PHY | CHE | BIO-CHEM | MATHS", value: "104" },
  { label: "PHY | CHE | EEC | MATHS", value: "105" },
  { label: "PHY | CHE | MATHS | HOME SCI", value: "106" },
  { label: "OTHER GROUPS", value: "000" },
];

const RegisterForm = ({ closeFn }) => {
  const dispatch = useDispatch();
  const { loading, userInfo } = useUserInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [group, setGroup] = useState()
  const [districtKey, setDistrictKey] = useState('')

  const bosCombobox = useCombobox({
    onDropdownClose: () => bosCombobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      eventSource == "keyboard"
        ? bosCombobox.selectActiveOption()
        : bosCombobox.updateSelectedOptionIndex("active");
    },
  });

  const districtCombobox = useCombobox({
    onDropdownClose: () => districtCombobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      eventSource == "keyboard"
        ? districtCombobox.selectActiveOption()
        : districtCombobox.updateSelectedOptionIndex("active");
    },
  });

  // console.log("🚀 ~ RegisterForm ~ userInfo:", userInfo)
  // console.log("🚀 ~ RegisterForm ~ hasFetched:", hasFetched)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const options = useMemo(
    () =>
      ALL_DISTRICT.concat("OTHER").filter((district) =>
        district.toLowerCase().trim().includes(districtKey.toLowerCase().trim())
      ).map((district, k) => (
        <Combobox.Option key={k} value={district}>
          {district}
        </Combobox.Option>
      )),
    [districtKey]
  );

  const { update } = useSession();

  useEffect(() => {
    if (userInfo._id) {
      const dob = userInfo.dob ? new Date(userInfo.dob) : "";
      const dobToSet = dob
        ? `${new Date(userInfo.dob).getFullYear()}-${
            new Date(userInfo.dob).getMonth() + 1
          }-${new Date(userInfo.dob).getDate().toString().padStart(2, "0")}`
        : "";
      setIsChecked(true);
      reset({
        firstName: userInfo.firstName ?? "",
        lastName: userInfo.lastName ?? "",
        email: userInfo.email ?? "",
        gender: userInfo.gender ?? "",
        group: userInfo.group ?? "",
        district: userInfo.district ?? "",
        pincode: userInfo.pincode ?? "",
        dob: dobToSet,
        BOS: (userInfo.boardOfStudy || userInfo.BOS) ?? "",
        registerNo: userInfo.registerNo ?? "",
      });
    }
  }, [userInfo]);

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      console.log(data);
      // if (data.BOS == "OTHER") {
      //   toast.error("Please enter Board of Study");
      //   return;
      // }
      if (JSON.stringify(data) == JSON.stringify(userInfo)) {
        toast.info("Already submitted");
        closeFn();
        return;
      }
      try {
        setIsSubmitting(true);
        const registerReq = await axios.post("/api/register", data);
        console.log("🚀 ~ onSubmit ~ registerReq:", registerReq);
        toast.success(registerReq.data.message);
        await update({ name: data.firstName });
        dispatch(setUserData({ ...userInfo, ...data }));
        closeFn();
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
        toast.error(error?.response?.data.error ?? error?.message);
        if (error?.response?.status == 401 || error?.response?.status == 403) {
          setTimeout(() => {
            signOut();
          }, 3000);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-4 w-full ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* First name input */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            First Name<span className='text-red-500 text-sm'> *</span>
          </p>
          <input
            {...register("firstName", {
              required: { value: true, message: "Can't be empty" },
              // use values here and see what happens
              // or referehttps://react-hook-form.com/docs/useform defaultValues to figure out
              maxLength: {
                value: 80,
                message: "Max length is 80 characters only",
              },
              validate: (value) => value.trim() !== "" || "Invalid First name",
            })}
            type='text'
            className='w-full rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
            // defaultValue={userInfo.firstName ?? ""}
          />
          {errors["firstName"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["firstName"].message}
            </p>
          )}
        </div>
        {/* Last name */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>Last Name</p>
          <input
            {...register("lastName", {
              // required: { value: true, message: "Can't be empty" },
              maxLength: {
                value: 80,
                message: "Max length is 100 characters only",
              },
              // validate: (value) => value.trim() !== "" || "Invalid Last name",
            })}
            type='text'
            className='w-full  rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
          />
          {errors["lastName"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["lastName"].message}
            </p>
          )}
        </div>
        {/* 12th register No */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            12th Register Number<span className='text-red-500 text-sm'> *</span>
          </p>
          <input
            {...register("registerNo", {
              required: { value: true, message: "Can't be empty" },
              maxLength: {
                value: 7,
                message: "Max length is 7 characters only",
              },
              validate: (value) =>
                value.trim() !== "" || "Invalid REgister No.",
            })}
            type='text'
            onInput={(e) =>
              (e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9]/g,
                ""
              ))
            }
            className='w-full rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
            // defaultValue={userInfo.registerNo ?? ""}
          />
          {errors["registerNo"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["registerNo"].message}
            </p>
          )}
        </div>
        {/* Email */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>E-mail</p>
          <input
            {...register("email", {
              // required: { value: true, message: "Required!" },
              pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
            })}
            type='text'
            className='w-full  rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
          />
          {errors["email"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["email"].message}
            </p>
          )}
        </div>
        {/* Gender */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            Gender<span className='text-red-500 text-sm'> *</span>
          </p>
          <select
            {...register("gender", {
              required: true,
              validate: (value) =>
                ["male", "female", "other"].includes(value) || "Invalid Gender",
            })}
            className='w-full  rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Other</option>
          </select>
          {errors["gender"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["gender"].message}
            </p>
          )}
        </div>
        {/* Current pursuit */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            Group<span className='text-red-500 text-sm'> *</span>
          </p>
          <select
            {...register("group", {
              required: true,
              // validate: (value) =>
              //   higherSecGroup.map((grp) => grp.value).includes(value) ||
              //   "Invalid group",
            })}
            onChange={(e) => {
              setValue("group", e.currentTarget.value);
              setGroup(e.currentTarget.value);
            }}
            className='w-full  rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
            value={
              !(higherSecGroup
                .map((grp) => grp.value)
                .includes(getValues("group")))
                ? "000"
                : getValues("group")
            }
            defaultValue={getValues("group")}
          >
            {higherSecGroup.map((grp) => (
              <option value={grp.value} key={Math.random()}>
                {grp.label}
              </option>
            ))}
          </select>
          {errors["group"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["group"].message}
            </p>
          )}
        </div>
        {/* Optional other for group */}
        {/* {getValues("group") == "000" && (
          <div className='flex flex-col gap-1'>
            <p className='font-light text-xs'>
              Mention Group<span className='text-red-500 text-sm'> *</span>
            </p>
            <input
              {...register("group", {
                required: { value: true, message: "Required!" },
                minLength: { value: true, message: "Invalid Group" },
                maxLength: {
                  value: 200,
                  message: "Max length of Group exceeded",
                },
                validate: (value) => value.trim() !== "" || "Invalid Group",
              })}
              type='text'
              onInput={(e) => {
                setGroup(e.currentTarget.value)
              }}
              value={group}
              defaultValue={getValues("group")}
              className='w-full rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
            />
            {errors["group"] && (
              <p className='text-xs text-red-500 font-light'>
                {errors["group"].message}
              </p>
            )}
          </div>
        )} */}
        {/* Board of study */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            Board of Study<span className='text-red-500 text-sm'> *</span>
          </p>
          <Combobox
            store={bosCombobox}
            shadow='md'
            onOptionSubmit={(value) => {
              setValue("BOS", value);
              bosCombobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <input
                className='w-full cursor-pointer rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
                onInput={(e) => (e.currentTarget.value = null)}
                onClick={() => bosCombobox.toggleDropdown()}
                value={getValues("BOS")}
                {...register("BOS", {
                  required: { value: true, message: "Required!" },
                  minLength: { value: true, message: "Invalid Board of Study" },
                  maxLength: {
                    value: 200,
                    message: "Max length of Board of Study exceeded",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Invalid Board of Study",
                })}
              />
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>
                {boardOfStudies.map((board, i) => (
                  <Combobox.Option value={board.value} key={i + 8223}>
                    {board.label}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          {errors["BOS"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["BOS"].message}
            </p>
          )}
        </div>
        {/* If others please mention */}
        {/* {getValues("BOS") == "OTHER" && (
          <div className='flex flex-col gap-1'>
            <p className='font-light text-xs'>
              Mention board of study
              <span className='text-red-500 text-sm'> *</span>
            </p>
            <input
              {...register("BOS", {
                required: { value: true, message: "Required!" },
                minLength: { value: true, message: "Invalid Board of Study" },
                maxLength: {
                  value: 200,
                  message: "Max length of Board of Study exceeded",
                },
                validate: (value) =>
                  value.trim() !== "" || "Invalid Board of Study",
              })}
              type='text'
              className='w-full  rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
              value={""}
              // defaultValue={userInfo.address ?? ""}
            />
            {errors["BOS"] && (
              <p className='text-xs text-red-500 font-light'>
                {errors["BOS"].message}
              </p>
            )}
          </div>
        )} */}
        {/* District */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            District<span className='text-red-500 text-sm'> *</span>
          </p>
          <Combobox
            store={districtCombobox}
            shadow='md'
            onOptionSubmit={(val) => {
              setDistrictKey(val);
              setValue("district", val);
              districtCombobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <input
                type='search'
                name='district'
                placeholder='Search by district'
                id='search-district'
                className='bg-slate-50 py-2 px-3 w-full outline outline-1 placeholder:text-sm outline-gray-300 focus:outline-mantine-blue md:outline-gray-200 rounded-md focus:outline-1 md:focus:outline-mantine-blue'
                onClick={() => districtCombobox.toggleDropdown()}
                {...register("district", {
                  required: { value: true, message: "Required!" },
                  minLength: { value: true, message: "Invalid District" },
                  maxLength: {
                    value: 200,
                    message: "Max length of District exceeded",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Invalid District",
                })}
                onInput={(e) => setDistrictKey(e.currentTarget.value)}
                // value={dist}
              />
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options
                mah={300}
                styles={{ options: { overflowY: "scroll" } }}
              >
                {options}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </div>
        {/* Optional District */}
        {districtKey == "OTHER" && (
          <div className='flex flex-col gap-1'>
            <p className='font-light text-xs'>
              Mention District<span className='text-red-500 text-sm'> *</span>
            </p>
            <input
              {...register("district", {
                required: { value: true, message: "Required!" },
                minLength: { value: true, message: "Invalid District" },
                maxLength: {
                  value: 200,
                  message: "Max length of District exceeded",
                },
                validate: (value) => value.trim() !== "" || "Invalid District",
              })}
              type='text'
              className='w-full  rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
              // defaultValue={userInfo.address ?? ""}
            />
            {errors["district"] && (
              <p className='text-xs text-red-500 font-light'>
                {errors["district"].message}
              </p>
            )}
          </div>
        )}
        {/* Pincode */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            Pincode<span className='text-red-500 text-sm'> *</span>
          </p>
          <input
            {...register("pincode", {
              required: { value: true, message: "Required!" },
              minLength: { value: true, message: "Invalid Pincode" },
              maxLength: {
                value: 6,
                message: "Max length of Pincode exceeded",
              },
              validate: (value) => value.trim() !== "" || "Invalid Pincode",
            })}
            type='tel'
            inputMode='numeric'
            className='w-full  rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
            // defaultValue={userInfo.address ?? ""}
          />
          {errors["pincode"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["pincode"].message}
            </p>
          )}
        </div>
        {/* DOB */}
        <div className='flex flex-col gap-1'>
          <p className='font-light text-xs'>
            Date of Birth<span className='text-red-500 text-sm'> *</span>
          </p>
          <input
            {...register("dob", {
              required: { value: true, message: "Required!" },
              validate: (value) => {
                const date = new Date(value);
                const differenceInDate =
                  new Date(Date.now()).getFullYear() - date.getFullYear();
                if (differenceInDate <= 15)
                  return `Invalid Date of Birth: Calculated age is ${differenceInDate}`;
              },
            })}
            type='date'
            placeholder='DD/MM/YYYY'
            className='w-full placeholder:text-sm rounded-md bg-slate-50 outline-gray-200 px-3 py-2 outline outline-1 focus:outline-mantine-blue'
            // defaultValue={userInfo.dob ? `: ''}
          />
          {errors["dob"] && (
            <p className='text-xs text-red-500 font-light'>
              {errors["dob"].message}
            </p>
          )}
        </div>

        {/* Agree or not */}
        <div className='flex gap-2 items-start'>
          <Checkbox
            label={
              <>
                I authorize &apos;Get Your College&apos; to contact me regarding
                events, updates and admission support via Email, SMS and
                Whatsapp calls.
                <span className='text-red-500 text-sm'> *</span>
              </>
            }
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </div>
        <Button
          label={"Submit"}
          isDisabled={!userInfo || isSubmitting || !isChecked}
          asButton
          className='bg-mantine-blue'
        />
      </form>
    </div>
  );
};

export default RegisterForm;

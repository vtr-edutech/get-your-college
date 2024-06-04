'use client'
import Button from "@/components/ui/Button";
import { Textarea } from "@mantine/core";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import { GoPaperAirplane } from "react-icons/go";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";

const contactDetails = [
  {
    label: "Phone",
    value: "+91 8946082559",
    icon: <FiPhoneCall size={20} />,
    proto: "tel:",
  },
  {
    label: "E-mail",
    value: "getyourcollege.vtr@gmail.com",
    icon: <HiOutlineMail size={22} />,
    proto: "mailto:",
  },
  {
    label: "Location",
    sublabel: "Get Your College",
    value: `No. 135/A, Poonamallee High Rd, Sathiyamoorthy Nagar, Maduravoyal, Chennai, Tamil Nadu 600095`,
    icon: <IoLocationOutline size={22} />,
    proto: "https://maps.app.goo.gl/1KCsK1ZJFZhXrBWh7",
  },
];

const ContactCard = ({ icon: Icon, label, sublabel = null, value, proto }) => {
  return (
    <Link className='flex w-full items-center md:h-full gap-4 rounded-md shadow p-2 px-3 md:px-8 outline outline-1 outline-gray-100' 
      href={(label == "Location")? proto: proto + value} target="_blank">
      <div className="w-8 h-8">
        {Icon}
      </div>
      <div className='flex flex-col'>
        <h1 className='font-medium text-lg text-primary/70 ml-1'>{label}</h1>
        {
          sublabel && <h1 className='font-medium text-base text-primary/70 ml-1'>{sublabel}</h1>
        }
        <h1 className={`font-normal ${sublabel ? 'text-sm': 'text-base'} text-wrap  text-primary/50`}>{value}</h1>
      </div>
    </Link>
  );
};

const Contact = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    reset
  } = useForm();
  
  const sendMessage = (data) => {
    console.log(data);
    reset();
    toast.success("Message has been sent!");
  }

  return (
    <>
      <h1 className="text-2xl font-medium">Contact</h1>
      <h1 className="text-base font-normal">
        Connect with us directly for doubts, guidances and grievances
      </h1>

      {/* Contact cards */}
      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
        {contactDetails.map((c, i) => (
          <ContactCard
            key={i}
            label={c.label}
            value={c.value}
            icon={c.icon}
            proto={c.proto}
            sublabel={c.sublabel}
          />
        ))}
      </div>

      {/* Social Links */}
      <div className="flex w-full shrink-0 items-center justify-center md:flex-wrap md:gap-4">
        <a
          href="https://www.youtube.com/@A2KDK"
          target="_blank"
          className="m-5"
        >
          <FaYoutube size={32} color="#228be6" />
        </a>
        <a
          href="https://www.instagram.com/get.your.college?igsh=amoxbXpnbGt1cXBi"
          target="_blank"
          className="m-5"
        >
          <FaInstagram size={32} color="#228be6" />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61559877867074&mibextid=ZbWKwL"
          target="_blank"
          className="m-5"
        >
          <FaFacebook size={32} color="#228be6" />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=+919150391925&text=Hi%21&type=phone_number&app_absent=0"
          // href="https://web.whatsapp.com/send?phone=+919150391925&text&app_absent=0"
          target="_blank"
          className="m-5"
        >
          <FaWhatsapp size={32} color="#228be6" />
        </a>
      </div>

      {/* Contact form */}
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="mt-8 flex flex-col gap-5 rounded py-8 md:flex-row md:gap-3 md:p-3 md:shadow md:outline md:outline-1 md:outline-gray-100"
      >
        {/* Name and email */}
        <div className="flex w-full flex-1 flex-col items-center gap-6">
          {/* Name input */}
          <div className="relative flex w-full flex-col gap-1 px-3">
            <h2 className="font-medium">
              Name <span className="text-red-300">*</span>
            </h2>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your good name"
              className="w-full min-w-44 rounded-es-md rounded-ss-md bg-zinc-100 p-2 placeholder:text-sm focus:outline-1 focus:outline-blue-500"
              {...register("name", {
                required: { value: true, message: "Name is required!" },
              })}
            />
            {errors["name"] && (
              <p className="absolute -bottom-4 left-3 text-xs font-light text-red-500">
                {errors["name"].message}
              </p>
            )}
          </div>

          {/* Email input */}
          <div className="relative flex w-full flex-col gap-1 px-3">
            <h2 className="font-medium">
              E-mail <span className="text-red-300">*</span>
            </h2>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email to contact you"
              className="w-full min-w-44 rounded-es-md rounded-ss-md bg-zinc-100 p-2 placeholder:text-sm focus:outline-1 focus:outline-blue-500"
              {...register("email", {
                required: { value: true, message: "E-mail is required!" },
                pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
              })}
            />
            {errors["email"] && (
              <p className="absolute -bottom-4 left-3 text-xs font-light text-red-500">
                {errors["email"].message}
              </p>
            )}
          </div>
        </div>

        {/* Text area */}
        <div className="relative flex flex-1 flex-col items-center gap-2 px-2 md:px-0">
          <Textarea
            variant="filled"
            size="md"
            label="Message"
            withAsterisk
            placeholder="Your message to us"
            className="w-full placeholder:text-xs"
            minRows={5}
            rows={5}
            {...register("mess", {
              required: { value: true, message: "Message can't be empty" },
            })}
          />
          {errors["mess"] && (
            <p className="w-full text-left text-xs font-light text-red-500">
              {errors["mess"].message}
            </p>
          )}
          <Button
            label={
              <div className="flex items-center justify-center gap-3">
                Send message <GoPaperAirplane />
              </div>
            }
            className="bg-mantine-blue"
            asButton
          />
        </div>
      </form>
    </>
  );
};

export default Contact;

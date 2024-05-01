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
    sublabel: 'VTR Edu Solutions',
    value: `No.135/A, P.H. Road, Maduravoyal, Chennai - 600 095`,
    icon: <IoLocationOutline size={22} />,
    proto: "https://maps.app.goo.gl/g9uN6NXpnJWqW8Ys6",
  },
];

const ContactCard = ({ icon: Icon, label, sublabel = null, value, proto }) => {
  return (
    <Link className='flex md:w-[unset] shrink-0 w-full items-center md:h-full gap-4 rounded-md shadow p-2 px-3 md:px-8 outline outline-1 outline-gray-100' 
      href={(label == "Location")? proto: proto + value} target="_blank">
      {Icon}
      <div className='flex flex-col'>
        <h1 className='font-medium text-lg text-primary/70 ml-1'>{label}</h1>
        {
          sublabel && <h1 className='font-medium text-base text-primary/70 ml-1'>{sublabel}</h1>
        }
        <h1 className={`font-normal ${sublabel ? 'text-sm': 'text-base'}  text-primary/50`}>{value}</h1>
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
      <h1 className='font-medium text-2xl'>Contact</h1>
      <h1 className='font-normal text-base'>
        Connect with us directly for doubts, guidances and grievances
      </h1>

      {/* Contact cards */}
      <div className='flex md:flex-row flex-col gap-4 items-center mt-4'>
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
      <div className='flex md:gap-4 w-full items-center justify-center md:flex-wrap shrink-0'>
        <a
          href='https://www.youtube.com/@A2KDK'
          target='_blank'
          className='m-5'
        >
          <FaYoutube size={32} color="#228be6" />
        </a>
        <a href='https://instagram.com' target='_blank' className='m-5'>
          <FaInstagram size={32} color="#228be6" />
        </a>
        <a href='https://facebook.com' target='_blank' className='m-5'>
          <FaFacebook size={32} color="#228be6" />
        </a>
        <a
          href='https://web.whatsapp.com/send?phone=8946082559&text&app_absent=0'
          target='_blank'
          className='m-5'
        >
          <FaWhatsapp size={32} color="#228be6" />
        </a>
      </div>

      {/* Contact form */}
      <form
        onSubmit={handleSubmit(sendMessage)}
        className='flex md:gap-3 gap-5 md:flex-row flex-col mt-8 rounded md:outline md:outline-1 md:outline-gray-100 md:p-3 py-8 md:shadow'
      >
        {/* Name and email */}
        <div className='flex flex-col gap-6 items-center flex-1 w-full'>
          {/* Name input */}
          <div className='flex flex-col gap-1 relative w-full px-3'>
            <h2 className='font-medium'>
              Name <span className='text-red-300'>*</span>
            </h2>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Your good name'
              className='bg-zinc-100 p-2 min-w-44 w-full rounded-ss-md placeholder:text-sm rounded-es-md focus:outline-1 focus:outline-blue-500'
              {...register("name", {
                required: { value: true, message: "Name is required!" },
              })}
            />
            {errors["name"] && (
              <p className='text-xs text-red-500 font-light absolute -bottom-4 left-3'>
                {errors["name"].message}
              </p>
            )}
          </div>

          {/* Email input */}
          <div className='flex flex-col gap-1 relative w-full px-3'>
            <h2 className='font-medium'>
              E-mail <span className='text-red-300'>*</span>
            </h2>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Your email to contact you'
              className='bg-zinc-100 p-2 min-w-44 w-full rounded-ss-md placeholder:text-sm rounded-es-md focus:outline-1 focus:outline-blue-500'
              {...register("email", {
                required: { value: true, message: "E-mail is required!" },
                pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
              })}
            />
            {errors["email"] && (
              <p className='text-xs text-red-500 font-light absolute -bottom-4 left-3'>
                {errors["email"].message}
              </p>
            )}
          </div>
        </div>

        {/* Text area */}
        <div className='flex flex-col gap-2 items-center flex-1 relative px-2 md:px-0'>
          <Textarea
            variant='filled'
            size='md'
            label='Message'
            withAsterisk
            placeholder='Your message to us'
            className='w-full placeholder:text-xs'
            minRows={5}
            rows={5}
            {...register("mess", {
              required: { value: true, message: "Message can't be empty" },
            })}
          />
          {errors["mess"] && (
            <p className='text-xs text-red-500 font-light w-full text-left'>
              {errors["mess"].message}
            </p>
          )}
          <Button
            label={
              <div className='flex items-center justify-center gap-3'>
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

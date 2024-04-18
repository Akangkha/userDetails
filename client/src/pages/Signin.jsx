import { useState } from "react";
import Button from "../components/Button";
import { MdArrowOutward } from "react-icons/md";
import { register } from "../lib/auth";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const name = e.target.elements.name.value;
    console.log("data", email, password, name);
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await register(data);
    if (response) {
      localStorage.setItem("token", response.token);
      window.location.href = "/dashboard";
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 min-h-screen overflow-x-hidden bg-[#b9ecff] ">
      <div className="xsSmall:w-[45%] flex flex-col shadow-xl p-12 bg-white w-[90%] max-w-[45rem] xsSmall:min-w-[18rem] justify-center gap-8 items-center md:items-start ">
        <section className="w-full items-center flex px-28 my-6 cursor-pointer xsSmall:h-[2.5em] justify-center xsSmall:gap-12  flex-col mbXSmall:flex-row"></section>
        <section>
          <h3 className="text-3xl font-bold mt-12">SignIn</h3>
          <p className="text-xl font-semibold mb-3 ">
            We&apos;re glad to see you again !
          </p>
          <p>
            Don&apos;t have an account?
            <Link to="/signup" className="text-green-600 m-0 px-2 ">
              Sign In!
            </Link>
          </p>
        </section>

        <form
          method="POST"
          className="w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full flex flex-col gap-4">
            <label htmlFor="name">
              Name
              <span className="text-[#ff4242] px-2">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              required
              className="border rounded-xl py-3 w-full px-4"
            />
            <label htmlFor="name">
              Email
              <span className="text-[#ff4242] px-2">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              className="border rounded-xl py-3 w-full px-4"
            />
            <label htmlFor="name">
              Password
              <span className="text-[#ff4242] px-2">*</span>
            </label>
            <div className="border rounded-xl py-3 w-full px-4 flex items-center justify-between">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                autoComplete="new-password"
                className="outline-none w-full"
              />
              {showPassword ? (
                <FaEye size={20} onClick={() => handleShowPassword()} />
              ) : (
                <FaEyeSlash size={20} onClick={() => handleShowPassword()} />
              )}
            </div>
            <div className="full flex justify-between items-center text-sm px-1 flex-col lg:flex-row">
              <div>
                <input type="checkbox" className="accent-green-500" /> Remember
                me
              </div>
              <div className="hover:text-green-600 cursor-pointer">
                Lost your password?
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[#5BBB7B]  hover:bg-green-800 py-3 text-white font-semibold "
            >
              SignIn Now
              <MdArrowOutward />
            </Button>

            <p className="text-center">OR</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

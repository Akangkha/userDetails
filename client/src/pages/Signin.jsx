import { useState } from "react";
import Button from "../components/Button";
import { MdArrowOutward } from "react-icons/md";
import { login } from "../lib/auth";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toast";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await login(data);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "/";
        toast.success("Login Successful");
      } else {
        console.error("Token not found in the response:", response);
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error("Login Failed");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 min-h-screen overflow-x-hidden bg-[#b9ecff] ">
      <ToastContainer />
      <div className="xsSmall:w-[45%] flex flex-col shadow-xl p-12 bg-white w-[90%] max-w-[45rem] xsSmall:min-w-[18rem] justify-center gap-8 items-center md:items-start ">
        <section>
          <h3 className="text-3xl font-bold mt-12">SignIn</h3>
          <p className="text-xl font-semibold mb-3 ">
            We&apos;re glad to see you again !
          </p>
          <p>
            Don&apos;t have an account?
            <Link to="/signup" className="text-green-600 m-0 px-2 ">
              Sign Up!
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
              autoComplete="name"
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
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

            <Button
              type="submit"
              className="bg-[#5BBB7B]  hover:bg-green-800 py-3 text-white font-semibold "
            >
              SignIn Now
              <MdArrowOutward />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

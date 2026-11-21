"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handelLoginForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: true,
      });

      if (error) {
        toast.error(error.message || "Login failed!");
        return;
      }

      if (data) {
        toast.success("Login Successful");

        const targetUrl = new URL(callbackUrl, window.location.origin);

        const safeCallbackUrl =
          targetUrl.origin === window.location.origin
            ? targetUrl.pathname + targetUrl.search + targetUrl.hash
            : "/";

        window.location.replace(safeCallbackUrl);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] flex justify-start flex-col items-center px-3 sm:px-4 lg:px-0 py-10 lg:py-16">
      <h2 className="text-3xl font-bold mb-7">Login</h2>
      <div className="border border-[#5C53FE] py-5 px-4 rounded-xl">
        {/* form */}
        <Form
          onSubmit={handelLoginForm}
          className="flex w-[80vw] md:w-96 flex-col gap-4 "
          render={(props) => <form {...props} data-custom="foo" />}
        >
          {/* email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description></Description>
            <FieldError />
          </TextField>
          <div>
            <Button type="submit" className="bg-[#5c53fe] w-full">
              Log in
            </Button>
          </div>
        </Form>
        <p className="text-gray-500 text-xs text-center mt-3">
          Do not have an account?{" "}
          <Link href={"/signup"}>
            <span className="text-blue-500 ">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

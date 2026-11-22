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
  Radio,
  RadioGroup,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const SignupPage = () => {
  const handelSignupForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      role: userData.role,
    });

    if (data) {
      toast.success(" Signup Successfull");
      redirect("/");
    }
    if (error) {
      if (
        error.message === "User already exists. Use another email." ||
        error.code === "USER_ALREADY_EXISTS"
      ) {
        toast.error("This email is already registered. Please login!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] flex justify-start flex-col items-center px-3 sm:px-4 lg:px-0 py-10 lg:py-16">
      <h2 className="text-3xl font-bold mb-7">Sign up</h2>
      <div className="border border-[#5c53fe] py-5 px-4 rounded-xl">
        {/* form */}
        <Form
          onSubmit={handelSignupForm}
          className="flex w-[80vw] md:w-96 flex-col gap-4 "
          render={(props) => <form {...props} data-custom="foo" />}
        >
          {/* name */}
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>
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
          {/* photo */}
          <TextField name="image" type="url">
            <Label>Photo URL</Label>
            <Input placeholder="https//..." />
            <FieldError />
          </TextField>
          {/* password */}
          <TextField
            isRequired
            minLength={8}
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
            <Description>
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          {/* role selection */}
          <div className="flex flex-col gap-4">
            <Label>Select Role</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              orientation="horizontal"
            >
              <Radio value="seeker">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Job Seeker
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Recruiter
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>
          <div>
            <Button type="submit" className="bg-[#5c53fe] w-full">
              Sign up
            </Button>
          </div>
        </Form>

        <p className="text-gray-500 text-xs text-center mt-3">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="text-blue-500 ">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

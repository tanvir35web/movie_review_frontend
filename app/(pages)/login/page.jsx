"use client"
import CreateMovie from "@/app/components/CreateMovie";
import LoginForm from "@/app/components/LoginForm";

const Login = () => {
    return (
        <>
          <div className=" w-full  h-screen bg-gray-100 flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: "url('/stock-image/login-bg.jpg')" }}>
              <LoginForm />
          </div>
        </>
    )
}

export default Login;
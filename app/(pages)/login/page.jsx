"use client"
import LoginComponent from "@/app/components/User/LoginComponent";

const Login = () => {
    return (
        <>
          <div className=" w-full  h-screen bg-gray-200 flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: "url('/stock-image/login-bg.jpg')" }}>
              <LoginComponent />
          </div>
        </>
    )
}

export default Login;
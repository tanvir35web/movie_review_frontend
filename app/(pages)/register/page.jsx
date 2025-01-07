import Register from "@/app/components/User/Register"

const RegisterPage = () => {
    return (
        <>
            <div className=" w-full  h-screen bg-gray-100 flex justify-center items-center bg-cover bg-center"
                style={{ backgroundImage: "url('/stock-image/login-bg.jpg')" }}>
                <Register />
            </div>
        </>
    )
}
export default RegisterPage
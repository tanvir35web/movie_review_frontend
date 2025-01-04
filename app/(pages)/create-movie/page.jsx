"use client"
import CreateMovie from "@/app/components/CreateMovie";
import LoginForm from "@/app/components/LoginForm";

const createMovie = () => {
    return (
        <>
          <div className=" w-full  h-screen ">
              <CreateMovie />
          </div>
        </>
    )
}

export default createMovie;
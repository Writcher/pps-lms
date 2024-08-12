import Button from "@mui/material/Button";
import LabTrackLogoWhite, { LabTrackLogoBlack } from "../ui/labtrack-logo";
import LoginForm from "../ui/login-form";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Login({searchParams}: {searchParams: {verified: string}}) {
    
    const isVerified = searchParams.verified;
    let verifiedaccount
    if (isVerified === "true") {
        verifiedaccount = "Email verificado, puedes iniciar sesión."
    } else {
        verifiedaccount = ""
    }

    return (
        <main className="flex flex-row h-screen w-screen bg-gray-100">

            <div className="absolute flex h-full w-2/5 inset-0 bg-gradient-to-b from-black to-gray-500 opacity-80 hidden md:block"/>
            <div className="flex flex-col h-full w-2/5 hidden md:block" style={{ backgroundImage: "url('/research-background.png')" }}>
                <div className="flex-grow"/>
                <div className="relative flex flex-col items-end p-16">
                    <LabTrackLogoWhite />
                    <p className="text-xl md:text-3xl text-white font-medium">
                        Sistema de gestion de laboratorios
                    </p>
                </div>
            </div>
            <div className="w-2 h-screen bg-gradient-to-t from-orange-500 to-orange-400 hidden md:block"/>
            <div className="flex flex-col items-center justify-center gap-6 h-full w-full md:w-3/5">
                <div className="flexd"/>
                <div className="flex block md:hidden">
                    <LabTrackLogoBlack />
                </div>
                <div className='flex justify-center items-center text-center tex-xl font-medium text-green-700 mb-6'>{verifiedaccount}</div>
                <div className="flex flex-col mb-8">
                    <p className="text-xl md:text-3xl text-gray-700 font-medium">
                        <strong className="text-gray-700">
                            INICIAR SESIÓN
                        </strong>
                    </p>
                </div>
                <div className="flex w-screen md:w-full justify-center">
                    <LoginForm />
                </div>
                <div className="flex">
                    <Button variant="text" href="/" size="large" color="warning" disableElevation startIcon={<KeyboardArrowLeftIcon />}> ATRAS </Button>
                </div>
            </div>
        </main>
    )
  }


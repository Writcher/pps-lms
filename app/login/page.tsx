import LabTrackLogoWhite, { LabTrackLogoBlack } from "../components/labtrack-logo";
import Alert from "@mui/material/Alert";
import { getTypeAdmin, getTypeGuest, getTypeScholar } from "../lib/queries/usertype";
import Link from "next/link";
import LoginForm from "../components/login/login-form";

export default async function Login({searchParams}: {searchParams: {verified: string}}) {
    const adminType = await getTypeAdmin();
    const scholarType = await getTypeScholar();
    const guestType = await getTypeGuest();

    const isVerified = searchParams.verified;
    let verifiedaccount
    if (isVerified === "true") {
        verifiedaccount = "Email verificado, puedes iniciar sesión."
    } else {
        verifiedaccount = ""
    };

    return (
        <main className="flex flex-row h-screen w-screen bg-gray-100">
            <div className="relative flex flex-col h-full w-2/5 hidden md:block" style={{ backgroundImage: "url('/research-background.png')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-600 opacity-80"/>
                <div className="absolute flex h-full w-full flex-col items-end p-12 gap-2">
                    <div className="flex grow"/>
                    <LabTrackLogoWhite />
                    <p className="text-xl md:text-3xl text-white font-medium text-right">
                        Sistema de Gestion de Laboratorios
                    </p>
                </div>
            </div>
            <div className="right w-2 h-screen bg-gradient-to-t from-orange-500 to-orange-400 hidden md:block"/>
            <div className="flex flex-col items-center justify-center gap-6 h-full w-full md:w-3/5">
                <div className="flex block md:hidden">
                    <LabTrackLogoBlack />
                </div>
                {verifiedaccount && <Alert severity="success">{verifiedaccount}</Alert>}
                <div className="flex">
                    <p className="text-xl md:text-3xl text-gray-700 font-medium">
                        <strong className="text-gray-700">
                            INICIAR SESIÓN
                        </strong>
                    </p>
                </div>
                <div className="flex w-screen md:w-full justify-center items-center">
                    <LoginForm admin={adminType} guest={guestType} scholar={scholarType}/>
                </div>
                <div className="flex">
                    <strong className="text-gray-700">¿No tienes una cuenta? <Link className="text-orange-500" href={"/register"}>Crea una</Link>.</strong>
                </div>
            </div>
        </main>
    );
};


import { auth } from "@/app/lib/auth";
import Button from "@mui/material/Button";
import { redirect } from "next/navigation";


export default async function ABMusuarios() {
    const session = await auth();
    if (!session?.user) redirect("/");
    
    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col items-center justify-center mb-4 md:gap-12">
                <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                    <p className="mt-16">
                        Usuarios
                    </p>
                </div>
                <div className="flex flex-col m-6 md:m-12"/>
                <div className="flex flex-col gap-5 md:w-2/6">
                    <Button variant="outlined" href="/admin/usermanagement/scholar" size="large" color="warning" disableElevation fullWidth>Becarios</Button>
                    <Button variant="outlined" href="/admin/usermanagement/guest" size="large" color="warning" disableElevation fullWidth>Invitados</Button>
                </div>
            </div>
        </main>
    );
}
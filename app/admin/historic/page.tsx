import { auth } from "@/app/lib/auth";
import { getHistoricProjectStatuses } from "@/app/lib/queries/historicprojectstatus";
import { getHistoricProjectTypes } from "@/app/lib/queries/historicprojecttype";
import { getHistoricScholarshipTypes } from "@/app/lib/queries/historicscholarshiptype";
import { getHistoricUserCareers } from "@/app/lib/queries/historicusercareer";
import { redirect } from "next/navigation";
import ABMHistoricTable from "@/app/components/admin/historic/table";

export default async function Invitados() {
    const session = await auth();
    if (!session?.user) redirect("/");

    const laboratory_id = session?.user?.laboratory_id as number;
    const historicussercareers = await getHistoricUserCareers();
    const historicscholarships = await getHistoricScholarshipTypes();
    const historicprojecttypes = await getHistoricProjectTypes();
    const historicprojectstatus = await getHistoricProjectStatuses();

    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex flex-col mt-10 text-xl md:text-3xl text-gray-700 text-center font-bold">
                <p className="">
                    Historico de Proyectos
                </p>
            </div>
            <div className="flex flex-col min-h-[80%] max-h-[80%] mt-10 md:px-10 items-center justify-center">
                <ABMHistoricTable 
                    laboratory_id={laboratory_id}
                    historicusercareers={historicussercareers}
                    historicscholarships={historicscholarships}
                    historicprojecttypes={historicprojecttypes}
                    historicprojectstatus={historicprojectstatus}
                />
            </div>
        </main>
    );
};
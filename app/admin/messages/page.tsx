import ChatAdmin from "@/app/components/admin/messages/chat";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function MessagesPageAdmin() {
    const session = await auth();
    if (!session?.user) redirect("/");
    const usertype_id = session?.user?.usertype_id;
    const laboratory_id = session?.user?.laboratory_id;
    const current_id = session?.user?.id;
    return (
        <main className="flex flex-col w-full h-full">
            <ChatAdmin
                laboratory_id={laboratory_id}
                current_id={current_id}
                usertype_id={usertype_id}
            />
        </main>
    );
};
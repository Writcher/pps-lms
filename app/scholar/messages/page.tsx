import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import ChatQuery from "@/app/components/scholar/messages/chatQuery";

export default async function MessagePageScholar() {
    const session = await auth();
    if (!session?.user) redirect("/");
    const usertype_id = session?.user?.usertype_id;
    const laboratory_id = session?.user?.laboratory_id;
    const current_id = session?.user?.id;
    return (
        <div>
            <ChatQuery laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
        </div>
    );
};
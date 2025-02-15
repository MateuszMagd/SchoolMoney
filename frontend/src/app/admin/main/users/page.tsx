import UsersPage from "@/components/edits-components/userTable";

const Page = () => {
    return (
        <div className="flex flex-row justify-center text-2xl  min-h-screen"
         style={{
                backgroundImage: "url('/assets/admin_background.png')",
                backgroundSize: "cover",
            }}>
             <UsersPage />
        </div>
    );
}

export default Page;
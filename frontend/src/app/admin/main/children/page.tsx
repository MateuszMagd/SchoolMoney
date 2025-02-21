import ChildrenPage from "@/components/edits-components/childTable";

const Page = () => {
    return (
        <div className="flex flex-row justify-center text-2xl  min-h-screen"
            style={{
                backgroundImage: "url('/assets/admin_background.png')",
                backgroundSize: "cover",
            }}>
            <ChildrenPage />
    </div>
    );
};

export default Page;


import RouterButton from "@/components/routerButton";

const PageClasses = () => {
    return (
        <div className="flex flex-col content-center p-10 space-y-6">
            <RouterButton page="class/create" buttonString="Create your new class" /> 
            <RouterButton page="class/manage" buttonString="Manage your classes" />
        </div>
    )
};

export default PageClasses;
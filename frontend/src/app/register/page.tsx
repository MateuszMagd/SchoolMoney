import RegisterForm from "@/components/registerForm"
import RouterButton from "@/components/routerButton"

export default function Register() {
    return (
        <div
        className="min-h-screen  bg-center flex items-center justify-center"
        style={{
            backgroundImage: "url('/assets/register_background.png')",
        }}
    >
        <div className="px-72 mt-20 ">
            <RegisterForm />
            <div className="flex justify-center items-center mt-10">
                <RouterButton page="/" buttonString="Wróć do głównej" color="bg-marine" />
            </div>
        </div>
    </div>
    )
}
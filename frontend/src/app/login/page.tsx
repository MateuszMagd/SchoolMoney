import LoginForm from '@/components/loginForm'
import RouterButton from "@/components/routerButton"

export default function Login() {
    return (
        <div
        className="min-h-screen  bg-center flex items-center justify-center"
        style={{
            backgroundImage: "url('/assets/register_background.png')",
        }}
     >
        <div className="px-72 mt-20 ">
            <LoginForm />
            <div className="flex justify-center items-center mt-10">
                <RouterButton page="/" buttonString="Wróć do głównej" color="bg-marine" width="w-[250px]" height="h-[60px]" />
            </div>
            <div className="flex justify-center items-center mt-10"></div>
        </div>
    </div>
    )
}

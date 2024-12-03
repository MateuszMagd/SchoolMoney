import LoginForm from '@/components/loginForm'
import RouterButton from "@/components/routerButton"

export default function Login() {
    return (
        <>
            <div className="px-72 mt-20">
                <LoginForm />
                <div className="flex justify-center items-center mt-10">
                    <RouterButton page="/" buttonString = "Wroc do głownej"/>
                </div>
                
            </div>
        </>   
    )
}
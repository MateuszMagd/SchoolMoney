import RegisterForm from "@/components/registerForm"
import RouterButton from "@/components/routerButton"

export default function Register() {
    return (
        <>
            <div className="px-72 mt-20">
                <RegisterForm />
                <div className="flex justify-center items-center mt-10">
                    <RouterButton page="/" buttonString = "Wroc do głownej"/>
                </div>
                
            </div>
        </>   
    )
}
import RouterButton from "./routerButton";

const FundForm = () => {
    return (
        <>
            <form className="flex flex-col items-center">
                <input type="text" placeholder="Fund Name" className="border border-gray-300 rounded-md p-2 m-2" />

                <input type="date" placeholder="Fund Description" className="border border-gray-300 rounded-md p-2 m-2" />
                <input type="date" placeholder="Fund Description" className="border border-gray-300 rounded-md p-2 m-2" />

                <input type="number" placeholder="Fund Goal" className="border border-gray-300 rounded-md p-2 m-2" />

                <textarea placeholder="Fund Description" className="border border-gray-300 rounded-md p-2 m-2" />
                
                <input type="class" placeholder="Fund Class" className="border border-gray-300 rounded-md p-2 m-2" />

                <input type="submit" value="Create Fund" className="bg-blue-500 text-white rounded-md p-2 m-2" />

            </form>

            <RouterButton page="/" buttonString = "Wroc do głownej"/>
        </>     
    )
}

export default FundForm;
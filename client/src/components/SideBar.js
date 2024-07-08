const SideBar = () => {
  return (
    // Sidebar outline
    <div className="fixed top-0 left-0 h-screen w-52 m-0
                    flex flex-col
                    bg-green-400 text-white shadow-lg">
        <h1 className="text-center pt-4 font-bold text-2xl">EZ Recipes</h1>
        <div className="flex flex-1 flex-col justify-center items-center"></div>
        <div className="flex flex-col space-y-2 sm:space-y-4 md:space-y-8 lg:space-y-12">
            <button className="py-3 px-4 bg-green-600 hover:bg-green-700 focus:outline-none font-bold">
                RECIPE GENERATOR
            </button>
            <button className="py-3 px-4 bg-green-600 hover:bg-green-700 focus:outline-none font-bold">
                SHOPPING LIST
            </button>
            <button className="py-3 px-4 bg-green-600 hover:bg-green-700 focus:outline-none font-bold">
                INFORMATION
            </button>
        </div>
        <div className="flex-1"></div>
        
    </div>
  );
}

export default SideBar;
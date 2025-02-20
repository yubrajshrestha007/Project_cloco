interface HeroSectionProps {
    searchQuery: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeroSection = ({ searchQuery, handleSearchChange }: HeroSectionProps) => {
    return (
        <div className="h-auto md:h-[30rem] font-bold rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 m-5"
            style={{
                backgroundImage: "url('/Job-PNG-Images-HD.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

            <div className="p-4 relative z-10 w-full text-center">
                <h1 className="text-6xl md:text-8xl drop-shadow-lg font-black text-white mb-6">
                    Get Your Dream Job
                </h1>
                <div className="max-w-md mx-auto">
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                        placeholder="Search Jobs"
                        className="w-full px-4 py-3 text-lg text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
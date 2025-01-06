const FilterCard = ( {icon, label} ) => {
    return (
        <>
            <div className="bg-white bg-opacity-25 border space-x-1 border-gray-400 cursor-pointer min-w-[200px] px-2 h-[80px] rounded-2xl flex items-center justify-center">
                {icon}
                <p>{label}</p>
            </div>
        </>
    )
};

export default FilterCard;
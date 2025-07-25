
const Spinner = () => {
    return (
        <div className="w-8 h-8 rounded-full animate-spin border-4 border-t-4 border-t-blue-500 border-gray-300 shadow-md" />
    );
};

const DotLoader = () => {
    return (
        <div className="flex items-center justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
        </div>
    );
};

export { Spinner, DotLoader };

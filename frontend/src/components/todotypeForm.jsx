const TodotypeForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = 'Submit',
    handleDelete,
}) => {
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className='space-y-3'
            >
                <input
                    type='text'
                    className='py-3 px-4 border rounded-lg w-full'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className='flex justify-between'>
                    <button
                        className='bg-cyan-500 text-white py-2 
                    px-4 rounded-lg hover:bg-cyan-600 focus:outline-none 
                    focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-500 ml-3'
                    >
                        {buttonText}
                    </button>

                    {handleDelete && (
                        <button
                            onClick={handleDelete}
                            className='bg-red-500 text-white py-2 px-4 
                            rounded-lg hover:bg-red-600 focus:outline-none 
                            focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TodotypeForm;

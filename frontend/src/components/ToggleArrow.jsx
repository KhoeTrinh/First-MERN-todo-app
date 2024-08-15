const ToggleArrow = ({userInfo, showSidebar}) => {
    return (
        <>
            <span className='text-lg pl-16 pr-4 py-2 font-semibold'>
                {userInfo.username}
            </span>
            <span
                className={`font-extrabold pr-4 py-2 ${
                    showSidebar
                        ? 'transition-transform transform hover:rotate-180'
                        : ''
                }`}
            >
                ^
            </span>
        </>
    );
};

export default ToggleArrow;

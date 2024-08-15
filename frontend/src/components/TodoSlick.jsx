import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TodoSlick = () => {
    const settings = {
        dots: false,
        infinity: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className='block mb-4'>
            <div className='flex justify-between mx-10'>
                <div className="w-[40rem]"></div>
                <Slider
                    {...settings}
                    className='w-[40rem] rounded-lg overflow-hidden'
                >
                    <div>
                        <img
                            src='https://www.google.com/chrome/static/images/intl/vi_VN/homepage/fast/energy-saver_tablet.webp'
                            alt=''
                            className='w-full'
                        />
                        <h3 className='flex justify-between'>1</h3>
                    </div>
                    <div>
                        <img
                            src='https://www.google.com/chrome/static/images/intl/vi_VN/homepage/fast/tabs-groups_tablet.webp'
                            alt=''
                            className='w-full'
                        />
                        <h3 className='flex justify-between'>2</h3>
                    </div>
                    <div>
                        <img
                            src='https://www.google.com/chrome/static/images/intl/vi_VN/homepage/fast/devices_tablet.webp'
                            alt=''
                            className='w-full'
                        />
                        <h3 className='flex justify-between'>3</h3>
                    </div>
                    <div>
                        <img
                            src='https://www.google.com/chrome/static/images/intl/vi_VN/homepage/fast/update_tablet.webp'
                            alt=''
                            className='w-full'
                        />
                        <h3 className='flex justify-between'>4</h3>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default TodoSlick;

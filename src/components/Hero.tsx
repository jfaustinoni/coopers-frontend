import React, { useRef } from 'react';
import Image from 'next/image';
import officeImage from '../../public/office.png';
import arrowDownImage from '../../public/icon-scroll.svg';

const Hero = () => {
    return (
        <section className="relative h-screen flex flex-col justify-center items-center sm:h-96 lg:h-screen section-hero">
            <div className="absolute inset-0 z-0 md:hidden lg:hidden">
                <Image
                    src={officeImage}
                    alt="Office image"
                    layout="fill"
                    objectFit="cover"
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 text-center text-white bg-green-primary bg-opacity-70 p-6 rounded-md sm:bg-transparent sm:bg-opacity-100 sm:flex sm:justify-between sm:w-full sm:items-center">
                <div className='sm:flex sm:flex-col sm:items-left sm:items-baseline text-hero lg:text-left'>
                    <h1 className="text-black font-montserrat font-bold text-4xl lg:text-7xl ">
                        Organize
                        <span className="block text-2xl text-white font-normal sm:text-green-primary lg:text-6xl">your daily jobs</span>
                    </h1>
                    <p className="mt-2 mb-4 font-bold font-montserrat text-black sm:mt-6 lg:text-2xl">The only way to get things done</p>
                    <a
                        aria-label="Go To-do list"
                        href='#tasks'
                        className="mt-4 bg-white text-green-primary py-3 px-6 rounded-md text-center sm:text-white sm:bg-green-primary sm:px-12 lg:lg:text-2xl"
                    >
                        Go To-do list
                    </a>
                </div>

                <div className='sm:relative image-hero sm:flex sm:justify-end hidden-mobile'>
                    <Image
                        src={officeImage}
                        alt="Office image"
                        className="sm:w-8/12 lg:w-full"
                    />
                </div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 hero-arrow">
                <Image
                    src={arrowDownImage}
                    alt="arrow down"
                    layout="fixed"
                    width={50}
                    height={50}
                    className="arrow-down h-12"
                />
            </div>
        </section>
    );
};

export default Hero;

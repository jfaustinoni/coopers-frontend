import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const CarouselSection = () => {
    const slides = [
        {
            id: 1,
            imageSrc: '/slide-1.png',
            altText: 'Slide 1',
            label: 'function',
            description: 'Organize your daily job enhance your life performance',
            link: '#'
        },
        {
            id: 2,
            imageSrc: '/slide-2.png',
            altText: 'Slide 2',
            label: 'function',
            description: 'Mark one activity as done makes your brain understands the power of doing.',
            link: '#'
        },
        {
            id: 3,
            imageSrc: '/slide-3.png',
            altText: 'Slide 3',
            label: 'function',
            description: 'Careful with missunderstanding the difference between a list of things and a list of desires.',
            link: '#'
        },
        {
            id: 4,
            imageSrc: '/slide-2.png',
            altText: 'Slide 2',
            label: 'function',
            description: 'Mark one activity as done makes your brain understands the power of doing.',
            link: '#'
        },
        {
            id: 5,
            imageSrc: '/slide-3.png',
            altText: 'Slide 3',
            label: 'function',
            description: 'Careful with missunderstanding the difference between a list of things and a list of desires.',
            link: '#'
        },
        {
            id: 6,
            imageSrc: '/slide-1.png',
            altText: 'Slide 1',
            label: 'function',
            description: 'Organize your daily job enhance your life performance',
            link: '#'
        },
        {
            id: 7,
            imageSrc: '/slide-3.png',
            altText: 'Slide 3',
            label: 'function',
            description: 'Careful with missunderstanding the difference between a list of things and a list of desires.',
            link: '#'
        },
        {
            id: 8,
            imageSrc: '/slide-1.png',
            altText: 'Slide 1',
            label: 'function',
            description: 'Organize your daily job enhance your life performance',
            link: '#'
        },
        {
            id: 9,
            imageSrc: '/slide-2.png',
            altText: 'Slide 2',
            label: 'function',
            description: 'Mark one activity as done makes your brain understands the power of doing.',
            link: '#'
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: true,
                    infinite: false
                }
            }
        ]
    };

    return (
        <section className='section-carousel overflow-hidden p-7 lg:container lg:mx-auto lg:p-20'>
            <h2 className='relative font-bold text-white text-2xl font-montserrat mb-4 lg:text-5xl lg:mb-11'>good things</h2>
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className='card bg-white rounded overflow-hidden ml-3.5 lg:rounded-xl'>
                        <div className='card-header'>
                            <Image
                                src={slide.imageSrc}
                                alt={slide.altText}
                                className="w-full"
                                objectFit='cover'
                                width={300}
                                height={200}
                            />
                        </div>
                        <div className='card-body p-6'>
                            <label className='py-1.5 px-3 border rounded-2xl'>{slide.label}</label>
                            <p className='font-montserrat font-normal mt-4 mb-4'>{slide.description}</p>
                            <a className='font-montserrat font-semibold text-green-primary' href={slide.link}>read more</a>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default CarouselSection;

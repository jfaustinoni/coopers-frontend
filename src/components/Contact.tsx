import React from 'react';
import Image from 'next/image';
import ContactImage from '../../public/contact.png'
import ContactIcon from '../../public/icon-email.svg'
import InputMask from 'react-input-mask';

const Contact = ({ formData, handleInputChange, handleSubmit }) => {
    return (
        <section className='section-contact m-3.5 lg:container lg:mx-auto lg:p-28 lg:flex lg:flex-col lg:items-center'>
            <header className='flex flex-col items-center relative top-8 lg:w-full'>
                <Image
                    src={ContactImage}
                    alt="Company Logo"
                    className="logo-image w-32 md:w-40 lg:w-48 relative"
                />
            </header>
            <main className='body flex flex-col p-5 pt-10 lg:w-full lg:p-16'>
                <div className='title flex mb-4 items-center'>
                    <Image
                        src={ContactIcon}
                        alt="Company Logo"
                        className="rounded bg-green-primary w-14 p-3 mr-4"
                    />
                    <h3 className='text-lg font-montserrat font-normal text-black leading-none lg:text-2xl'>Get in <span className='font-bold block'>touch</span></h3>
                </div>
                <form onSubmit={handleSubmit} className='lg:mt-8'>
                    <div className='form-group flex flex-col mb-4 lg:mb-6'>
                        <label htmlFor='name' className='text-normal font-montserrat'>Your name*</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder='type your name here...'
                            className='rounded border p-2'
                        />
                    </div>
                    <div className='sm:flex-row sm:flex sm:justify-between sm:items-center'>
                        <div className='form-group flex flex-col mb-4 sm:w-full sm:mr-3'>
                            <label htmlFor='email' className='text-normal font-montserrat'>Email*</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder='example@example.com'
                                className='rounded border p-2'
                            />
                        </div>

                        <div className='form-group flex flex-col mb-4 sm:w-full sm:ml-3'>
                            <label htmlFor='telephone' className='text-normal font-montserrat'>Telephone*</label>
                            <InputMask
                                mask="(99) 99999-9999"
                                type='tel'
                                id='telephone'
                                name='telephone'
                                value={formData.telephone}
                                onChange={handleInputChange}
                                required
                                placeholder='() _____-____'
                                className='rounded border p-2'
                            />
                        </div>
                    </div>
                    <div className='form-group flex flex-col mb-4 lg:mt-2'>
                        <label htmlFor='message' className='text-normal font-montserrat'>Message*</label>
                        <textarea
                            id='message'
                            name='message'
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            placeholder='Type what you want to say to us'
                            className='rounded border p-2'
                        />
                    </div>

                    <button type='submit' className='w-full font-bold font-montserrat text-white bg-green-primary py-2 rounded lg:py-4 uppercase lg:mt-7'>Send now</button>
                </form>
            </main>
        </section>
    );
};

export default Contact;

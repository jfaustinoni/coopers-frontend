import Image from "next/image";
import Stripe from '../../public/stripe-green.svg';

const Footer = () => {
    return (
        <section className='footer flex items-center justify-center pt-8 flex-col'>
            <div className='row'>
                <div className='text text-white text-center'>
                    <p className="font-montserrat font-bold text-xl pb-3 lg:text-2xl ">Need help?</p>
                    <p className="font-montserrat font-bold text-xl pb-3 lg:text-2xl">coopers@coopers.pro</p>
                    <p className="font-montserrat font-normal text-sm pb-3">© 2021 Coopers. All rights reserved.</p>
                </div>
            </div>
            <Image
                src={Stripe}
                alt="Stripe Green"
                className="w-5/6"
            />
        </section>
    );
}

export default Footer;
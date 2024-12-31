import React from "react";
import { Divider } from 'primereact/divider';
 
 
function AboutUs() {
    return (
        <div>
 
            <div className="surface-0 text-center">
 
                <div className="mb-3 font-bold text-4xl mt-4">
                    <span className="text-blue-600">Who We Are</span>
                </div>
                <div className="text-700 md:col-12 mb-6">PeopleCert is the global leader in exam and certification
                    management and delivery, partnering with multinational organisations and government bodies to certify
                    individuals across a product portfolio of 700 market-leading certifications in IT & Digital Transformation,
                    Project Management, Business and Languages.
                    PeopleCert delivers exams across 200 countries and territories, in 25 languages, through its state-of-the-art
                    assessment technology, enabling professionals to reach their full potential and realise their life ambitions
                    through learning.</div>
 
 
 
                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-user mr-2"></i>
                        <b>50000+ trusted us</b>
                    </div>
                </Divider>
 
                <form className="bg-gray-300 m-5 pt-5 pb-3 pl-5 pr-5 shadow" style={{ borderRadius: '10px' }}>
                    <div className="mb-3 font-bold text-4xl mb-4 px-5">
                        <span className="text-900">"Certify Your Future, </span>
                        <span className="text-blue-600"> Secure Your Success."</span>
                    </div>
                </form>
 
                <Divider align="right">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-trophy mr-2"></i>
                        <b>UI and Usuability Award : Craft & Technological Artistry (2019)</b>
                    </div>                
                </Divider>
 
                <Divider align="right">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-trophy mr-2"></i>
                        <b>Innovation Award (2023)</b>
                    </div>                
                </Divider>
 
 
 
 
                <div className="grid">
                    <div className="col-12 md:col-6 mb-4 mt-4 px-10">
                        <div className="md:col-12 font-bold text-4xl">
                            <span className="text-blue-600">What We Do</span>
                        </div>
                        <div className="text-700 md:col-12 mb-4 px-5">PeopleCert is the global leader in exam and certification
                            management and delivery, partnering with multinational organisations and government bodies to certify
                            individuals across a product portfolio of <b>700</b> market-leading certifications in IT & Digital Transformation,
                            Project Management, Business and Languages.
                            PeopleCert delivers exams across <b>200</b> countries and territories, in <b>25</b> languages, through its state-of-the-art
                            assessment technology, enabling professionals to reach their full potential and realise their life ambitions
                            through learning.
                            Our commitment to quality and integrity is evident throughout our organisation. We boast state-of-the-art infrastructure and
                            comply to the strictest regulations.</div>
                    </div>
 
 
                    <div className="col-12 md:col-6 mb-4 mt-4 px-10">
                        <div className="md:col-12 font-bold text-4xl">
                            <span className="text-blue-600 ">Why Us?</span>
                        </div>
                        <div className="text-700 md:col-12 mb-4 px-5">
                            Trusted, Secure, and Easy to Use.
                            We are committed to providing the best certification experience for professionals like you. Here's why thousands of users choose us <b>:</b>
                            <ul className="list-outside list-disc text-left space-y-2">
                                <li><b>Industry-Leading Certifications:</b> Our portfolio includes over 700 certifications in IT, Digital Transformation, Project Management, and more.</li>
                                <li><b>End-to-End Security:</b> With robust encryption and strict privacy measures, your data is always protected.</li>
                                <li><b>User-Friendly Platform:</b> Designed with simplicity in mind, our platform makes it easy to access exams, track progress, and earn certifications without hassle.</li>
                                <li><b>Global Reach:</b> Delivering exams in 200+ countries, we bring certification opportunities to professionals worldwide.</li>
                                <li><b>24/7 Support:</b> Our dedicated support team is always available to assist you whenever you need help.</li>
                                <p className="text-center">Choose us for your certification needs and take the next step in your career with confidence.</p>
                            </ul>
 
                        </div>
                    </div>
                </div>
 
 
                <div className="grid">
                    <div className="col-12 md:col-3 mb-4 px-5">
                        <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-desktop text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Built for Developers</div>
                        <span className="text-700 line-height-3">Empower your career with industry-recognized certifications. Our platform provides easy access to exams,
                            helping you validate your skills and advance in the tech world.</span>
                    </div>
 
                    <div className="col-12 md:col-3 mb-4 px-5">
                        <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
                        <span className="text-700 line-height-3">Our platform is designed with you in mind, offering an intuitive interface that makes navigating and
                            completing your certification process effortless. Get certified with ease, no matter your technical expertise.</span>
                    </div>
 
                    <div className="col-12 md:col-3 mb-4 px-5">
                        <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-lock text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
                        <span className="text-700 line-height-3">Your data, fully protected. We use end-to-end encryption to ensure that all your personal information and
                            certification data is securely transmitted and only accessible by you. Rest assured, privacy and security are our top priorities.</span>
                    </div>
 
                    <div className="col-12 md:col-3 mb-4 px-3">
                        <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-shield text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Trusted Securitty</div>
                        <span className="text-700 line-height-3">Reliability you can count on. Our platform is built with the highest security standards to ensure your data is
                            always protected. With advanced encryption and strict access controls, your certification journey is safe and secure.</span>
                    </div>
 
                    <div className="col-12 md:col-4 mb-4 px-5">
                        <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-globe text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Fast & Global Support</div>
                        <span className="text-700 line-height-3">We have a global presence and we are reachable 24/7/365.</span>
                    </div>
 
                    <div className="col-12 md:col-4 mb-4 px-5">
                        <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-phone text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Contact Us</div>
                        <span className="text-700 line-height-3">Call us on +30 210 3729100</span>
                    </div>
 
                    <div className="col-12 md:col-4 mb-4 px-5">
                        <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-at text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Contact Us</div>
                        <span className="text-700 line-height-3">Send us on Cert@gmail.com</span>
                    </div>
                </div>
            </div>
 
 
            <div className="col-12 md:col-12 mb-4 mt-6 px-5">
                <div className="text-900 text-xl mb-3 font-medium">Follow Us On</div>
                <span className="bg-gray-200 p-2 shadow-4 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-facebook text-4xl text-blue-500"></i>
                </span>
                <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-twitter text-4xl text-blue-500"></i>
                </span>
                <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-youtube text-4xl text-blue-500"></i>
                </span>
                <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-linkedin text-4xl text-blue-500"></i>
                </span>
                <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-instagram text-4xl text-blue-500"></i>
                </span>
            </div>
 
 
            <div className='Copyright bg-gray-200 mb-3'>
                <hr className='text-secondary' />
                <i className='bi bi-c-circle fs-8' ></i>
                <span> 2025 Peoplecert </span>
            </div>
 
        </div>
 
    )
}
 
export default AboutUs;
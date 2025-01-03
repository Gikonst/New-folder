import React from "react";
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AboutUs() {
    const navigate = useNavigate(); // Initialize navigate

    const handleHomeClick = () => {
        navigate("/"); // Navigate to homepage
    };

    return (
        <div>
            <div className="surface-0 text-center p-8 mt-4">
                <div className="mb-3 font-bold text-5xl mt-5">
                    <span className="text-cyan-500">Who We Are</span>
                </div>
                <div className="text-700 md:col-12 mb-6 text-2xl p-4">
                    Certiland is the global leader in exam and certification
                    management and delivery, partnering with multinational organisations and government bodies to certify
                    individuals across a product portfolio of 700 market-leading certifications in IT & Digital Transformation,
                    Project Management, Business and Languages.
                    PeopleCert delivers exams across 200 countries and territories, in 25 languages, through its state-of-the-art
                    assessment technology, enabling professionals to reach their full potential and realise their life ambitions
                    through learning.
                </div>

                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-user mr-2"></i>
                        <b>50000+ trusted us</b>
                    </div>
                </Divider>

                <form className="bg-gray-300 m-5 pt-5 pb-3 pl-5 pr-5 shadow" style={{ borderRadius: '10px' }}>
                    <div className="mb-3 font-bold text-4xl mb-4 px-5">
                        <span className="text-900">"Certify Your Future, </span>
                        <span className="text-cyan-500"> Secure Your Success."</span>
                    </div>
                </form>

                <Divider align="right">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-trophy mr-2"></i>
                        <b>UI and Usability Award: Craft & Technological Artistry (2019)</b>
                    </div>
                </Divider>

                <Divider align="right">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-trophy mr-2"></i>
                        <b>Innovation Award (2023)</b>
                    </div>
                </Divider>

                {/* Button to navigate back to homepage */}
                <button
                    aria-label="Learn More"
                    className="mr-3 p-button-raised p-button p-component mt-5 text-cyan-500 font-bold text-lg" // Updated class names for styling
                    type="button"
                    onClick={handleHomeClick} // Call function to navigate on click
                    data-pc-name="button"
                    data-pc-section="root"
                >
                    <span className="p-button-label p-c text-white" data-pc-section="label">Back to Homepage</span>
                </button>
            </div>
        </div>
    );
}

export default AboutUs;

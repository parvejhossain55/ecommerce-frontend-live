import React from 'react';
import "./footer.css";

const Footer = () => {
    return (
        <>
            <div className="footer-cta row text-center mt-5 bg-white">
                
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-file-lines"></i></p>
                            <p>Terms & conditions</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-person-walking-arrow-loop-left"></i></p>
                            <p>return policy</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-life-ring"></i></p>
                            <p>Support Policy</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-circle-info"></i></p>
                            <p>privacy policy</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-content pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <a href="#"><img src="https://i.ibb.co/QDy827D/ak-logo.png" className="img-fluid" alt="logo"/></a>
                                    </div>
                                    <div className="footer-text">
                                        <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                        elit,Lorem ipsum dolor sit amet.</p>
                                    </div>
                                    <div className="footer-social-icon">
                                        <span>Follow us</span>
                                        <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                                        <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                                        <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">about</a></li>
                                        <li><a href="#">services</a></li>
                                        <li><a href="#">portfolio</a></li>
                                        <li><a href="#">Contact</a></li>
                                        <li><a href="#">About us</a></li>
                                        <li><a href="#">Our Services</a></li>
                                        <li><a href="#">Expert Team</a></li>
                                        <li><a href="#">Contact us</a></li>
                                        <li><a href="#">Latest News</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Subscribe</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                    </div>
                                    <div className="subscribe-form">
                                        <form action="#">
                                            <input type="text" placeholder="Email Address"/>
                                            <button><i className="fab fa-telegram-plane"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
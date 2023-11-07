import React from 'react'
import './LoginAdmin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
export default function LoginAdmin() {
  return (
    <div className="login-area login-s2">
        <div className="container">
            <div className="login-box ptb--100">
                <div className="login-form-head">
                    <h4>Sign In</h4>
                    <p>Hello there, Sign in and start managing your Admin Template</p>
                </div>
                <div className="login-form-body">
                    <div className="form-gp">
                        <input className='imput_form' type="email" id="" placeholder='Username'/>
                        <FontAwesomeIcon icon={faEnvelope} /> 
                    </div>
                    <div className="form-gp">
                        <input type="password" id="exampleInputPassword1" placeholder='Password' />
                        <FontAwesomeIcon icon={faLock} />
                    </div>
                    <div className="row mb-4 rmber-area">
                        <div className="col-6">
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                <label className="custom-control-label" for="customControlAutosizing">Remember Me</label>
                            </div>
                        </div>
                        <div className="col-6 text-right">
                            <a href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="submit-btn-area">
                        <button id="form_submit" type="submit">Submit <i className="ti-arrow-right"></i></button>
                    </div>
                    <div className="form-footer text-center mt-5">
                        <p className="text-muted">Don't have an account? <a href="register.html">Sign up</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

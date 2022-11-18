import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import Footer from '../../pages/Footer/index'
import * as Yup from 'yup'
import './index.css'
import Progressbar from '../../utils/progressbar'
const StepOne = (props) => {
    const { user } = props
    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .required('Required')
            .email('Invalid email address')
            .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email address'),
        phone_number: Yup
            .string()
            .required('Phone Number is equired')
            .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Invalid phone number'),
        password: Yup.string()
            .required('password is required')
            .min(8, 'Password length should be more than 8 and contain a special character and atleast one number')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password length should be more than 8 and contain a special character and atleast one number'),
        confirmPassword: Yup.string()
            .required('Confrim password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        policy: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),

    })

    //handles submit and navigate to next page
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: validationSchema.cast(user),
        resolver: yupResolver(validationSchema)
    })

    //handle click to next page
    let navigate = useNavigate()
    const onSubmit = (data) => {
        props.updateUserdata(data)
        console.log(data)
        navigate('/user/stepTwo')
    };
    console.log(props)
    return (
        <div className='step-one'>
            <div className="container">
                <div className="row pt-2">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="step-header d-flex flex-column align-items-center justify-content-center">
                            <Progressbar />
                            <h4>Lets Get started</h4>
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group id="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Your Email" name="email" {...register('email')} className={`form-control py-2 my-2 ${errors.email ? 'input-error' : ''}`} />
                                {errors.email && <span className='errorMsg'>{errors.email.message}</span>}
                            </Form.Group>
                            <Form.Group id="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Your Phone Number" name="phone_number" {...register('phone_number')} className={`form-control py-2 my-2 ${errors.phone_number ? 'input-error' : ''}`} />
                                {errors.phone && <span className='errorMsg'>{errors.phone_number.message}</span>}
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Your Password" name="password" {...register('password')} className={`form-control py-2 my-2 ${errors.password ? 'input-error' : ''}`} />
                                {errors.password && <span className='errorMsg'>{errors.password.message}</span>}
                            </Form.Group>
                            <Form.Group id="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Your Password" name="confirmPassword" {...register('confirmPassword')} className={`form-control py-2 my-2 ${errors.confirmPassword ? 'input-error' : ''}`} />
                                {errors.confirmPassword && <span className='errorMsg'>{errors.confirmPassword.message}</span>}
                            </Form.Group>
                            <div className="form-group form-check my-2">
                                <input
                                    name="policy"
                                    type="checkbox"
                                    {...register('policy')}
                                    className={`form-check-input ${errors.policy ? 'is-invalid' : ''}`} />
                                <label htmlFor="acceptTerms" className="form-check-label">
                                    I have read and agree to the Terms
                                </label>
                                <div className="errorMsg">{errors.policy?.message}</div>
                            </div>
                            <Button className="btn-home rounded px-5" type="submit">Next</Button>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="footer-home">
                <Footer />
            </div>
        </div>
    )
}

export default StepOne
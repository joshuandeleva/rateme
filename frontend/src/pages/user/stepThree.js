import React from 'react'
import { Container, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Progressbar from '../../utils/progressbar'
import Footer from '../../pages/Footer/index'
import * as Yup from 'yup'
const StepThree = (props) => {
    const { user } = props

    //form validation for the inputs

    const validationSchema = Yup.object().shape({
        gender: Yup.string()
            .oneOf(['male', "female", "prefernottosay"]).required('required')

    })

    //handle submit and navigation

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: user, resolver: yupResolver(validationSchema) })

    let navigate = useNavigate()

    const onSubmit = (data) => {
        props.updateUserdata(data)
        console.log(data)
        navigate('/user/stepFour')
    }
    console.log(props)
    return (
        <div className='choose-gender'>
            <Container>
                <Row>
                    <div className="col-lg-6 offset-lg-3">
                        <div className="step-header d-flex flex-column align-items-center justify-content-center">
                            <Progressbar />
                            <h4 className='py-3'>What is your Gender </h4>
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control my-3 py-2">
                                <input type="radio" name="gender" value='male' {...register('gender', { required: true })}
                                    style={{ marginRight: "10px" }} />
                                <label htmlFor="">Male</label>
                            </div>
                            <div className="form-control my-3 py-2">
                                <input type="radio" name="gender" value='female' {...register('gender', { required: true })} style={{ marginRight: "10px" }} />
                                <label htmlFor="">Female</label>
                            </div>
                            <div className="form-control my-3 py-2">
                                <input type="radio" name="gender" value='prefernottosay' {...register('gender', { required: true })} style={{ marginRight: "10px" }} />
                                <label htmlFor="">Prefer not to say</label>
                            </div>
                            <div className="errorMsg">{errors.gender?.type === 'required' && 'Please choose one'}</div>
                            <div className="submit-message my-2">
                                <button type='submit' className="rounded px-5 btn-home">Next</button>
                            </div>
                        </Form>
                    </div>
                </Row>
            </Container>
            <div className="footer-home">
                <Footer />
            </div>
        </div>
    )
}
export default StepThree
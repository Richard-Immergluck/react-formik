import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comment: '',
  address: '',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const onSubmit = (values, onSubmitProps) => {
  console.log('form data', values)
  console.log('onSubmitProps', onSubmitProps)
  onSubmitProps.setSubmitting(false)
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required!'),
  email: Yup.string().email('Invalid email format!').required('Required!'),
  channel: Yup.string().required('Required!')
  // comment: Yup.string().required('Required!')
})

// On field Validation of the comments form field
const validateComments = value => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

function YoutubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {formik => {
        console.log('Formik props', formik)
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name:</label>
              <Field
                type='text'
                id='name'
                name='name'
                placeholder='Enter Name'
              />
              <ErrorMessage name='name' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email:</label>
              <Field
                type='text'
                id='email'
                name='email'
                placeholder='Enter Email Address'
              />
              <ErrorMessage name='email' component={TextError}>
                {errorMsg => <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <label htmlFor='channel'>Channel:</label>
              <Field
                type='text'
                id='channel'
                name='channel'
                placeholder='Youtube Channel Name'
              />
              <ErrorMessage name='channel' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='comment'>Comment</label>
              <Field
                as='textarea'
                id='comment'
                name='comment'
                placeholder='Comment here!'
                validate={validateComments}
              />
              <ErrorMessage name='comment' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <Field name='address'>
                {props => {
                  console.log('field render')
                  const { field, form, meta } = props
                  console.log('render props', props)
                  return (
                    <div>
                      <input type='text' id='address' {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook profile</label>
              <Field type='text' id='facebook' name='social.facebook' />
            </div>

            <div className='form-control'>
              <label htmlFor='twitter'>Twitter profile</label>
              <Field type='text' id='twitter' name='social.twitter' />
            </div>

            <div className='form-control'>
              <label htmlFor='primaryPh'>Primary Phone Number</label>
              <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
            </div>

            <div className='form-control'>
              <label htmlFor='secondaryPh'>Secondary Phone Number</label>
              <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
            </div>

            <div className='form-control'>
              <label>List of phone numbers</label>
              <FieldArray name='phNumbers'>
                {fieldArrayProps => {
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phNumbers } = values
                  console.log('Form Errors', form.errors)
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              {' '}
                              -{' '}
                            </button>
                          )}
                          <button type='button' onClick={() => push('')}>
                            {' '}
                            +{' '}
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                }}
              </FieldArray>
            </div>

            <button type='submit' disabled={! formik.isValid || formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default YoutubeForm

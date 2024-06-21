import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const JobApplicationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset
  } = useForm()
  const [position, setPosition] = useState('')
  const [submittedData, setSubmittedData] = useState(null)

  const watchPosition = watch('position', '')

  useEffect(() => {
    setPosition(watchPosition)
  }, [watchPosition])

  const onSubmit = data => {
    setSubmittedData(data)
    reset()
  }
  return (
    <>
      {submittedData ? (
        <div className='submitted-data-container'>
          <h2>Submitted Data</h2>
          <div>
            <p>
              <strong>Full Name:</strong> <span>{submittedData.fullName}</span>
            </p>
            <p>
              <strong>Email:</strong> <span>{submittedData.email}</span>
            </p>
            <p>
              <strong>Phone Number:</strong>{' '}
              <span>{submittedData.phoneNumber}</span>
            </p>
            <p>
              <strong>Applying for Position:</strong>{' '}
              <span>{submittedData.position}</span>
            </p>

            {(submittedData.position === 'Developer' ||
              submittedData.position === 'Designer') && (
              <p>
                <strong>Relevant Experience (Years):</strong>{' '}
                <span>{submittedData.experience}</span>
              </p>
            )}

            {submittedData.position === 'Designer' && (
              <p>
                <strong>Portfolio URL:</strong>{' '}
                <span>{submittedData.portfolio}</span>
              </p>
            )}

            {submittedData.position === 'Manager' && (
              <p>
                <strong>Management Experience:</strong>{' '}
                <span>{submittedData.managementExperience}</span>
              </p>
            )}

            <p>
              <strong>Additional Skills:</strong>{' '}
              <span>{submittedData.skills.join(', ')}</span>
            </p>

            <p>
              <strong>Preferred Interview Time:</strong>{' '}
              <span>{submittedData.interviewTime.toString()}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='form-header'>Job Application Form</h2>
            <div>
              <label>Full Name</label>
              <input
                {...register('fullName', { required: 'Full Name is required' })}
                type='text'
              />
              {errors.fullName && <p>{errors.fullName.message}</p>}
            </div>

            <div>
              <label>Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format'
                  }
                })}
                type='email'
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <label>Phone Number</label>
              <input
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: 'Phone Number must be a number'
                  }
                })}
                type='text'
              />
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <label>Applying for Position</label>
              <select {...register('position')}>
                <option value=''>Select...</option>
                <option value='Developer'>Developer</option>
                <option value='Designer'>Designer</option>
                <option value='Manager'>Manager</option>
              </select>
            </div>

            {(position === 'Developer' || position === 'Designer') && (
              <div>
                <label>Relevant Experience (Years)</label>
                <input
                  {...register('experience', {
                    required: 'Relevant Experience is required',
                    valueAsNumber: true,
                    validate: value =>
                      value > 0 || 'Experience must be greater than 0'
                  })}
                  type='number'
                />
                {errors.experience && <p>{errors.experience.message}</p>}
              </div>
            )}

            {position === 'Designer' && (
              <div>
                <label>Portfolio URL</label>
                <input
                  {...register('portfolio', {
                    required: 'Portfolio URL is required',
                    pattern: {
                      value: /^(ftp|http|https):\/\/[^ "]+$/,
                      message: 'Invalid URL format'
                    }
                  })}
                  type='text'
                />
                {errors.portfolio && <p>{errors.portfolio.message}</p>}
              </div>
            )}

            {position === 'Manager' && (
              <div>
                <label>Management Experience</label>
                <input
                  {...register('managementExperience', {
                    required: 'Management Experience is required'
                  })}
                  type='text'
                />
                {errors.managementExperience && (
                  <p>{errors.managementExperience.message}</p>
                )}
              </div>
            )}

            <div>
              <label>Additional Skills</label>
              <div className='skills-container'>
                <div>
                  <input
                    type='checkbox'
                    {...register('skills')}
                    value='JavaScript'
                  />{' '}
                  JavaScript
                </div>
                <div>
                  <input type='checkbox' {...register('skills')} value='CSS' />{' '}
                  CSS
                </div>
                <div>
                  <input
                    type='checkbox'
                    {...register('skills')}
                    value='Python'
                  />{' '}
                  Python
                </div>
                <div>
                  <input
                    type='checkbox'
                    {...register('skills')}
                    value='React'
                  />{' '}
                  React
                </div>
                <div>
                  <input type='checkbox' {...register('skills')} value='Next' />{' '}
                  Next
                </div>
              </div>
              {errors.skills && <p>{errors.skills.message}</p>}
            </div>

            <div>
              <label>Preferred Interview Time</label>
              <Controller
                control={control}
                name='interviewTime'
                rules={{ required: 'Preferred Interview Time is required' }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    dateFormat='Pp'
                    placeholderText='Select date and time'
                  />
                )}
              />
              {errors.interviewTime && <p>{errors.interviewTime.message}</p>}
            </div>

            <button type='submit'>Submit</button>
          </form>
        </div>
      )}
    </>
  )
}

export default JobApplicationForm

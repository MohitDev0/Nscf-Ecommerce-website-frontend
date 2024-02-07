import React, { useRef } from 'react'

const FeaturesForm = ({ values, setShowFeatureForm, inputFeatureData, featureData }) => {
    const title = useRef();
    const desc = useRef();
    const setInputValue = (data) => {
        data.preventDefault();
        inputFeatureData({ formName: values, feature_id: featureData._id, title: title.current.value, desc: desc.current.value });
    }
    return (
        <div className='featureForm_container'>
            <div className='featureForm_wrapper'>
                <div className='close_icon' onClick={() => { setShowFeatureForm({ check: false }) }} >X</div>
                <h1 className='featureForm_heading'>{values} Feature</h1>
                <form className='features_form' onSubmit={(v) => setInputValue(v)} >
                    <label>Title</label>
                    <input className='features_form_title' type='heading' name='featureTitle' ref={title} defaultValue={featureData.title} required></input>
                    <label>Description</label>
                    <textarea className='features_form_desc' rows="4" cols="50" name='featureDesc' ref={desc} defaultValue={featureData.disc} required></textarea>
                    <button className='features_form_submit' type='submit'>{values}</button>
                </form>
            </div>
        </div>
    )
}

export default FeaturesForm;
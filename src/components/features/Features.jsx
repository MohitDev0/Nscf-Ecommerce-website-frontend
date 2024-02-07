import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { updateUser } from "../../helper/updateUser";
import "./features.css";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import FeaturesForm from './FeaturesForm.jsx';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Features = () => {
    const url = process.env.REACT_APP_BASE_URL;
    const [features, setfeatures] = useState([]);
    const [presentUser, setPresentUser] = useState([]);
    const [showFeatureForm, setShowFeatureForm] = useState({
        check: false,
        value: null,
        featureData: ""
    });
    const [refresh, setrefresh] = useState(false);
    const [showFeatureOptions, setshowFeatureOptions] = useState({
        check: false,
        number: null
    });

    useEffect(() => {
        const getPresentUser = async () => {
            var userData = localStorage.getItem("jwt");
            const getuser = await axios.get(url + "user/find/admin", {
                headers: {
                    Authorization: userData,
                }
            });
            setPresentUser(getuser.data);
        };
        getPresentUser();
    }, [url, refresh])

    useEffect(() => {
        const getFeature = async () => {
            const res = await axios.get(url + "feature/");
            setfeatures(res.data);
        }
        getFeature();
    }, [url, refresh]);

    const featurefunc = async (data) => {
        setShowFeatureForm({ check: !showFeatureForm.check, value: data.name, featureData: data.featureData });
    }
    const inputFeatureData = async (e) => {
        if (e.formName === "Add") {
            await axios.post(url + "feature/add", { "title": e.title, "disc": e.desc })
                .then((res) => {
                    updateUser(res.data);
                })
                .catch((error) => {
                    updateUser(error.response.data);
                })
        } else if (e.formName === "Edit") {
            await axios.put(url + `feature/update/${e.feature_id}`, { "title": e.title, "disc": e.desc })
                .then((res) => {
                    updateUser(res.data);
                })
                .catch((error) => {
                    updateUser(error.response.data);
                })
        }
        setrefresh(r => !r);
        setshowFeatureOptions({ ...showFeatureOptions, check: false });
        setShowFeatureForm({ check: !showFeatureForm.check });
    }

    const DeleteFeature = async (id) => {
        await axios.delete(url + `feature/delete/${id}`)
            .then((res) => {
                updateUser(res.data);
            })
            .catch((error) => {
                updateUser(error.response.data);
            })
        setrefresh(r => !r);
        setshowFeatureOptions({ ...showFeatureOptions, check: false });
    }


    return (
        <>
            {presentUser.isAdmin && <div className='admin_features'>
                <h1 className='admin_feature_title'>Admin Health farm</h1>
                <div className='admin_feature_edit_options'>
                    <AddCircleIcon onClick={() => {
                        featurefunc({ name: "Add", featureData: { "title": "", "disc": "" } });
                    }} />
                </div>
                {showFeatureForm.check && <FeaturesForm featureData={showFeatureForm.featureData} values={showFeatureForm.value} setShowFeatureForm={setShowFeatureForm} inputFeatureData={inputFeatureData} />}
            </div>}

            <div className='text-center mt-12 '>
                <h1 className='text-green-700 text-6xl'>Welcome to our healthy farm</h1>
                <div className='flex flex-wrap mt-8 justify-evenly mb-5'>
                    {features.map((feature, index) => {
                        return (
                            <div className='FeatureCard flex flex-col w-64 m-2' key={index}>
                                {presentUser.isAdmin && <div className='feature_options'>
                                    <span className='feature_option_icon'><MoreVertIcon onClick={() => {
                                        if (showFeatureOptions.number === index) {
                                            setshowFeatureOptions({ check: !showFeatureOptions.check, number: index })
                                        } else {
                                            setshowFeatureOptions({ check: true, number: index })
                                        }
                                    }} /></span>
                                    {(showFeatureOptions.number === index && showFeatureOptions.check) && <div className='features_option'>
                                        <div className='feature_edit_option' onClick={() => {
                                            featurefunc({ name: "Edit", featureData: feature });
                                        }}><EditIcon /> Edit</div>
                                        <div className='feature_delete_option' onClick={() => {
                                            DeleteFeature(feature._id);
                                        }}><DeleteIcon /> Delete</div>
                                    </div>}
                                </div>}
                                <h1 className='text-8xl text-green-600 font-["serif"] mb-2'>{index + 1}.</h1>
                                <div className='flex-1'>
                                    <h1 className='text-xl mb-2 font-serif '>{feature.title}</h1>
                                    <p className='flex-1 font-serif'>{feature.disc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Features;
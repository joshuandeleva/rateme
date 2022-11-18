import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';
import { BASE_API_URL } from '../../utils/BaseUrl'
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const StepFive = (props) => {
  const [files, setFiles] = useState([]);
  const [location, setLocation] = useState("")
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: true,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  //get user location

  useEffect(() => {
    window.scroll(0, 0);
    navigator.geolocation.getCurrentPosition((position) => setLocation(position.coords))
  }, [])
  //navigate next page

  let navigate = useNavigate();

  //image preview


  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);
  const { userData } = props
  const coords = {
    lat: location.latitude,
    log: location.longitude
  }

  //register user after submit details
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'starmatched');
    //starmatched -preset name

    try {

      //get image url from cloudinary
      const res = await axios.post(`https://api.cloudinary.com/v1_1/dbs6gorqc/image/upload`, formData);
      const imageUrl = res.data.secure_url;
      console.log(imageUrl, userData)

      //register user
      await axios.post(`${BASE_API_URL}/api/auth/register`, { ...userData, imageUrl, coords });

      Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
        (result) => {
          if (result.isConfirmed || result.isDismissed) {
            props.resetUser();
            navigate('/user/login');
          }
        }
      );
    } catch (error) {
      console.log(error)
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data
        });
        console.log('error', error.response.data);
      }
    }
  };
  return (
    <section className="container">
      <div className="row py-5">
        <div className="col-lg-8 offset-lg-3 col-md-12 offset-md-1 col-sm-12 offset-sm-1 col-xs-6 offset-xs-3">
          <form onSubmit={handleSubmit}>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
              {thumbs}
            </aside>

            <div className="submit-message my-2">
              <button type='submit' className="rounded px-5 btn-home">Next</button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );

}

export default StepFive
'use client';

import { Box, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import AutoFileUploader from '@/components/forms/AutoFileUploader';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProfileUpdateModal from './components/ProfileUpdateModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useGetSingleUserQuery, useUpdateMyProfileMutation } from '@/redux/api/userApi';
import DoctorInformation from './components/DoctorInformation';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetSingleUserQuery(undefined);
  const [updateMYProfile, { isLoading: updating }] = useUpdateMyProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({}));
    updateMYProfile(formData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ProfileUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id={data?.id} />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                height: 300,
                width: '100%',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <Image
                height={300}
                width={400}
                src={data?.profilePhoto || '/default-profile.png'}
                alt='User Photo'
              />
            </Box>
            <Box my={3}>
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name='file'
                  label='Choose Your Profile Photo'
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant='text'
                />
              )}
            </Box>

            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <DoctorInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;

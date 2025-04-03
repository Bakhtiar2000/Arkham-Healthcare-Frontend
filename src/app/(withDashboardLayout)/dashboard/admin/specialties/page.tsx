"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SpecialtyModal from "./components/SpecialtyModal";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const { data, isLoading } = useGetAllSpecialtiesQuery({});
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
        <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Specialist" />
      </Stack>
      {/* {!isLoading ? (
      <Box my={2}>
        <DataGrid rows={data} columns={columns} hideFooter={true} />
      </Box>
    ) : (
      <h1>Loading.....</h1>
    )} */}
    </Box>
  );
};

export default SpecialtiesPage;

import PHFileUploader from "@/components/forms/PHFileUploader";
import PHForm from "@/components/forms/PHForm";
import PHInput from "@/components/forms/PHInput";
import PHModal from "@/components/shared/modal/PHModal";
// import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { ModifyPayload } from "@/utils/ModifyPayload";
import { Button, Grid } from "@mui/material";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // useState function's type
};

const SpecialtyModal = ({ open, setOpen }: TProps) => {
  // const [createSpecialty] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // const data = ModifyPayload(values);
    // try {
    //   const res = await createSpecialty(data).unwrap();
    //   console.log(res);
    //   if (res?.id) {
    //     toast.success("Specialty created successfully!!");
    //     setOpen(false);
    //   }
    // } catch (err: any) {
    //   console.error(err.message);
    // }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <PHInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <PHFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialtyModal;

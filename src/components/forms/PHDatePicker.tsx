import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}

const PHDatePicker = ({
  name,
  size = "small", // default
  label,
  required,
  fullWidth = true,
  sx,
}: IDatePicker) => {
  const { control } = useFormContext();
  return (
    // Many UI libraries (like MUI) use controlled components (with value and onChange props), whereas react-hook-form is optimized for uncontrolled components (like native <input>).

    //
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => {
        // Render gives access to field which has many useful functions like onChange, onBlur, value, name, ref. These are necessary to sync the UI component with react-hook-form.

        /* 
                                    -------------------------------------
                                    Controlled vs Uncontrolled components
                                    -------------------------------------
          Controlled component: The component's value is controlled by React. The component receives its current value as a prop and notifies changes via a callback. Example:
            const [name, setName] = useState("");
            <input value={name} onChange={(e) => setName(e.target.value)} />

          Uncontrolled component: The value is stored in the DOM, not in React state. You access the value using a ref. Example:
            const inputRef = useRef(null);
            <input ref={inputRef} />

          React Hook Form is optimized for uncontrolled components, but it can also work with controlled components. In this case, we are using a controlled component (MUI DatePicker) with react-hook-form.
          The value prop is the current value of the input, and the onChange prop is a function that will be called when the value changes. The onChange function should call the onChange function provided by react-hook-form to update the form state. 
        */
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              timezone="system"
              disablePast
              {...field} // spread all the properties from field into the ui component
              onChange={(date) => onChange(date)}
              value={value || Date.now()}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: "outlined",
                  fullWidth: fullWidth,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default PHDatePicker;

import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PasswordField = ({
  id,
  label,
  value,
  setValue,
  touched = false,
  errors = false,
  setTouched = () => {}, // No-op function if not provided
  validateField = () => {},
  fieldName,
  validate = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        setTouched((prevTouched) => ({
          ...prevTouched,
          [fieldName]: true,
        }));
        if (validate) {
          validateField(fieldName, value);
        }
      }}
      error={touched[fieldName] && errors[fieldName] && validate}
      helperText={
        touched[fieldName] && errors[fieldName] && validate
          ? `${label} is required`
          : ""
      }
      sx={{
        width: "350px",
        mb: 3,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: errors[fieldName] && validate ? "red" : "grey",
          },
          "&:hover fieldset": {
            borderColor: errors[fieldName] && validate ? "red" : "#6d76fa",
          },
          "&.Mui-focused fieldset": {
            borderColor: errors[fieldName] && validate ? "red" : "#3c47f9",
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={`toggle ${label.toLowerCase()} visibility`}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
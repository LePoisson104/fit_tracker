import { useState, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useAuth from "../../hooks/useAuth";
import { useDeleteUserAccountMutation } from "../../features/users/usersApiSlice";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const DeleteAccountModal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { userId, email } = useAuth();
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const [password, setPassword] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [password]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    if (payload) {
      payload.email = email;
      console.log(payload, userId);
    }
    try {
      await deleteUserAccount({ userId, payload }).unwrap();
      handleClose();
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(err.data?.message);
      } else if (err.status === 401) {
        setErrMsg(err.data?.message);
      } else if (err.status === 404) {
        setErrMsg(err.data?.message);
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{
          textTransform: "none",
          backgroundColor: "#FF5B61",
          color: "white",
          height: "2.5rem",
          "&:hover": {
            backgroundColor: "#FF8488",
          },
        }}
      >
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: {
            bgcolor:
              theme.palette.mode === "dark" ? colors.primary[700] : "white",
          },
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Delete Your Account</DialogTitle>
        {errMsg && (
          <DialogTitle
            sx={{
              color: "red",
              display: "flex",
              paddingTop: 0,
            }}
          >
            <PriorityHighIcon />
            {errMsg}
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText>
            If you delete your account, all your data will be permanently
            deleted.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined" // Use 'outlined' to apply border styles
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#FF5B61", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FF5B61", // Border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "grey", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FF5B61", // Label color when focused
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "none", color: "#FF5B61" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#FF5B61",
              "&:hover": {
                backgroundColor: "#FF8488",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteAccountModal;

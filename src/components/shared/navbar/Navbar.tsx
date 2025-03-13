import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Container>
      {/* Stack is used to center element horizontally and verticallly */}
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Typography wrapper wraps text to be of different types */}
        <Typography variant="h4" component={Link} href="/" fontWeight="600">
          {/* Box does not create any extra div in te parse treer */}
          <Box component="span" color="primary.main">
            Arkham
          </Box>{" "}
          HelthCare
        </Typography>

        {/* Nav Items (Link Component) */}
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography component={Link} href="/consultation" variant="button">
            Consultation
          </Typography>
          <Typography component={Link} href="/login" variant="button">
            Health Plans
          </Typography>
          <Typography component={Link} href="/login" variant="button">
            Medicine
          </Typography>
          <Typography component={Link} href="/login" variant="button">
            Diagnostics
          </Typography>
          <Typography component={Link} href="/login" variant="button">
            NGOs
          </Typography>
        </Stack>

        {/* Button Component */}
        <Button component={Link} href="/login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;

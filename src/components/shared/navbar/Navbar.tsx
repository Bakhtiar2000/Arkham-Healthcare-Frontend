"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {
  const userInfo = useUserInfo();

  const AuthButton = dynamic(
    () => import("@/components/ui/AuthButton/AuthButton"),
    { ssr: false }
  ); // This is a client component. We cannot use server component here (like button which waits for the userInfo response to be rendered). As a result, we use dynamic import to load the component in the client side. For this reasoin, initially it shows nothing. when the server responsae hits, then the button is loaded into ui.

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component={Link} href="/" fontWeight={600}>
            <Box component="span" color="#ffffff">
              Arkham
            </Box>{" "}
            Health Care
          </Typography>

          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Typography component={Link} href="/consultation" color="#ffffff">
              Consultation
            </Typography>

            <Typography color="#ffffff">Diagnostics</Typography>
            <Typography component={Link} href="/doctors" color="#ffffff">
              Doctors
            </Typography>

            {/* {userInfo?.userId ? (
              <Typography component={Link} href="/dashboard" color="#ffffff">
                Dashboard
              </Typography>
            ) : null} */}
          </Stack>

          {/* Button */}
          <AuthButton />
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;

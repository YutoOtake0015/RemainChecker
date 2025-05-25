// React & Next.js
import React, { useState } from "react";
import { useRouter } from "next/router";

// state
import { useRecoilState, useSetRecoilState } from "recoil";
import errMessagesAtom from "../../recoil/atom/errMessagesAtom";
import userAtom from "../../recoil/atom/userAtoms";

// library
import apiClient from "../../lib/apiClient";
import { handleErrorResponse } from "../../lib/errorHandler";
import { signin } from "../../lib/authHelpers";

// components
import PageHead from "../../components/layout/PageHead";
import HomeLink from "../../components/ui/HomeLink";
import ErrorMessageList from "../../components/err/ErrorMessageList";

// types
import { SexType } from "../../types/type";

// hooks
import { useLoading } from "../../hooks/useLoading";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

// CSS
import styles from "../../styles/common.module.css";

export default function SignUp() {
  const router = useRouter();

  // アカウント情報
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 人物情報
  const [sex, setSex] = useState<SexType>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  // 共有情報
  const setUser = useSetRecoilState(userAtom);
  const [validationErrorMessages, setValidationErrorMessages] =
    useRecoilState(errMessagesAtom);

  // ローディング状態
  const { startLoading, stopLoading } = useLoading();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    startLoading();
    event.preventDefault();

    try {
      // アカウント新規登録APIを実行
      await apiClient
        .post("/auth/signup", {
          username,
          email,
          password,
          birthDate,
          sex,
        })
        .then(async () => {
          await signin(
            email,
            password,
            setUser,
            setValidationErrorMessages,
            router
          );
          stopLoading();
        })
        .catch((err) => {
          handleErrorResponse(
            err,
            router,
            router.asPath,
            setValidationErrorMessages
          );
        })
        .finally(() => stopLoading());
    } catch (err) {
      alert("予期しないエラーが発生しました。\nもう一度やり直してください。");
      stopLoading();
    }
  };

  return (
    <>
      <PageHead>
        <title>アカウント登録</title>
      </PageHead>
      <Container component="main" maxWidth="xs">
        <Box className={styles.mainContainer}>
          <Typography component="h1" variant="h5">
            アカウントを作成
          </Typography>
          {validationErrorMessages && (
            <ErrorMessageList messages={validationErrorMessages} />
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="名前"
                    autoFocus
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserName(e.target.value)
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    name="email"
                    autoComplete="email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    inputProps={{
                      onKeyPress: (e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    inputProps={{
                      onKeyPress: (e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                  <DatePicker
                    label="生年月日"
                    onChange={(e: Date | null) =>
                      setBirthDate(e as Date | null)
                    }
                    value={birthDate}
                    maxDate={new Date()}
                    openTo="year"
                    views={["year", "month", "day"]}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="gender">性別</InputLabel>
                  <Select
                    value={sex}
                    required
                    label="性別"
                    fullWidth
                    onChange={(e: SelectChangeEvent<SexType>) =>
                      setSex(e.target.value as SexType)
                    }
                  >
                    <MenuItem value={"male"}>男</MenuItem>
                    <MenuItem value={"female"}>女</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "#FFFFFF" }}
            >
              作成
            </Button>
          </Box>
        </Box>
        <HomeLink />
      </Container>
    </>
  );
}

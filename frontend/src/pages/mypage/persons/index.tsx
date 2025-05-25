// React & Next.js
import React, { useEffect, useState } from "react";
import Link from "next/link";

// state
import { useRecoilValue } from "recoil";
import userAtom from "../../../recoil/atom/userAtoms";

// utility
import { format } from "date-fns";

// library
import apiClient from "../../../lib/apiClient";

// components
import RemainingLife from "../../../components/common/RemainingLife";
import BackLink from "../../../components/ui/BackLink";
import PageHead from "../../../components/layout/PageHead";
import ProtectRoute from "../../../components/layout/ProtectRoute";

// types
import { personType } from "../../../types/type";

// state
import { useLoading } from "../../../hooks/useLoading";

// MUI
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridSortModel,
} from "@mui/x-data-grid";
import { Box, Button, Container } from "@mui/material";

const Persons = () => {
  // 人物情報
  const [persons, setPersons] = useState<personType[] | null>(null);

  // 共有情報
  const user = useRecoilValue(userAtom);

  // ソート設定
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // ローディング状態
  const { startLoading, stopLoading } = useLoading();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const setPersonData = async () => {
      startLoading();
      if (user) {
        // ユーザに紐づく登録人物の情報を取得
        await apiClient
          .get("/persons/findAll", {
            data: { userId: user.id },
          })
          .then((res) => {
            setPersons(res.data.formattedPersons);
          })
          .finally(() => {
            stopLoading();
          });
      }
    };
    setPersonData();
  }, [user, setPersons]);

  // birthDate を "yyyy年MM月dd日" の形式にフォーマット
  const formatBirthDate = (params: GridRenderCellParams<any>) => {
    const formattedDate = format(
      new Date(params.row.birthDate),
      "yyyy年MM月dd日"
    );
    return formattedDate;
  };

  const handleSortModelChange = (model: GridSortModel) => {
    if (model[0]?.field === "remainingLife" && persons) {
      // remainingLife列に基づいてソートする
      const sortedPersons = [...persons].sort((a, b) => {
        if (model[0].sort === "asc") {
          return a.remainTime - b.remainTime;
        } else {
          return b.remainTime - a.remainTime;
        }
      });
      setPersons(sortedPersons);
    }
    setSortModel(model);
  };

  // 表のカラム設定
  const cols: GridColDef[] = [
    {
      field: "name",
      headerName: "名前",
      minWidth: 150,
    },
    {
      field: "birthDate",
      headerName: "生年月日",
      minWidth: 140,
      renderCell: formatBirthDate,
    },
    {
      field: "sex",
      headerName: "性別",
      width: 80,
      renderCell: (params: GridRenderCellParams<any>) => {
        // 表示するsexをmale/femaleから男/女に変換
        const formattedSex = params.row.sex === "male" ? "男" : "女";
        return formattedSex;
      },
    },
    {
      field: "remainingLife",
      headerName: "余命",
      minWidth: 220,
      width: 200,
      flex: 0.3,
      renderCell: (params: GridRenderCellParams<any>) => (
        <RemainingLife
          person={{ sex: params.row.sex, birthDate: params.row.birthDate }}
        />
      ),
    },
    {
      field: "show",
      headerName: "",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 30,
      flex: 0.3,
      renderCell: (params: GridRenderCellParams<any>) => (
        <>
          <Link
            className="text-blue-400"
            href={`/mypage/persons/${params.id}`}
            onClick={() => startLoading()}
          >
            編集
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <ProtectRoute user={user}>
        <PageHead>
          <title>余命一覧</title>
        </PageHead>
        {persons && (
          <Container maxWidth="md">
            <Box>
              <Link href="/mypage/persons/create">
                <Button
                  variant="contained"
                  sx={{
                    margin: "1rem 0",
                    backgroundColor: "#1565C0",
                    color: "#FFFFFF",
                  }}
                >
                  新規登録
                </Button>
              </Link>
              <DataGrid
                columns={cols}
                rows={persons}
                density="compact"
                autoHeight
                disableColumnMenu
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                  },
                }}
                sx={{
                  "& .user-row": {
                    background: "#aee7ff !important",
                  },
                }}
                // ユーザ情報の場合、背景色で強調表示
                getRowClassName={(params: GridRowParams) => {
                  if (params.row.isAccountUser) {
                    return "user-row";
                  }
                  return "";
                }}
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
              />
            </Box>
            <BackLink />
          </Container>
        )}
      </ProtectRoute>
    </>
  );
};

export default Persons;

import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import styles from "./index.module.css";
import { Pagination } from "antd";
import { useSearchParams, useNavigate } from "react-router";
import type { Student } from "./types";
import StudentTable from "./Pieces/StudentTable";

export default function Trainees() {
  const { axios } = useAxios();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState<string>(search);

  const [students, setStudents] = useState<Student[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({
        page: "1",
        search: searchInput,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  interface StudentsResponse {
    students: Student[];
    totalCount: number;
  }

  useEffect(() => {
    axios
      .get(`/dashboard_students?page=${page}&search=${search}`)
      .then((res) => {
        const data = res as unknown as StudentsResponse;

        setStudents(data.students);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios, page, search]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <div>Trainees List</div>
            </div>

            <div className="col-6">
              <div className={styles.addButtonContainer}>
                <Button
                  id="addTrainee"
                  type="button"
                  text="Add new"
                  onClick={() => {
                    navigate("/trainees/add");
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <Input
                type="search"
                id="search"
                placeholder="search"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            {students.length === 0 && (
              <div className="col-12">
                <div className={styles.emptyState}>
                  <p>Oops! Looks like you haven't added any data yet.</p>
                </div>
              </div>
            )}

            {students.length > 0 && (
              <div className="col-12">
                <StudentTable students={students} />
              </div>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="offset-3 col-6">
              <div className={styles.paginationContainer}>
                <Pagination
                  current={page}
                  total={totalCount}
                  pageSize={20}
                  showSizeChanger={false}
                  onChange={(newPage) => {
                    setSearchParams({
                      page: String(newPage),
                      search,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

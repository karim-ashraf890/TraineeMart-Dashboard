import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import styles from "./index.module.css";
import type { Admin } from "./types";
import AdminTable from "./Pieces/AdminTable";
import { Pagination } from "antd";
import { useSearchParams, useNavigate } from "react-router";

export default function Admins() {
  const { axios } = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState<string>(search);

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({ page: "1", search: searchInput });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  interface AdminsResponse {
    admins: Admin[];
    totalCount: number;
  }

  useEffect(() => {
    axios
      .get(`/admins?page=${page}&search=${search}`)
      .then((res) => {
        const data = res as unknown as AdminsResponse;
        setAdmins(data.admins);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios, page, search]);

  const navigate = useNavigate();

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <div>Admins List</div>
            </div>

            <div className="col-6">
              <div className={styles.addButtonContainer}>
                <Button
                  id="addAdmin"
                  type="button"
                  text="Add new"
                  onClick={() => {
                    console.log("clicked");
                    navigate("/admins/add");
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
            {admins.length === 0 && (
              <div className="col-12">
                <div className={styles.emptyState}>
                  <p>Oops! Looks like you haven't added any data yet.</p>
                </div>
              </div>
            )}

            {admins.length > 0 && (
              <div className="col-12">
                <AdminTable admins={admins} />
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
                  pageSize={5}
                  showSizeChanger={false}
                  onChange={(newPage) => {
                    setSearchParams({ page: String(newPage), search });
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

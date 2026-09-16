import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import styles from "./index.module.css";
import { Pagination } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import type { Organization } from "./types";
import OrganizationTable from "./Pieces/OrganizationTable";

export default function Organizations() {
  const { axios } = useAxios();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState<string>(search);

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleApprovedChange = (
    organization: Organization,
    approved: boolean,
  ) => {
    axios
      .post(`/dashboard_organizations/${organization.id}/partial`, {
        name: organization.name,
        approved: approved,
        email: organization.email,
      })
      .then((res) => {
        console.log(res);

        setOrganizations((prevOrganizations) =>
          prevOrganizations.map((item) =>
            item.id === organization.id
              ? {
                  ...item,
                  approved: approved ? 1 : 0,
                }
              : item,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({
        page: "1",
        search: searchInput,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  interface OrganizationsResponse {
    organizations: Organization[];
    totalCount: number;
  }

  useEffect(() => {
    axios
      .get(`/dashboard_organizations?page=${page}&search=${search}`)
      .then((res) => {
        const data = res as unknown as OrganizationsResponse;

        setOrganizations(data.organizations);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axios, page, search]);

  return (
    <>
      <div className="row">
        {/* ============================================================
            Organizations List + Add Button
        ============================================================ */}
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <div>Organizations List</div>
            </div>

            <div className="col-6">
              <div className={styles.addButtonContainer}>
                <Button
                  id="addOrganization"
                  type="button"
                  text="Add new"
                  onClick={() => {
                    navigate("/Organizations/add");
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            Search
        ============================================================ */}
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

        {/* ============================================================
            Organizations Table
        ============================================================ */}
        <div className="col-12">
          <div className="row">
            {organizations.length === 0 && (
              <div className="col-12">
                <div className={styles.emptyState}>
                  <p>Oops! Looks like you haven't added any data yet.</p>
                </div>
              </div>
            )}

            {organizations.length > 0 && (
              <div className="col-12">
                <OrganizationTable
                  organizations={organizations}
                  handleApprovedChange={handleApprovedChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* ============================================================
            Pagination
        ============================================================ */}
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

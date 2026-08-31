import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { useAxios } from "../../../../app/hooks/useAxios";

export type Permission = {
  id: number;
  name_en: string;
  name_ar: string;
  created_at: string;
};

type PermissionsResponse = {
  permissions: Permission[];
  count: number;
};

type PermissionsProps = {
  selectedPermissions: number[];
  setSelectedPermissions: (permissions: number[]) => void;
};

export default function Permissions({
  selectedPermissions,
  setSelectedPermissions,
}: PermissionsProps) {
  const { axios } = useAxios();
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const res = await axios.get("/permissions");
        const data = res as unknown as PermissionsResponse;
        setPermissions(data.permissions);
      } catch (error) {
        console.log(error);
      }
    };
    getPermissions();
  }, [axios]);

  const formatPermissionName = (name: string) =>
    name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const handlePermissionChange = (id: number) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions(selectedPermissions.filter((item) => item !== id));
    } else {
      setSelectedPermissions([...selectedPermissions, id]);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPermissions(permissions.map((permission) => permission.id));
    } else {
      setSelectedPermissions([]);
    }
  };

  return (
    <div className="border rounded p-4 mt-4">
      <div className="mb-4">
        <Checkbox
          checked={
            permissions.length > 0 &&
            selectedPermissions.length === permissions.length
          }
          onChange={(e) => handleSelectAll(e.target.checked)}
        >
          All
        </Checkbox>
      </div>
      <div className="row">
        {permissions.map((permission) => (
          <div key={permission.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <Checkbox
              checked={selectedPermissions.includes(permission.id)}
              onChange={() => handlePermissionChange(permission.id)}
            >
              {formatPermissionName(permission.name_en)}
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}

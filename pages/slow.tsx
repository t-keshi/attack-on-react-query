import { useState } from "react";
import { useAsync } from "../hooks/useAsync";

type University = {
  code: number;
  name: string;
  isDefault: boolean;
};

const getUniversityList = async (page: number) => {
  const res = await fetch("/api/universities?page=" + page, { method: "GET" });
  const universityList: University[] = await res.json();

  return universityList;
};

const UniversityPageSlow: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useAsync(
    () => getUniversityList(page),
    [page]
  );

  console.log(data);

  if (loading) {
    return <p>loading</p>;
  }

  if (!data || error) {
    return <p>error</p>;
  }

  return (
    <>
      {data.map((university) => (
        <h5 key={university.code}>{university.name}</h5>
      ))}
      <div>
        <button onClick={() => setPage(page - 1)}>⇦前のページ</button>
        <button onClick={() => setPage(page + 1)}>次のページ⇨</button>
      </div>
    </>
  );
};

export default UniversityPageSlow;

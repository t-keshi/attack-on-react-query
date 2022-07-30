import type { NextApiRequest, NextApiResponse } from "next";
import { University } from "../../types";

const data = [
  {
    code: 1,
    name: "California State University",
    isDefault: true,
  },
  {
    code: 2,
    name: "San Diego State University",
    isDefault: false,
  },
  {
    code: 3,
    name: "University of California",
    isDefault: false,
  },
  {
    code: 4,
    name: "San Francisco State University",
    isDefault: false,
  },
  {
    code: 5,
    name: "University of Southern California",
    isDefault: false,
  },
  {
    code: 6,
    name: "California Lutheran University",
    isDefault: false,
  },
  {
    code: 7,
    name: "University of California",
    isDefault: false,
  },
];

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<University[]>
) => {
  const page = parseInt(req.query.page as string, 10) || 0;
  console.log(page);

  const pageSize = 5;
  const offset = (page - 1) * pageSize;
  const limit = (page - 1) * pageSize + pageSize;

  const universities = data.slice(offset, limit);

  await new Promise((r) => setTimeout(r, 500));

  res.json(universities);
};

export default handler;

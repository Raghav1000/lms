"use client";
import { Category } from "@prisma/client";
import { Button, Tag } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import qs from "query-string";

const CategoryItem = ({ category }: { category: Category }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const currentCategoryId = params.get("categoryId");
  const currentTitle = params.get("title");

  const isSelected = currentCategoryId === category?.id;

  const onClick = () => {
    const url = qs?.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : category?.id,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    console.log(url, category?.id);
    router.push(url);
  };

  return (
    <Tag
      onClick={onClick}
      color={isSelected ? "gold" : "default"}
      style={{ cursor: "pointer" }}
    >
      {category?.name}
    </Tag>
  );
};

export default CategoryItem;

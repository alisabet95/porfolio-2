import Link from "next/link";

export default function LanguageSwitcher({ current }) {
  return (
    <div>
      {current === "fa" ? (
        <Link className="gooz" href="/en">
          English
        </Link>
      ) : (
        <Link className="gooz" href="/fa">
          فارسی
        </Link>
      )}
    </div>
  );
}

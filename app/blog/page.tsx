import { Suspense } from "react";
import BlogPageContent from "./BlogPageContent.client";

export default function BlogPage() {
  return (
    <Suspense>
      <BlogPageContent />
    </Suspense>
  );
}

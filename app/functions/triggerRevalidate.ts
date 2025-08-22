import { revalidatePath } from "next/cache";

export async function triggerRevalidateForPage(pagePath: string) {
  revalidatePath(`/${pagePath}`);
}

export async function triggerRevalidateForAllPages() {
  revalidatePath("/", "layout");
}

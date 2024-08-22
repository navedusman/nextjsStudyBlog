'use server';

import { updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";

export async function togglePostLikeStatus(postId) {

  await updatePostLikeStatus(postId,2);
  //revalidatePath('/feed');
  revalidatePath('/', 'layout');
}

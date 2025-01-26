import { tsr } from '@tawasul/query';

export function useCreatePost() {
  return tsr.posts.create.useMutation({
    mutationKey: ['posts'],
  });
}

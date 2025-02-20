export function getKeyName(...args: string[]) {
  return `tawasul:${args.join(':')}`;
}

export const resturantKeyById = (id: string) => getKeyName('resturants', id);

export const postsKey = (page: string, limit: string) =>
  getKeyName('posts', page, limit);

export const postDetailsKeyById = (id: string) =>
  getKeyName('post_details', id);

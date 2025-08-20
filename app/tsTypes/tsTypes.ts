export interface FeaturedImageI {
  node: {
    sourceUrl: string;
  };
}

export interface CategoriesI {
  edges: {
    node: {
      slug: string;
    };
  }[];
}

export interface CommentsI {
  nodes: {
    content: string;
  }[];
}

export interface TagsI {
  nodes: {
    name: string;
  }[];
}

import { v4 as uuid } from 'uuid';

export const fetchBook = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const book = {
      id: uuid(),
      title: data.docs[0].title,
      author: data.docs[0].author_name[0],
      isbn: data.docs[0].isbn[0],
      cover_i: data.docs[0].cover_i,
    };

    return book;
  } catch (err) {
    return null;
  }
};

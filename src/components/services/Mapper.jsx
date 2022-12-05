export  function mapped(data) {
    return data.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
  }
const URL_UTILS = {
  navigateTo: (url: string) => {
    if (url) {
      window.location.replace(url);
    }
  },

  copyToClipboard: (text: string) => {
    if (document.hasFocus())
      (async () => {
        try {
          await navigator.clipboard.writeText(text).catch((err) => {
            console.error(err);
          });
        } catch (err) {
          console.error(err);
        }
      })();
  },

  validateUrl: (url: string) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  },

  makeProper: (url: string) => {
    if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
      return `http://${url}`;
    }
    return url;
  },
};

export default URL_UTILS;
